import isString from 'lodash/isString';

import {
  DEFAULT_INT_ZERO,
  COMMA_POSITION,
  INT_ONE,
  MATCH_RESULT_INDEX,
  MOBILE_NUMBER_PREFIX,
  CURRENCY_MAX_FRACTION_DIGIT,
} from 'settings/constants/common';

// In JavaScript, `null`, `[]` is also type "object", so we need to exclude them
export const isObject = data => data && typeof data === 'object' && !Array.isArray(data);

// Ensure it's a collection (array of objects) and not a mixture array
const isCollection = data => Array.isArray(data) && data.some(item => isObject(item));

// NOTE: Try not to split each function that use inside formatKeys, else it will have error.
// Format our keys to match API keys naming standard (eg. productAccountNumber => productAccNo)
export const formatKeys = (obj, keyMap) =>
  Object.entries(obj).reduce((acc, cur) => {
    const [key, value] = cur;

    // Find from keymaps or use the same key
    const newKey = keyMap[key] || key;

    // Handle for array of objects / collections
    if (isCollection(value)) {
      return { ...acc, [newKey]: value.map(each => formatKeys(each, keyMap)) };
    }

    // Rename the object keys recursively
    if (isObject(value)) {
      return { ...acc, [newKey]: formatKeys(value, keyMap) };
    }

    return { ...acc, [newKey]: value };
  }, {});

// Remove multiple keys in an object
export const removeKeysInObject = (object, unwantedKeys) =>
  Object.keys(object).reduce((acc, key) => {
    if (!unwantedKeys.includes(key)) {
      acc[key] = object[key];
    }
    return acc;
  }, {});

// Rename incoming API array's key
// isSingleArray flag used for array e.g: ['123','456'] to become [{value: '123', label: '123'}, {value: '456', label: '456}]
export const formatArrayKeys = (array, keyLabel = 'value', valueLabel = 'label', isSingleArray) =>
  Array.isArray(array) &&
  array.reduce((acc, arr) => [...acc, { [keyLabel]: isSingleArray ? arr : arr.key, [valueLabel]: isSingleArray ? arr : arr.value }], []);

// Being used for input to only allow number when onChange
export const onlyNumber = value => isString(value) && value.replace(/[^0-9]/g, '');

// Allows alphabet, number only
export const alphaNumeric = value => isString(value) && value.replace(/[^a-zA-Z0-9]/g, '');

// Allows alphabet, number and whitespace only
export const alphaNumericSpace = value => isString(value) && value.replace(/[^a-zA-Z0-9 ]/g, '');

// Allows alphabet, number, whitespace and dot only
export const alphaNumericSpaceDot = value => isString(value) && value.replace(/[^a-zA-Z0-9. ]/g, '');

// Allows alphabet, number and whitespace, @, -, ', .
export const formatName = value => isString(value) && value.replace(/[^a-zA-Z0-9 @\-.']/g, '');

// beneficiary nickname for favourite transaction
export const formatFavoriteNickname = value => isString(value) && value.replace(/[^a-zA-Z0-9 -.]/g, '');

// allows alphabet and whitespace only
export const alphabetWithSpace = value => isString(value) && value.replace(/[^a-zA-Z ]/g, '');

// unformat currency, remove comma from formatted string
export const removeStringComma = value => isString(value) && value.replace(/,/g, '');

// remove NumberField prefix that is included in value when using event.target.value
export const removeAlphabetWithSpace = value => isString(value) && value.replace(/[a-zA-Z ]/g, '');

// remove leading zero from string. Ex: 00123 => 123
export const removeLeadingZero = value => isString(value) && value.replace(/^0+/g, '');

// remove some special characters that is (logically) not appear in bank name
export const formatBankName = name => isString(name) && name.replace(/[#$%^*=+?/;|\\~`!]/g, '');

// remove after decimal. Eg: 123,4.12 -> 123,4
export const removeDecimal = value => isString(value) && value.replace(/\.(.*?\d*)/g, '');

// avoid cursor jump to end when edit amount in the middle
// https://stackoverflow.com/a/49648061
export const changeCursorPosition = event => {
  const valueLength = event.target.value.length;
  const cursorPosition = event.target.selectionStart;

  // cursor move forward by 1 to avoid positioning on comma for amount
  const newCursorPosition = valueLength % COMMA_POSITION === DEFAULT_INT_ZERO ? cursorPosition + INT_ONE : cursorPosition;

  window.requestAnimationFrame(() => {
    // eslint-disable-next-line no-param-reassign
    event.target.selectionStart = newCursorPosition;
    // eslint-disable-next-line no-param-reassign
    event.target.selectionEnd = newCursorPosition;
  });
};

// format entered number as currency. ie: 1000.00 => 1,000.00
export const formatAsCurrency = (value, event = null, decimal = true) => {
  if (!isString(value)) return value;
  if (event) changeCursorPosition(event);
  // extract number from formatted string & limit only 2 decimal places
  const amount = removeStringComma(removeLeadingZero(value)).match(/\d+(\.\d{0,2})?/g);
  // return formatted string from matching number or empty string if not found
  const formattedAmount = Array.isArray(amount) ? amount[MATCH_RESULT_INDEX].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '';

  return decimal ? formattedAmount : removeDecimal(formattedAmount);
};

// format errorcode into react-intl message
export const formatErrorMessage = (formatter, code, params = {}) => formatter({ id: `errorMessages.ERR_${code}` }, params);

// returns 10500000 => 10.5m
export const formatCurrencyCompact = value =>
  Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: CURRENCY_MAX_FRACTION_DIGIT }).format(value).toLocaleLowerCase();

export const formatMobileNumber = value => MOBILE_NUMBER_PREFIX.concat(value);

export const allowedPasswordCharacter = value => isString(value) && value.replace(/["<>'%;[\]&+\\]/g, '');
