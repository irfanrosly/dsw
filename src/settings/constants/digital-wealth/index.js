import { FormattedMessage } from 'react-intl';

import Icon from 'components/common/Icon';

import { DEFAULT_RISK_PROFILE, EDUCATION_FORM_FIELDS, MAX_INVESTMENT_FORM_FIELDS, PENSION_FORM_FIELDS } from './forms';

export const DEFAULT_PORFOLIO_TAB = 0;
export const DEFAULT_PORTFOLIO_CLASSIFICATION = 0;
export const PORTFOLIO_CLASSIFICATION_MENU = [
  { value: 0, label: <FormattedMessage id="digitalWealth.menu.assets" values={{ totalAsset: '' }} /> },
  { value: 1, label: <FormattedMessage id="digitalWealth.menu.loans" values={{ totalBorrowing: '' }} /> },
];

export const FINANCIAL_GOAL_TAB = 1;
export const PORTFOLIO_MENU = [
  { value: 0, label: <FormattedMessage id="digitalWealth.menu.portfolio" /> },
  { value: 1, label: <FormattedMessage id="digitalWealth.menu.financialGoal" /> },
];

export const INVESTMENT_CURRENT_PERIOD = 0;

export const GBI_STEP_CHOOSE_PLAN = 0;
export const GBI_STEP_PLANNING = 1;
export const GBI_STEP_RESULT = 2;

export const GOAL_SIMULATION_STEPS = [
  { step: GBI_STEP_CHOOSE_PLAN, label: <FormattedMessage id="digitalWealth.gbi.stepper.chooseFinancialPlan" /> },
  { step: GBI_STEP_PLANNING, label: <FormattedMessage id="digitalWealth.gbi.stepper.planning" /> },
  { step: GBI_STEP_RESULT, label: <FormattedMessage id="digitalWealth.gbi.stepper.simulationResult" /> },
];

export const GOAL_TYPE_INVESTMENT = '100';
export const GOAL_TYPE_PENSION = '200';
export const GOAL_TYPE_EDUCATION = '300';
export const GOAL_TYPE_OTHER = '400';
export const FINANCIAL_GOALS = [
  {
    type: GOAL_TYPE_PENSION,
    fields: PENSION_FORM_FIELDS,
    icon: <Icon isAssetIcon type="pension" />,
    title: <FormattedMessage id="digitalWealth.gbi.pensionFund.title" />,
    typeLabel: <FormattedMessage id="digitalWealth.gbi.pensionFund.type" />,
    resultHeader: <FormattedMessage id="digitalWealth.gbi.pensionFund.resultHeader" />,
    description: <FormattedMessage id="digitalWealth.gbi.pensionFund.description" />,
    planningTitle: <FormattedMessage id="digitalWealth.gbi.pensionFund.planningTitle" />,
    targetTitle: <FormattedMessage id="digitalWealth.gbi.pensionFund.targetTitle" />,
    investmentTitle: <FormattedMessage id="digitalWealth.gbi.pensionFund.investmentTitle" />,
  },
  {
    type: GOAL_TYPE_INVESTMENT,
    fields: MAX_INVESTMENT_FORM_FIELDS,
    icon: <Icon isAssetIcon type="investment" />,
    title: <FormattedMessage id="digitalWealth.gbi.maxInvestment.title" />,
    typeLabel: <FormattedMessage id="digitalWealth.gbi.maxInvestment.type" />,
    resultHeader: <FormattedMessage id="digitalWealth.gbi.maxInvestment.resultHeader" />,
    description: <FormattedMessage id="digitalWealth.gbi.maxInvestment.description" />,
    planningTitle: <FormattedMessage id="digitalWealth.gbi.maxInvestment.planningTitle" />,
    targetTitle: <FormattedMessage id="digitalWealth.gbi.maxInvestment.targetTitle" />,
    investmentTitle: <FormattedMessage id="digitalWealth.gbi.maxInvestment.investmentTitle" />,
  },
  {
    type: GOAL_TYPE_EDUCATION,
    fields: EDUCATION_FORM_FIELDS,
    icon: <Icon isAssetIcon type="education" />,
    title: <FormattedMessage id="digitalWealth.gbi.educationFund.title" />,
    typeLabel: <FormattedMessage id="digitalWealth.gbi.educationFund.type" />,
    resultHeader: <FormattedMessage id="digitalWealth.gbi.educationFund.resultHeader" />,
    description: <FormattedMessage id="digitalWealth.gbi.educationFund.description" />,
    planningTitle: <FormattedMessage id="digitalWealth.gbi.educationFund.planningTitle" />,
    targetTitle: <FormattedMessage id="digitalWealth.gbi.educationFund.targetTitle" />,
    investmentTitle: <FormattedMessage id="digitalWealth.gbi.educationFund.investmentTitle" />,
  },
];

export const GBI_FORM_INPUT = {
  isRecurring: false,
  goalName: '',
  investmentPeriod: '',
  targetFund: '',
  monthlyAmount: '',
  retireAge: '',
  prevTarget: '',
  lifeExpectancy: '',
  monthlyExpense: '',
  bpjsBalance: '0',
  bpjsContribution: '0',
  initialDeposit: '0',
  riskProfile: DEFAULT_RISK_PROFILE,
};

export const MIN_LIFE_EXPECTANCY = 60;
export const MAX_LIFE_EXPECTANCY = 100;
