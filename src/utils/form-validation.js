import moment from 'moment-timezone';
import isEmpty from 'lodash/isEmpty';

import { get } from 'utils/lodash';

import {
  DEFAULT_INT_ZERO,
  CREDIT_CARD_MAX_LENGTH,
  CREDIT_CARD_MIN_LENGTH,
  ACCOUNT_NUMBER_MIN_LENGTH,
  OTHER_BILL_ACCOUNT_MAX_LENGTH,
  OTHER_BILL_ACCOUNT_MIN_LENGTH,
} from 'settings/constants/common';
import {
  FORMAT_NUMBER,
  FORMAT_ALPHANUMERIC,
  FORMAT_BENEFICIARY_NAME,
  FORMAT_PASSWORD_CHARACTER,
  FORMAT_FAVOURITE_NICKNAME,
  FORMAT_ALPHABET_WITH_SPACE,
  DEFAULT_MAX_TRANSFER_AMOUNT,
  DEFAULT_MIN_TRANSFER_AMOUNT,
  FORMAT_ALPHANUMERIC_WITHOUT_SPACE,
  FORMAT_ALPHANUMERIC_WITH_SPACE_DOT,
  MOBILE_NUMBER_WITH_PREFIX_MIN_LENGTH,
  MOBILE_NUMBER_WITH_PREFIX_MAX_LENGTH,
} from 'settings/constants/transaction';

import { validateGbiInputField } from './digital-wealth/form-validation';
import { isValidAccount, isValidMaxAmount, isValidMinAmount, isValidEmail, isValidMobileNumber, isLengthValid } from './validation';

import {
  onlyNumber,
  formatName,
  alphaNumeric,
  formatAsCurrency,
  removeStringComma,
  alphaNumericSpace,
  alphabetWithSpace,
  alphaNumericSpaceDot,
  formatFavoriteNickname,
  removeAlphabetWithSpace,
  allowedPasswordCharacter,
} from './formatter';

// NOTE: Declare these because the handler consumes response code to display message
const INVALID_ACCOUNT = 104;

export const validResult = { isValid: true, messageId: '' };
const emptyResult = { isValid: false, messageId: 'transaction.transfer.errorMessage.required' };

export const validateInterbankInput = formInput => {
  const amount = get(formInput, 'transferAmount', '');
  const accountNumber = get(formInput, 'accountNumber', '');

  // Validate account at first
  if (!accountNumber || accountNumber.length < ACCOUNT_NUMBER_MIN_LENGTH) {
    return { isValidInput: false, errorCode: INVALID_ACCOUNT };
  }

  if (!amount) {
    return { isValidInput: false, errorCode: 'REQUIRED' };
  }

  return { isValidInput: true };
};

export const validateField = {
  transferAmount: value => (!value ? emptyResult : validResult),

  currency: value => (!value ? emptyResult : validResult),

  accountNumber: value => {
    if (!value) return emptyResult;

    return !isValidAccount(value) ? { isValid: false, messageId: 'transaction.transfer.errorMessage.accountNumber' } : validResult;
  },

  // only execute if flag===TRUE
  transferDate: (value, flag) => (flag && !value ? emptyResult : validResult),

  // only execute if flag===TRUE
  transferEndDate: (value, flag) => (flag && !value ? emptyResult : validResult),

  // extra validation which doesnt map to field's name
  duplicateAccountNumber: (value, value2) =>
    value === value2 ? { isValid: false, messageId: 'transaction.transfer.errorMessage.sameAccount' } : validResult,

  duplicateDate: (value, value2, flag) =>
    flag && (moment(value).isSame(value2, 'day') || moment(value2).isBefore(value, 'day'))
      ? { isValid: false, messageId: 'transaction.transfer.errorMessage.sameEndDate' }
      : validResult,

  default: () => validResult,
};

// this function can be re-used for all Transfer types
export const validateTransferDetail = data => {
  const { isRecurring, transferDate, transferEndDate, accountNumber, senderAccountNumber } = data;

  const fields = Object.keys(data);

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const value = data[field];
    const result = (validateField[field] || validateField.default)(value, isRecurring);

    if (!result.isValid) {
      return result;
    }

    // if oneTime fieldValidation passed, check for recurring fields
    if (isRecurring && field === 'transferEndDate') {
      const recurringResult = validateField.duplicateDate(transferDate, transferEndDate, isRecurring);
      if (!recurringResult.isValid) {
        return recurringResult;
      }
    }
  }

  // final check, make sure account number is not duplicate
  return validateField.duplicateAccountNumber(accountNumber, senderAccountNumber);
};

export const validateAmountInput = ({
  amount,
  accountBalance,
  isSameCurrency = false,
  minAmount = DEFAULT_MIN_TRANSFER_AMOUNT,
  maxAmount = DEFAULT_MAX_TRANSFER_AMOUNT,
}) => {
  const valid = { isValid: true, errorMessage: '', param: {} };

  const plainAmount = removeStringComma(amount);

  // if API returns 0, use Default value
  const minLimit = minAmount > DEFAULT_INT_ZERO ? minAmount : DEFAULT_MIN_TRANSFER_AMOUNT;
  if (!isValidMinAmount(plainAmount, minLimit)) {
    return {
      isValid: false,
      errorMessage: { id: 'transaction.transfer.errorMessage.minAmount' },
      param: { amount: formatAsCurrency(minLimit) },
    };
  }

  // if API returns 0 or less than minAmount, use Default value
  const maxLimit = maxAmount > DEFAULT_MIN_TRANSFER_AMOUNT ? maxAmount : DEFAULT_MAX_TRANSFER_AMOUNT;
  if (!isValidMaxAmount(plainAmount, maxLimit)) {
    return {
      isValid: false,
      errorMessage: { id: 'transaction.transfer.errorMessage.maxAmount' },
      param: { amount: formatAsCurrency(maxLimit) },
    };
  }

  if (isSameCurrency && !isValidMaxAmount(plainAmount, accountBalance)) {
    return {
      isValid: false,
      errorMessage: { id: 'transaction.transfer.errorMessage.exceedBalance' },
      param: '',
    };
  }

  return valid;
};

/* Dynamic fields validation */
const validateAmount = (amount, { type, value, isValidateRequired }) => {
  // return if validate not required
  if (!isValidateRequired) {
    return validResult;
  }
  // remove comma
  // remove NumberField prefix that is included in value when using event.target.value
  const plainValue = removeAlphabetWithSpace(removeStringComma(amount)); // IDR 1,234.00 -> 1234.00

  const amountRules = {
    // check empty input
    required: () => (plainValue ? validResult : emptyResult),
    // check min amount allowed
    minAmount: () =>
      isValidMinAmount(plainValue, value)
        ? validResult
        : { isValid: false, messageId: 'transaction.transfer.errorMessage.minAmount', param: { amount: formatAsCurrency(value) } },
    // check max amount allowed
    maxAmount: () =>
      isValidMaxAmount(plainValue, value)
        ? validResult
        : { isValid: false, messageId: 'transaction.transfer.errorMessage.maxAmount', param: { amount: formatAsCurrency(value) } },
    // validate against balance
    senderBalance: () =>
      isValidMaxAmount(plainValue, value) ? validResult : { isValid: false, messageId: 'transaction.transfer.errorMessage.exceedBalance' },
    // default
    default: () => validResult,
  };

  return (amountRules[type] || amountRules.default)();
};

const validateAccountNumber = (accountNumber, { type, isValidateRequired }) => {
  // return if validate is not required
  if (!isValidateRequired) {
    return validResult;
  }

  const accountNumberRules = {
    // null value check
    required: () => (accountNumber ? validResult : emptyResult),
    // account no length validation
    accountLength: () =>
      isValidAccount(accountNumber) ? validResult : { isValid: false, messageId: 'transaction.transfer.errorMessage.accountNumber' },
    // IBAN number for swift transfer
    // validIBAN: () =>
    //   isValidIBAN(accountNumber) ? validResult : { isValid: false, messageId: 'transaction.transfer.errorMessage.invalidIban' },
    // default
    default: () => validResult,
  };

  return (accountNumberRules[type] || accountNumberRules.default)();
};

const validateDate = (date, { type, isValidateRequired }, referenceDate) => {
  // return if validate is not required
  if (!isValidateRequired) {
    return validResult;
  }

  const dateRule = {
    // null value check
    required: () => (date ? validResult : emptyResult),
    // date can't be equal or before to referenceDate
    duplicateDate: () => validateField.duplicateDate(referenceDate, date, true),
    // default
    default: () => validResult,
  };

  return (dateRule[type] || dateRule.default)();
};

const validateEmail = (email, { type, isValidateRequired }) => {
  if (!isValidateRequired) {
    return validResult;
  }

  if (!email) {
    return validResult;
  }

  const emailRule = {
    validEmail: () =>
      isValidEmail(email) ? validResult : { isValid: false, messageId: 'transaction.transfer.errorMessage.beneficiaryEmail' },
    default: () => validResult,
  };

  return (emailRule[type] || emailRule.default)();
};

const validateMobileNumber = (number, { type, isValidateRequired }) => {
  if (!isValidateRequired) {
    return validResult;
  }

  const mobileRule = {
    required: () => (number ? validResult : emptyResult),
    validMobileNumber: () =>
      isValidMobileNumber(number) ? validResult : { isValid: false, messageId: 'transaction.payment.errorMessage.invalidMobileNumber' },
    validMobileNumberWithPrefix: () =>
      isValidMobileNumber(number, MOBILE_NUMBER_WITH_PREFIX_MIN_LENGTH, MOBILE_NUMBER_WITH_PREFIX_MAX_LENGTH)
        ? validResult
        : { isValid: false, messageId: 'transaction.payment.errorMessage.invalidMobileNumber' },
    default: () => validResult,
  };

  return (mobileRule[type] || mobileRule.default)();
};

const validateCustomerNumber = (
  number,
  { type, isValidateRequired, minLength = OTHER_BILL_ACCOUNT_MIN_LENGTH, maxLength = OTHER_BILL_ACCOUNT_MAX_LENGTH }
) => {
  if (!isValidateRequired) {
    return validResult;
  }

  const rule = {
    required: () => (number ? validResult : emptyResult),
    validCustomerNumber: () =>
      isLengthValid(number, minLength, maxLength)
        ? validResult
        : { isValid: false, messageId: 'transaction.payment.errorMessage.invalidCustomerNumber' },
    default: () => validResult,
  };
  return (rule[type] || rule.default)();
};

const validatePaymentCode = (number, { type, isValidateRequired, minLength, maxLength }) => {
  if (!isValidateRequired) {
    return validResult;
  }

  const rule = {
    required: () => (number ? validResult : emptyResult),
    validPaymentCode: () =>
      isLengthValid(number, minLength, maxLength)
        ? validResult
        : { isValid: false, messageId: 'transaction.purchase.errorMessage.invalidPaymentCode' },
    default: () => validResult,
  };
  return (rule[type] || rule.default)();
};

const validateCreditCardNumber = (number, { type, isValidateRequired }) => {
  const plainNumber = onlyNumber(number);

  if (!isValidateRequired) {
    return validResult;
  }

  const rule = {
    required: () => (plainNumber ? validResult : emptyResult),

    validCcNumber: () =>
      isLengthValid(plainNumber, CREDIT_CARD_MIN_LENGTH, CREDIT_CARD_MAX_LENGTH)
        ? validResult
        : { isValid: false, messageId: 'transaction.payment.errorMessage.invalidCreditCardNumber' },
    default: () => validResult,
  };

  return (rule[type] || rule.default)();
};

const validateReferenceNumber = (number, { type, isValidateRequired, minLength, maxLength }) => {
  if (!isValidateRequired) {
    return validResult;
  }

  const rule = {
    required: () => (number ? validResult : emptyResult),
    validReferenceNumber: () =>
      isLengthValid(number, minLength, maxLength)
        ? validResult
        : { isValid: false, messageId: 'transaction.payment.errorMessage.invalidCustomerNumber' },
    default: () => validResult,
  };
  return (rule[type] || rule.default)();
};

const validateOnlyRequired = (value, { isValidateRequired }) => {
  if (!isValidateRequired) {
    return validResult;
  }

  return !isEmpty(value) ? validResult : emptyResult;
};

const validatePasswordMatch = (value, { type, isValidateRequired, password }) => {
  if (!isValidateRequired) {
    return validResult;
  }

  const rule = {
    required: () => (value ? validResult : emptyResult),

    validPasswordMatch: () =>
      value === password ? validResult : { isValid: false, messageId: 'settings.errorMessage.confirmationNotMatch' },
    default: () => validResult,
  };

  return (rule[type] || rule.default)();
};

// validator object literal. Based from validateField object
const validateInputField = {
  ...validateGbiInputField,
  transferAmount: (value, validationRule) => validateAmount(value, validationRule),
  accountNumber: (value, validationRule) => validateAccountNumber(value, validationRule),
  transferEndDate: (value, validationRule, referenceDate) => validateDate(value, validationRule, referenceDate),
  beneficiaryName: (value, validationRule) => validateOnlyRequired(value, validationRule),
  beneficiaryEmail: (value, validationRule) => validateEmail(value, validationRule),
  beneficiaryID: (value, validationRule) => validateOnlyRequired(value, validationRule),
  beneficiaryAddressStreet: (value, validationRule) => validateOnlyRequired(value, validationRule),
  currency: (value, validationRule) => validateOnlyRequired(value, validationRule),
  lldIdentityStatus: (value, validationRule) => validateOnlyRequired(value, validationRule),
  lldCitizenship: (value, validationRule) => validateOnlyRequired(value, validationRule),
  lldBeneficiary: (value, validationRule) => validateOnlyRequired(value, validationRule),
  lldRelationship: (value, validationRule) => validateOnlyRequired(value, validationRule),
  lldPurpose: (value, validationRule) => validateOnlyRequired(value, validationRule),
  lldDescription: (value, validationRule) => validateOnlyRequired(value, validationRule),
  transactionCharges: (value, validationRule) => validateOnlyRequired(value, validationRule),
  beneficiaryDateOfBirth: (value, validationRule) => validateDate(value, validationRule),
  mobileNumber: (value, validationRule) => validateMobileNumber(value, validationRule),
  customerNumber: (value, validationRule) => validateCustomerNumber(value, validationRule),
  paymentOption: (value, validationRule) => validateOnlyRequired(value, validationRule),
  paymentAmount: (value, validationRule) => validateAmount(value, validationRule),
  creditCardNumber: (value, validationRule) => validateCreditCardNumber(value, validationRule),
  referenceNumber: (value, validationRule) => validateReferenceNumber(value, validationRule),
  paymentCode: (value, validationRule) => validatePaymentCode(value, validationRule),
  purchaseAmount: (value, validationRule) => validateAmount(value, validationRule),
  mobilePrefix: (value, validationRule) => validateOnlyRequired(value, validationRule),
  transferFrequency: (value, validationRule) => validateOnlyRequired(value, validationRule),
  oldPassword: (value, validationRule) => validateOnlyRequired(value, validationRule),
  confirmNewPassword: (value, validationRule) => validatePasswordMatch(value, validationRule),
  displayName: (value, validationRule) => validateOnlyRequired(value, validationRule),
  default: () => validResult,
};

export const checkFormFormat = (value, format) => {
  const formatHandler = {
    [FORMAT_NUMBER]: () => onlyNumber(String(value)),
    [FORMAT_BENEFICIARY_NAME]: () => formatName(String(value)),
    [FORMAT_ALPHANUMERIC]: () => alphaNumericSpace(String(value)),
    [FORMAT_ALPHANUMERIC_WITHOUT_SPACE]: () => alphaNumeric(String(value)),
    [FORMAT_ALPHANUMERIC_WITH_SPACE_DOT]: () => alphaNumericSpaceDot(String(value)),
    [FORMAT_ALPHABET_WITH_SPACE]: () => alphabetWithSpace(String(value)),
    [FORMAT_PASSWORD_CHARACTER]: () => allowedPasswordCharacter(String(value)),
    [FORMAT_FAVOURITE_NICKNAME]: () => formatFavoriteNickname(String(value)),
    default: () => value,
  };

  return (formatHandler[format] || formatHandler.default)();
};

export const validate = (validationRules, event, extraRule = {}) => {
  const { name, value } = event.target;
  return validationRules.reduce((validationResult, validationRule) => {
    const { isValid, messageId, param } = (validateInputField[name] || validateInputField.default)(value, validationRule, extraRule);
    if (!isValid) return { isValid, messageId, param };
    return validationResult;
  }, validResult);
};
