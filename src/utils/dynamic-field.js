/* eslint-disable react/display-name */
import { mergeWith, isEmpty } from 'lodash';

import { get } from 'utils/lodash';
import { validate } from 'utils/form-validation';
import { formatArrayKeys } from 'utils/formatter';
import { updateArrayValues, findArrayEntry } from 'utils/array';

import {
  DYNAMIC_FIELD,
  DEFAULT_AMOUNT_FIELD,
  DEFAULT_MESSAGE_FIELD,
  DEFAULT_MOBILE_NUMBER_FIELD,
  DEFAULT_CUSTOMER_NUMBER_FIELD,
  ACCOUNT_DISPLAY_TYPE_REQUIRED,
  DEFAULT_REFERENCE_NUMBER_FIELD,
} from 'settings/constants/dynamic-field';
import {
  FIELD_TYPE_SELECT,
  AMOUNT_TYPE_SELECT,
  FIELD_TYPE_ACCORDION,
  AMOUNT_TYPE_VA_INPUT,
  AMOUNT_TYPE_FREE_INPUT,
  MOBILE_TYPE_FREE_INPUT,
  MOBILE_NUMBER_MAX_LENGTH,
  MOBILE_TYPE_PREFIX_SELECT,
  PURCHASE_OTHER_BILLS_MSG_MAX_LENGTH,
  MOBILE_NUMBER_WITH_PREFIX_MAX_LENGTH,
} from 'settings/constants/transaction';
import { CURRENCY_IDR, DEFAULT_INT_ZERO, MOBILE_NUMBER_PREFIX, CURRENCY_IDR_PREFIX } from 'settings/constants/common';

// it will update `fields` based on the `dynamicFields` array
export const formatDynamicFields = (fields, dynamicFields) => {
  return fields.map(field => {
    const fieldFound = findArrayEntry(dynamicFields, 'name', field.name);
    return fieldFound ? mergeWith(fieldFound, field, updateArrayValues) : field;
  });
};

export const formatFieldProp = (preparedProp, accordionField) => {
  const getValue = get(preparedProp, 'getValue', null);
  const fieldName = get(accordionField, 'name', '');

  return {
    ...accordionField,
    getValue,
    value: getValue(fieldName),
    onChange: get(preparedProp, 'onChange', null),
  };
};

export const addAccordionField = AccordionComponent => ({
  ...DYNAMIC_FIELD,
  [FIELD_TYPE_ACCORDION]: (props, isRecurring) => <AccordionComponent {...props} isRecurring={isRecurring} />,
  default: () => null,
});

export const validateField = (field, isRecurring, formDetail) => {
  const { name, validationRules, isRecurringDisplay } = field;

  // if don't have rules then don't check for validity by sending empty object.
  if (isEmpty(validationRules)) return {};

  // if field have rules and need to be displayed on recurring but currently not recurring.
  // don't check for validity of the field by sending empty object.
  if (isRecurringDisplay && !isRecurring) return {};

  // on form initialize, set the validity of field based on initialValue
  const event = { target: { name, value: formDetail[name] } };
  const { isValid } = validate(validationRules, event);
  return { [name]: isValid };
};

export const validateAccordionField = (field, formDetail, isRecurring) => {
  const fields = get(field, 'fields', []);

  return fields.reduce((accordionResult, accordionField) => {
    const fieldValidated = validateField(accordionField, isRecurring, formDetail);
    return { ...accordionResult, ...fieldValidated };
  }, {});
};

const getCustomerNumberField = ({ isVirtualAccount, billAcctReq, acctDisplayNameReq, billAccDisplayName }) => {
  const validationRule = (message, isTranslationId = true) => ({
    validationRules: [
      { type: 'required', isValidateRequired: true },
      {
        type: 'validCustomerNumber',
        isValidateRequired: true,
        message: isTranslationId ? `transaction.payment.errorMessage.${message}` : message,
      },
    ],
  });

  // FIELD_TYPE_NUMBER with label as `Virtual Account Number`
  if (isVirtualAccount)
    return {
      ...DEFAULT_CUSTOMER_NUMBER_FIELD,
      ...validationRule('invalidVirtualAccountNumber'),
      label: 'transaction.payment.otherBill.vaNumber',
    };
  if (!billAcctReq) {
    return acctDisplayNameReq === ACCOUNT_DISPLAY_TYPE_REQUIRED
      ? { ...DEFAULT_CUSTOMER_NUMBER_FIELD, ...validationRule(billAccDisplayName, false), label: billAccDisplayName } // FIELD_TYPE_NUMBER with label based on the backend value(billAccDisplayName)
      : {
          ...DEFAULT_CUSTOMER_NUMBER_FIELD,
          ...validationRule('invalidBillAccountNumber'),
          label: 'transaction.payment.otherBill.billAccountNumber',
        }; // FIELD_TYPE_NUMBER with label as Bill Account Number;
  }
  return {};
};

const getReferenceNumberField = ({ isVirtualAccount, refNoReq, refNoNameReq, refNoMandatory, refNoNameDisplay }) => {
  if (isVirtualAccount || refNoReq) return {};
  if (refNoNameReq) {
    return refNoMandatory
      ? { ...DEFAULT_REFERENCE_NUMBER_FIELD, label: 'transaction.payment.otherBill.billRefOptional' } // FIELD_TYPE_NUMBER with label `Bill Reference Number (Optional)`
      : { ...DEFAULT_REFERENCE_NUMBER_FIELD, label: 'transaction.payment.otherBill.billRef' }; // FIELD_TYPE_NUMBER with label `Bill Reference Number`
  }

  // FIELD_TYPE_NUMBER with label based on backend value(refNoNameDisplay)
  return { ...DEFAULT_REFERENCE_NUMBER_FIELD, label: refNoNameDisplay };
};

const getAmount = ({ amountType, currencyISOCode, currencyMap, amounts, senderAccount }, isPurchasePrepaid) => {
  const currentBalance = get(senderAccount, 'plainBalance', DEFAULT_INT_ZERO);
  const currency = get(senderAccount, 'currency', CURRENCY_IDR);
  const formattedAmounts = formatArrayKeys(amounts);

  const requiredValidation = { type: 'required', isValidateRequired: true };
  const currentBalanceValidation = {
    type: 'senderBalance',
    value: currentBalance,
    isValidateRequired: currency === CURRENCY_IDR,
  };

  const nonSelectAmountHandler = () =>
    currencyISOCode
      ? {
          ...DEFAULT_AMOUNT_FIELD,
          name: 'paymentAmount',
          prefix: `${currencyISOCode} `,
          validationRules: [currentBalanceValidation, requiredValidation],
        } // number field with currencyISOCode(IDR) as prefix
      : {
          ...DEFAULT_AMOUNT_FIELD,
          name: 'paymentAmount',
          hasOption: true,
          validationRules: [currentBalanceValidation, requiredValidation],
          optionField: {
            options: currencyMap,
            name: 'currency',
            validationRules: [requiredValidation],
          },
        }; // number field with select currency option

  const handler = {
    [AMOUNT_TYPE_VA_INPUT]: () => nonSelectAmountHandler(),
    [AMOUNT_TYPE_FREE_INPUT]: () =>
      isPurchasePrepaid
        ? {
            ...DEFAULT_AMOUNT_FIELD,
            name: 'purchaseAmount',
            prefix: CURRENCY_IDR_PREFIX,
            validationRules: [requiredValidation],
          }
        : nonSelectAmountHandler(),
    // eligible for mobile only
    // Select amount based on array(amounts) returned from backend
    [AMOUNT_TYPE_SELECT]: () => ({
      ...DEFAULT_AMOUNT_FIELD,
      name: 'purchaseAmount',
      placeholder: 'transaction.payment.placeHolder.selectAmount',
      type: FIELD_TYPE_SELECT,
      options: formattedAmounts,
      validationRules: [requiredValidation],
    }),
    default: () => ({}),
  };

  return (handler[amountType] || handler.default)();
};

const getMessage = ({ isVirtualAccount }) =>
  !isVirtualAccount
    ? { ...DEFAULT_MESSAGE_FIELD, placeholder: 'transaction.payment.placeHolder.maxChar', maxLength: PURCHASE_OTHER_BILLS_MSG_MAX_LENGTH }
    : {};

const getMobileNumber = ({ billAccountValueType, areaCodeList }) => {
  const areaCodes = formatArrayKeys(areaCodeList, 'value', 'label', true);
  const handler = {
    [MOBILE_TYPE_FREE_INPUT]: () => ({
      ...DEFAULT_MOBILE_NUMBER_FIELD,
      maxLength: MOBILE_NUMBER_MAX_LENGTH,
      leftLabel: MOBILE_NUMBER_PREFIX,
      isLeftLabelNoSpace: true,
      validationRules: [
        { type: 'required', isValidateRequired: true },
        { type: 'validMobileNumber', isValidateRequired: true },
      ],
    }),
    // FIELD_TYPE_NUMBER with `select` for mobile `prefix`
    [MOBILE_TYPE_PREFIX_SELECT]: () => ({
      ...DEFAULT_MOBILE_NUMBER_FIELD,
      hasOption: true,
      maxLength: MOBILE_NUMBER_WITH_PREFIX_MAX_LENGTH,
      optionField: {
        options: areaCodes,
        name: 'mobilePrefix',
        validationRules: [{ type: 'required', isValidateRequired: true }],
      },
      validationRules: [
        { type: 'required', isValidateRequired: true },
        { type: 'validMobileNumberWithPrefix', isValidateRequired: true },
      ],
    }),
    default: () => ({}),
  };

  return (handler[billAccountValueType] || handler.default)();
};

export const getDynamicFields = ({ formDetail, otherBillDetail, purchaseMobileDetail, senderAccount }) => {
  const fields = [];
  const payee = get(otherBillDetail, 'payee', {});

  const isVirtualAccount = get(otherBillDetail, 'isVirtualAccount', false);
  const billAcctReq = Number(get(payee, 'billAcctReq', '')); // Back end gave as string
  const acctDisplayNameReq = get(payee, 'acctDisplayNameReq', ''); // cant set as integer since BE will also return null which have different logic for it
  const refNoReq = Number(get(payee, 'refNoReq', '')); // Back end gave as string
  const refNoNameReq = get(payee, 'refNoNameReq', '');
  const refNoMandatory = get(payee, 'refNoMandatory', '');
  const amountType = purchaseMobileDetail ? get(purchaseMobileDetail, 'amountType', '') : get(payee, 'amountType', '');
  const refNoNameDisplay = get(payee, 'refNoNameDisplay', '');
  const billAccDisplayName = get(payee, 'billAccDisplayName', '');
  const currencyISOCode = get(otherBillDetail, 'currencyISOCode', '');

  // Purchase mobile postpaid props
  const amounts = get(purchaseMobileDetail, 'amountList', []);
  const billAccountValueType = get(purchaseMobileDetail, 'billAccountValueType', '');
  const areaCodeList = get(purchaseMobileDetail, 'areaCodeList', []);

  const currencyMap = get(otherBillDetail, 'currencyMap', []);
  const customerNumberField = getCustomerNumberField({ isVirtualAccount, billAcctReq, acctDisplayNameReq, billAccDisplayName });
  const referenceNumberField = getReferenceNumberField({ isVirtualAccount, refNoReq, refNoNameReq, refNoMandatory, refNoNameDisplay });
  const amountField = getAmount({ amountType, currencyISOCode, currencyMap, amounts, senderAccount }, !isEmpty(purchaseMobileDetail));
  const messageField = getMessage({ isVirtualAccount });
  const mobileNumberField = getMobileNumber({ billAccountValueType, areaCodeList });

  if (otherBillDetail) fields.push(customerNumberField, referenceNumberField, amountField, messageField);
  // Purchase mobile postpaid form
  if (purchaseMobileDetail) fields.push(amountField, mobileNumberField);

  return fields;
};
