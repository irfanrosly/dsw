import { trim, isString, isEmpty } from 'lodash';

import { get } from 'utils/lodash';
import { removeStringComma, formatAsCurrency } from 'utils/formatter';

import { TAC_MAX_LENGTH } from 'settings/constants/tac';
import { STATUS_ONLINE } from 'settings/constants/response-codes';
import { MIN_LIFE_EXPECTANCY, MAX_LIFE_EXPECTANCY } from 'settings/constants/digital-wealth';
import { MOBILE_NUMBER_MAX_LENGTH, MOBILE_NUMBER_MIN_LENGTH } from 'settings/constants/transaction';
import { DEFAULT_MIN_LENGTH, DEFAULT_MAX_LENGTH, ACCOUNT_NUMBER_MIN_LENGTH } from 'settings/constants/common';

// Validates data length based on what we want. if no maxlength passed it will just check based on minimum length
export const isLengthValid = (input = '', minLength = DEFAULT_MIN_LENGTH, maxLength = DEFAULT_MAX_LENGTH) => {
  if (!isString(input)) return false;
  const dataLength = trim(input).length;

  if (!maxLength) return !(dataLength < minLength);
  return !(dataLength < minLength || dataLength > maxLength);
};

// Return true if username only contains alphanumeric
export const isValidUsername = username => /^[\w\d]*$/g.test(trim(username));

export const isOdd = number => number % 2 !== 0;

export const isEven = number => number % 2 === 0;

export const isPositive = number => number >= 0;

// Return true if consist at least a number, an uppercase, characters between 8 to 20, can contain special character except [ ] \ " < > ' % ; & +
// eslint-disable-next-line no-useless-escape
export const isValidPassword = password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]*[^\]\[\\"<>'%;&+]{8,20}$/g.test(trim(password));

// For reset password case, special characters is not compulsory
export const isValidResetPassword = password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/g.test(trim(password));

export const isValidTac = tac => new RegExp(`[0-9]{${TAC_MAX_LENGTH}}`, 'g').test(tac);

// Valid email address
export const isValidEmail = value => /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/g.test(trim(value));

// validation based on https://www.iban.com/structure
export const isValidIBAN = number =>
  /^(?:(?:IT|SM)\d{2}[A-Z]\d{22}|CY\d{2}[A-Z]\d{23}|NL\d{2}[A-Z]{4}\d{10}|LV\d{2}[A-Z]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[A-Z]{4}\d{14}|GI\d{2}[A-Z]{4}\d{15}|RO\d{2}[A-Z]{4}\d{16}|KW\d{2}[A-Z]{4}\d{22}|MT\d{2}[A-Z]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})$/g.test(
    trim(number)
  );

export const isLeadingZero = value => isString(value) && value.match(/^0/);

// restrict how many leading zeros allowed
export const isLeadingZeroValid = (value, regex) => isString(value) && new RegExp(`${regex}`, 'g').test(value);

export const isLeadingDot = value => isString(value) && value.match(/^\./);

// Check the service/access status
export const getStatus = res => {
  const status = get(res, 'serviceInfoBean.status', '');
  const offlineMessage = get(res, 'serviceInfoBean.offlineMessage', '');
  return { isStatusOnline: status === STATUS_ONLINE, offlineMessage };
};

// check amount with given minimum/maximum limit
export const isValidMinAmount = (amount, limit) => parseFloat(amount) >= parseFloat(limit);
export const isValidMaxAmount = (amount, limit) => parseFloat(amount) <= parseFloat(limit);

// allowed amount range given min and max amount. only validate if there is a min/max given, if not return true
export const isAllowedAmount = (amount, min, max) => {
  // return true if amount empty
  if (isEmpty(amount)) return true;
  // if no treshold (min or max) value, return true
  const isValidMin = min ? isValidMinAmount(amount, min) : true;
  const isValidMax = max ? isValidMaxAmount(amount, max) : true;

  return isValidMin && isValidMax;
};

// Check if at least 10 digits for account number
export const isValidAccount = account => isLengthValid(account, ACCOUNT_NUMBER_MIN_LENGTH);

export const isValidMobileNumber = (number, minLength = MOBILE_NUMBER_MIN_LENGTH, maxLength = MOBILE_NUMBER_MAX_LENGTH) =>
  new RegExp(`^\\d{${minLength},${maxLength}}$`).test(number);

// inline validation for skn transfer amount
export const isValidSknAmount = ({
  transferAmount,
  minLimitAmount,
  maxLimitAmount,
  currentBalance,
  isAmountValidateRequired,
  isIdrCurrency,
}) => {
  const plainAmount = removeStringComma(transferAmount);

  if (isAmountValidateRequired && !isValidMinAmount(plainAmount, minLimitAmount)) {
    return { isValid: false, messageId: 'transaction.transfer.errorMessage.minAmount', param: formatAsCurrency(minLimitAmount) };
  }

  if (isAmountValidateRequired && !isValidMaxAmount(plainAmount, maxLimitAmount)) {
    return { isValid: false, messageId: 'transaction.transfer.errorMessage.maxAmount', param: formatAsCurrency(maxLimitAmount) };
  }

  // validate current account balance with entered amount when currency is idr
  if (isIdrCurrency && !isValidMaxAmount(plainAmount, currentBalance)) {
    return { isValid: false, messageId: 'transaction.transfer.errorMessage.exceedBalance' };
  }

  return { isValid: true };
};

export const isValidGoalName = value => /^[\w\d -_.@]*$/g.test(trim(value));

// at least one upper case letter in characters
export const hasUpperCase = value => /(?=.*[A-Z])/.test(value);

// at least one lower case letter in characters
export const hasLowerCase = value => /(?=.*[a-z])/.test(value);

// at least one number in characters
export const hasNumber = value => /(?=.*\d)/.test(value);

// check for space in characters
export const hasNoSpace = value => /^\S+$/.test(value);

export const isNewPasswordValid = validators => {
  // filter only hasValidation flag
  const dynamicChecklist = validators.filter(validator => validator.hasValidation);
  // return true if all criteria met
  return dynamicChecklist.every(validator => validator.isValid);
};

export const isPasswordMatch = (oldPassword, newPassword, confirmNewPassword, validators) => {
  // check for each password value
  const isEmptyValues = [oldPassword, newPassword, confirmNewPassword].some(value => isEmpty(value));
  // check if both password match and if all isValid is true
  return !isEmptyValues && newPassword === confirmNewPassword && isNewPasswordValid(validators);
};

export const isValidLifeExpectancy = (value, retireAge) => {
  // life expectancy must above retireAge
  const isValidWithRetireAge = Number(value) > Number(retireAge);
  // valid range is between 60 to 100
  const isValidRange = Number(value) >= MIN_LIFE_EXPECTANCY && Number(value) <= MAX_LIFE_EXPECTANCY;
  return isValidWithRetireAge && isValidRange;
};
