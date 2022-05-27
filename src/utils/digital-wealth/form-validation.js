import { trim, isEmpty } from 'lodash';

import { isValidGoalName, isValidMaxAmount, isValidMinAmount, isValidLifeExpectancy, isAllowedAmount } from 'utils/validation';
import { formatAsCurrency, removeAlphabetWithSpace, removeStringComma } from 'utils/formatter';

export const validResult = { isValid: true, messageId: '' };
const emptyResult = { isValid: false, messageId: 'digitalWealth.gbi.errorMessage.required' };

const validateOnlyRequired = (value, { isValidateRequired }) => {
  if (!isValidateRequired) {
    return validResult;
  }

  return isEmpty(trim(value)) ? emptyResult : validResult;
};

export const validateAmount = (amount, { type, value, isValidateRequired, min, max, multiple }) => {
  // return if validate not required
  if (!isValidateRequired) {
    return validResult;
  }

  // remove NumberField prefix that is included in value
  const plainValue = removeAlphabetWithSpace(removeStringComma(amount)); // IDR 1,234.00 -> 1234.00
  // different error message for min allowed amount and min-max allowed amount
  const amountMessageId = () => {
    if (min && max) {
      return multiple ? 'digitalWealth.gbi.errorMessage.minMaxAmountWithMultiple' : 'digitalWealth.gbi.errorMessage.minMaxAmount';
    }

    return 'digitalWealth.gbi.errorMessage.minAmountWithMultiple';
  };

  const amountRules = {
    // check empty input
    required: () => (isEmpty(trim(plainValue)) ? emptyResult : validResult),
    // check min amount allowed
    minAmount: () =>
      isValidMinAmount(plainValue, value)
        ? validResult
        : { isValid: false, messageId: 'digitalWealth.gbi.errorMessage.minAmount', param: { amount: `IDR ${formatAsCurrency(value)}` } },
    // check max amount allowed
    maxAmount: () =>
      isValidMaxAmount(plainValue, value)
        ? validResult
        : { isValid: false, messageId: 'digitalWealth.gbi.errorMessage.maxAmount', param: { amount: `IDR ${formatAsCurrency(value)}` } },
    allowedAmount: () =>
      isAllowedAmount(plainValue, min, max)
        ? validResult
        : {
            isValid: false,
            messageId: amountMessageId(),
            param: {
              min: `IDR ${formatAsCurrency(min)}`,
              max: `IDR ${formatAsCurrency(max)}`,
              multiple: `IDR ${formatAsCurrency(multiple)}`,
            },
          },
    default: () => validResult,
  };

  return (amountRules[type] || amountRules.default)();
};

export const validateGoalName = (value, { type, isValidateRequired }) => {
  if (!isValidateRequired) {
    return validResult;
  }

  const nameRule = {
    required: () => (isEmpty(trim(value)) ? emptyResult : validResult),
    validGoalName: () => (isValidGoalName(value) ? validResult : { isValid: false, messageId: 'digitalWealth.gbi.errorMessage.goalName' }),
    default: () => validResult,
  };

  return (nameRule[type] || nameRule.default)();
};

export const validateLifeExpectancy = (value, { type, isValidateRequired, retireAge }) => {
  if (!isValidateRequired) {
    return validResult;
  }

  const lifeExpectancyRule = {
    required: () => (isEmpty(trim(value)) ? emptyResult : validResult),
    validLifeExpectancy: () =>
      isValidLifeExpectancy(value, retireAge)
        ? validResult
        : { isValid: false, messageId: 'digitalWealth.gbi.errorMessage.lifeExpectancy' },
    default: () => validResult,
  };

  return (lifeExpectancyRule[type] || lifeExpectancyRule.default)();
};

export const validateInvestmentYears = (value, { type, isValidateRequired, min, max }) => {
  if (!isValidateRequired) {
    return validResult;
  }

  const investmentYearRule = {
    required: () => (isEmpty(trim(value)) ? emptyResult : validResult),
    allowedYear: () =>
      isAllowedAmount(value, min, max)
        ? validResult
        : {
            isValid: false,
            messageId: 'digitalWealth.gbi.errorMessage.minMaxInvestmentPeriod',
            param: { min, max },
          },
    default: () => validResult,
  };

  return (investmentYearRule[type] || investmentYearRule.default)();
};

export const validateGbiInputField = {
  goalName: (value, validationRule) => validateGoalName(value, validationRule),
  investmentPeriod: (value, validationRule) => validateOnlyRequired(value, validationRule),
  targetFund: (value, validationRule) => validateAmount(value, validationRule),
  initialDeposit: (value, validationRule) => validateAmount(value, validationRule),
  riskProfile: (value, validationRule) => validateOnlyRequired(value, validationRule),
  monthlyAmount: (value, validationRule) => validateAmount(value, validationRule),
  monthlyExpense: (value, validationRule) => validateAmount(value, validationRule),
  retireAge: (value, validationRule) => validateOnlyRequired(value, validationRule),
  lifeExpectancy: (value, validationRule) => validateLifeExpectancy(value, validationRule),
  bpjsBalance: (value, validationRule) => validateAmount(value, validationRule),
  bpjsContribution: (value, validationRule) => validateAmount(value, validationRule),
};
