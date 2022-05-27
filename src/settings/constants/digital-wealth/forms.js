import Typography from '@material-ui/core/Typography';

import { translate } from 'utils/i18n';

import { CURRENCY_IDR_PREFIX } from '../common';
import {
  FIELD_TYPE_TEXT,
  FIELD_TYPE_NUMBER,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_ACCORDION,
  FORMAT_ALPHANUMERIC,
  FORMAT_NUMBER,
} from '../transaction';

export const GOAL_NAME_MAXLENGTH = 50;
export const PENSION_AGE_MAXLENGTH = 3;
export const TARGET_FUND_MAXLENGTH = 25;
export const INVESTMENT_PERIOD_MAXLENGTH = 2;

export const MIN_INVESTMENT_YEAR = 2;
export const MAX_INVESTMENT_YEAR = 30;

export const AMOUNT_MULTIPLY_VALUE = 10000;
export const MIN_MONTHLY_INVESTMENT = 100000;
export const MIN_RETIREMENT_EXPENSES = 1000000;
export const MAX_RETIREMENT_EXPENSES = 5000000000;
export const MIN_BPJS_ACCOUNT_BALANCE = 100000;
export const MAX_BPJS_ACCOUNT_BALANCE = 1000000000;
export const MIN_INITIAL_FUND_AMOUNT = 100000;
export const MAX_INITIAL_FUND_AMOUNT = 1000000000;

export const DEFAULT_RISK_PROFILE = 'KONSERVATIF';
export const GBI_RISK_PROFILES = [
  {
    value: 'KONSERVATIF',
    label: translate('digitalWealth.gbi.riskProfile.conservative'),
    bottomLabel: 'digitalWealth.gbi.riskProfile.conservativeMessage',
  },
  {
    value: 'MODERAT',
    label: translate('digitalWealth.gbi.riskProfile.moderate'),
    bottomLabel: 'digitalWealth.gbi.riskProfile.moderateMessage',
  },
  {
    value: 'AGRESIF',
    label: translate('digitalWealth.gbi.riskProfile.aggressive'),
    bottomLabel: 'digitalWealth.gbi.riskProfile.aggressiveMessage',
  },
];

const INITIAL_FUND_REGEX = '(^0{1}$)|((^[1-9])[0-9]*$)';

export const EDUCATION_FORM_FIELDS = [
  {
    name: 'goalName',
    label: 'digitalWealth.gbi.form.name.label',
    placeholder: 'digitalWealth.gbi.form.name.placeholder',
    type: FIELD_TYPE_TEXT,
    format: FORMAT_ALPHANUMERIC,
    maxLength: GOAL_NAME_MAXLENGTH,
    validationRules: [
      { type: 'validGoalName', isValidateRequired: true },
      { type: 'required', isValidateRequired: true },
    ],
  },
  {
    name: 'investmentPeriod',
    label: 'digitalWealth.gbi.form.fundraisingPeriod.label',
    placeholder: 'digitalWealth.gbi.form.fundraisingPeriod.placeholder',
    isEditable: true,
    type: FIELD_TYPE_TEXT,
    format: FORMAT_NUMBER,
    hasRightLabel: true,
    maxLength: INVESTMENT_PERIOD_MAXLENGTH,
    rightLabel: translate('digitalWealth.gbi.form.years'),
    validationRules: [
      { type: 'required', isValidateRequired: true },
      {
        type: 'allowedYear',
        isValidateRequired: true,
        min: MIN_INVESTMENT_YEAR,
        max: MAX_INVESTMENT_YEAR,
      },
    ],
  },
  {
    name: 'targetFund',
    label: 'digitalWealth.gbi.form.targetFund.label',
    placeholder: 'digitalWealth.gbi.form.targetFund.placeholder',
    isEditable: true,
    allowDecimal: false,
    type: FIELD_TYPE_NUMBER,
    prefix: CURRENCY_IDR_PREFIX,
    maxLength: TARGET_FUND_MAXLENGTH,
    validationRules: [
      { type: 'required', isValidateRequired: true },
      {
        type: 'allowedAmount',
        isValidateRequired: true,
        min: MIN_MONTHLY_INVESTMENT,
        multiple: AMOUNT_MULTIPLY_VALUE,
      },
    ],
  },
  {
    name: 'initialDeposit',
    label: 'digitalWealth.gbi.form.initialFundPlacement.label',
    isEditable: true,
    allowDecimal: false,
    // allow just one zero or [1-9] digits
    leadingZeroRegex: INITIAL_FUND_REGEX,
    allowLeadingZero: true,
    type: FIELD_TYPE_NUMBER,
    prefix: CURRENCY_IDR_PREFIX,
    maxLength: TARGET_FUND_MAXLENGTH,
    validationRules: [
      {
        type: 'allowedAmount',
        isValidateRequired: true,
        min: MIN_INITIAL_FUND_AMOUNT,
        max: MAX_INITIAL_FUND_AMOUNT,
        multiple: AMOUNT_MULTIPLY_VALUE,
      },
    ],
  },
  {
    name: 'riskProfile',
    label: 'digitalWealth.gbi.form.riskProfile',
    type: FIELD_TYPE_SELECT,
    options: GBI_RISK_PROFILES,
    className: 'mb3',
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
];

export const MAX_INVESTMENT_FORM_FIELDS = [
  {
    name: 'goalName',
    label: 'digitalWealth.gbi.form.name.label',
    placeholder: 'digitalWealth.gbi.form.name.placeholder',
    type: FIELD_TYPE_TEXT,
    format: FORMAT_ALPHANUMERIC,
    maxLength: GOAL_NAME_MAXLENGTH,
    validationRules: [
      { type: 'validGoalName', isValidateRequired: true },
      { type: 'required', isValidateRequired: true },
    ],
  },
  {
    name: 'investmentPeriod',
    label: 'digitalWealth.gbi.form.investmentPeriod.label',
    placeholder: 'digitalWealth.gbi.form.investmentPeriod.placeholder',
    isEditable: true,
    type: FIELD_TYPE_TEXT,
    format: FORMAT_NUMBER,
    hasRightLabel: true,
    maxLength: INVESTMENT_PERIOD_MAXLENGTH,
    rightLabel: translate('digitalWealth.gbi.form.years'),
    validationRules: [
      { type: 'required', isValidateRequired: true },
      {
        type: 'allowedYear',
        isValidateRequired: true,
        min: MIN_INVESTMENT_YEAR,
        max: MAX_INVESTMENT_YEAR,
      },
    ],
  },
  {
    name: 'monthlyAmount',
    label: 'digitalWealth.gbi.form.monthlyAmount.label',
    placeholder: 'digitalWealth.gbi.form.monthlyAmount.placeholder',
    isEditable: true,
    allowDecimal: false,
    type: FIELD_TYPE_NUMBER,
    prefix: CURRENCY_IDR_PREFIX,
    maxLength: TARGET_FUND_MAXLENGTH,
    validationRules: [
      { type: 'required', isValidateRequired: true },
      {
        type: 'allowedAmount',
        isValidateRequired: true,
        min: MIN_MONTHLY_INVESTMENT,
        multiple: AMOUNT_MULTIPLY_VALUE,
      },
    ],
  },
  {
    name: 'initialDeposit',
    label: 'digitalWealth.gbi.form.initialFundPlacement.label',
    placeholder: 'digitalWealth.gbi.form.initialFundPlacement.placeholder',
    isEditable: true,
    allowDecimal: false,
    leadingZeroRegex: INITIAL_FUND_REGEX,
    allowLeadingZero: true,
    type: FIELD_TYPE_NUMBER,
    prefix: CURRENCY_IDR_PREFIX,
    maxLength: TARGET_FUND_MAXLENGTH,
  },
  {
    name: 'riskProfile',
    label: 'digitalWealth.gbi.form.riskProfile',
    type: FIELD_TYPE_SELECT,
    options: GBI_RISK_PROFILES,
    className: 'mb3',
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
];

const BpjsTitle = () => (
  <>
    <Typography className="b">{translate('digitalWealth.gbi.form.bpjsTitle')}</Typography>
    <Typography variant="caption">{translate('digitalWealth.gbi.form.bpjsDescription')}</Typography>
  </>
);
export const PENSION_FORM_FIELDS = [
  {
    name: 'goalName',
    label: 'digitalWealth.gbi.form.name.label',
    placeholder: 'digitalWealth.gbi.form.name.placeholder',
    type: FIELD_TYPE_TEXT,
    format: FORMAT_ALPHANUMERIC,
    maxLength: GOAL_NAME_MAXLENGTH,
    validationRules: [
      { type: 'validGoalName', isValidateRequired: true },
      { type: 'required', isValidateRequired: true },
    ],
  },
  {
    name: 'retireAge',
    label: 'digitalWealth.gbi.form.retireAge.label',
    placeholder: 'digitalWealth.gbi.form.retireAge.placeholder',
    isEditable: true,
    type: FIELD_TYPE_TEXT,
    format: FORMAT_NUMBER,
    hasRightLabel: true,
    maxLength: PENSION_AGE_MAXLENGTH,
    rightLabel: translate('digitalWealth.gbi.form.yearsOld'),
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    name: 'lifeExpectancy',
    label: 'digitalWealth.gbi.form.lifeExpectancy.label',
    placeholder: 'digitalWealth.gbi.form.lifeExpectancy.placeholder',
    isEditable: true,
    type: FIELD_TYPE_TEXT,
    format: FORMAT_NUMBER,
    hasRightLabel: true,
    maxLength: PENSION_AGE_MAXLENGTH,
    rightLabel: translate('digitalWealth.gbi.form.yearsOld'),
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    name: 'monthlyExpense',
    label: 'digitalWealth.gbi.form.monthlyExpense.label',
    placeholder: 'digitalWealth.gbi.form.monthlyExpense.placeholder',
    isEditable: true,
    allowDecimal: false,
    type: FIELD_TYPE_NUMBER,
    prefix: CURRENCY_IDR_PREFIX,
    maxLength: TARGET_FUND_MAXLENGTH,
    validationRules: [
      { type: 'required', isValidateRequired: true },
      {
        type: 'allowedAmount',
        isValidateRequired: true,
        min: MIN_RETIREMENT_EXPENSES,
        max: MAX_RETIREMENT_EXPENSES,
        multiple: AMOUNT_MULTIPLY_VALUE,
      },
    ],
  },
  {
    name: 'initialDeposit',
    label: 'digitalWealth.gbi.form.initialDeposit.label',
    placeholder: 'digitalWealth.gbi.form.initialDeposit.placeholder',
    isEditable: true,
    allowDecimal: false,
    leadingZeroRegex: INITIAL_FUND_REGEX,
    allowLeadingZero: true,
    type: FIELD_TYPE_NUMBER,
    prefix: CURRENCY_IDR_PREFIX,
    maxLength: TARGET_FUND_MAXLENGTH,
  },
  {
    name: 'riskProfile',
    label: 'digitalWealth.gbi.form.riskProfile',
    type: FIELD_TYPE_SELECT,
    options: GBI_RISK_PROFILES,
    className: 'mb3',
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    name: 'bpjs',
    type: FIELD_TYPE_ACCORDION,
    defaultExpanded: false,
    title: <BpjsTitle />,
    fields: [
      {
        name: 'bpjsBalance',
        label: 'digitalWealth.gbi.form.bpjsBalance',
        type: FIELD_TYPE_NUMBER,
        prefix: CURRENCY_IDR_PREFIX,
        allowDecimal: false,
        leadingZeroRegex: INITIAL_FUND_REGEX,
        allowLeadingZero: true,
        hasToolTip: true,
        maxLength: TARGET_FUND_MAXLENGTH,
        toolTipTitle: 'digitalWealth.gbi.form.bpjsBalanceTooltip',
        validationRules: [
          {
            type: 'allowedAmount',
            isValidateRequired: true,
            min: MIN_BPJS_ACCOUNT_BALANCE,
            max: MAX_BPJS_ACCOUNT_BALANCE,
          },
        ],
      },
      {
        name: 'bpjsContribution',
        label: 'digitalWealth.gbi.form.bpjsContribution',
        type: FIELD_TYPE_NUMBER,
        prefix: CURRENCY_IDR_PREFIX,
        allowDecimal: false,
        leadingZeroRegex: INITIAL_FUND_REGEX,
        allowLeadingZero: true,
        hasToolTip: true,
        maxLength: TARGET_FUND_MAXLENGTH,
        toolTipTitle: 'digitalWealth.gbi.form.bpjsContributionTooltip',
        validationRules: [
          {
            type: 'allowedAmount',
            isValidateRequired: true,
            min: MIN_BPJS_ACCOUNT_BALANCE,
            max: MAX_BPJS_ACCOUNT_BALANCE,
          },
        ],
      },
    ],
  },
];
