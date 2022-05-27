import { last, head } from 'lodash';
import { store } from 'providers/store';

import { get } from 'utils/lodash';
import { findArrayEntry } from 'utils/array';

import { getEducationGoal, getMaxInvestmentGoal, getPensionGoal } from 'middleware/actions/digital-wealth';

import Icon from 'components/common/Icon';
import { PanelItemCard } from 'components/common/cards';

import { DEFAULT_RISK_PROFILE, GBI_RISK_PROFILES } from 'settings/constants/digital-wealth/forms';
import {
  GOAL_TYPE_EDUCATION,
  GOAL_TYPE_INVESTMENT,
  GOAL_TYPE_OTHER,
  GOAL_TYPE_PENSION,
  INVESTMENT_CURRENT_PERIOD,
} from 'settings/constants/digital-wealth';

import { getInvestmentOption, getPensionOption } from './chart';
import { getInvestmentTooltips, getRetirementTooltips } from '.';

export const getGbiDynamicFields = ({ riskProfile, retireAge }) => {
  const bottomLabel = get(findArrayEntry(GBI_RISK_PROFILES, 'value', riskProfile), 'bottomLabel', '');

  return [
    { name: 'riskProfile', bottomLabel },
    {
      name: 'lifeExpectancy',
      validationRules: [{ type: 'validLifeExpectancy', isValidateRequired: true, retireAge }],
    },
  ];
};

// add variant=horizontal to editable fields
export const getGbiEditableFields = (formDetail, isReadOnly) => {
  const fields = get(formDetail, 'selectedGoal.fields', []);
  return fields.filter(field => field.isEditable === true).map(field => ({ ...field, variant: 'horizontal', readOnly: isReadOnly }));
};

export const getGbiBpjsFields = (formDetail, isReadOnly) => {
  const bpjs = findArrayEntry(get(formDetail, 'selectedGoal.fields', []), 'name', 'bpjs');
  const bpjsFields = get(bpjs, 'fields', []).map(field => ({ ...field, variant: 'horizontal', readOnly: isReadOnly }));

  return [{ ...bpjs, fields: bpjsFields, defaultExpanded: true }];
};

export const getGbiRiskFields = (formDetail, isReadOnly) => [
  {
    ...findArrayEntry(get(formDetail, 'selectedGoal.fields', []), 'name', 'riskProfile'),
    label: '',
    variant: 'horizontal',
    readOnly: isReadOnly,
  },
];

export const getRiskLabel = formDetail =>
  get(findArrayEntry(GBI_RISK_PROFILES, 'value', get(formDetail, 'riskProfile', DEFAULT_RISK_PROFILE)), 'label', '');

const getEducationPayload = detail => ({
  targetYear: get(detail, 'investmentPeriod', ''),
  targetFund: get(detail, 'targetFund', ''),
});

const getPensionPayload = detail => ({
  dob: get(detail, 'userDob', ''),
  pensionAge: get(detail, 'retireAge', ''),
  lifeExpectancy: get(detail, 'lifeExpectancy', ''),
  monthlyExpenses: get(detail, 'monthlyExpense', ''),
  bpjsContribution: {
    accountBalance: get(detail, 'bpjsBalance', '0'),
    monthlyContribution: get(detail, 'bpjsContribution', '0'),
  },
});

const getMaxInvestmentPayload = detail => ({
  targetYear: get(detail, 'investmentPeriod', ''),
  monthlyAllocation: get(detail, 'monthlyAmount', ''),
});

const getSimulationPaylod = (type, detail) => {
  const basicPayload = {
    userId: get(detail, 'userId', ''),
    goalName: get(detail, 'goalName', ''),
    initialFund: get(detail, 'initialDeposit', '0'),
    riskType: get(detail, 'riskProfile', ''),
  };

  const handler = {
    [GOAL_TYPE_PENSION]: () => getPensionPayload(detail),
    [GOAL_TYPE_EDUCATION]: () => getEducationPayload(detail),
    [GOAL_TYPE_INVESTMENT]: () => getMaxInvestmentPayload(detail),
    default: () => ({}),
  };
  return { ...basicPayload, ...(handler[type] || handler.default)() };
};

export const getSimulationResult = (type, detail) => {
  const payload = getSimulationPaylod(type, detail);

  const handler = {
    [GOAL_TYPE_PENSION]: () => store.dispatch(getPensionGoal(payload)),
    [GOAL_TYPE_EDUCATION]: () => store.dispatch(getEducationGoal(payload)),
    [GOAL_TYPE_INVESTMENT]: () => store.dispatch(getMaxInvestmentGoal(payload)),
    default: () => null,
  };
  return (handler[type] || handler.default)();
};

export const getResultDetail = (type, { pensionGoal, educationGoal, maxInvestmentGoal }) => {
  const handler = {
    [GOAL_TYPE_PENSION]: () => pensionGoal,
    [GOAL_TYPE_EDUCATION]: () => educationGoal,
    [GOAL_TYPE_INVESTMENT]: () => maxInvestmentGoal,
    default: () => ({}),
  };
  return (handler[type] || handler.default)();
};

export const getChartOption = (type, { datasets, investmentPeriod, retireAge, prevTarget }) => {
  const handler = {
    [GOAL_TYPE_EDUCATION]: () => getInvestmentOption(datasets, investmentPeriod, prevTarget),
    [GOAL_TYPE_PENSION]: () => getPensionOption(datasets, retireAge, prevTarget),
    [GOAL_TYPE_INVESTMENT]: () => getInvestmentOption(datasets, investmentPeriod, prevTarget),
    default: () => ({}),
  };
  return (handler[type] || handler.default)();
};

const goalIcon = {
  [GOAL_TYPE_EDUCATION]: <Icon isAssetIcon type="education" />,
  [GOAL_TYPE_PENSION]: <Icon isAssetIcon type="pension" />,
  [GOAL_TYPE_INVESTMENT]: <Icon isAssetIcon type="investment" />,
  [GOAL_TYPE_OTHER]: <Icon isAssetIcon type="otherGoal" />,
  default: null,
};

export const getPlanSummary = plan => ({
  id: get(plan, 'id', ''),
  goalName: get(plan, 'goalName', ''),
  goalEnd: get(plan, 'terminationDateDisp', ''),
  totalProduct: get(plan, 'totalInvProduct', ''),
  targetInvestment: get(plan, 'totalAmountTargetFundDisp', ''),
  icon: goalIcon[get(plan, 'goalType', '')] || goalIcon.default,
});

export const getPlanDetail = detail => ({
  goalName: get(detail, 'responseData.goalName', ''),
  endDate: get(detail, 'responseData.terminationDateDisp', ''),
  debitDate: get(detail, 'responseData.monthlyDebitDate', ''),
  initialProduct: get(detail, 'responseData.initialAssetName', ''),
  initialInvestment: get(detail, 'responseData.initialAmountDisp', ''),
  totalInvestment: get(detail, 'responseData.totalAmountTargetFundDisp', ''),
  icon: goalIcon[get(detail, 'responseData.goalType', '')] || goalIcon.default,
});

export const getInvestmentDetails = detail => {
  const investments = get(detail, 'responseData.productAllocations', []);

  return investments.map(investment => {
    const info = get(investment, 'productAmountDisp', '');
    const title = (
      <>
        <span>{get(investment, 'assetName', '')}</span>
        <span className="caption">{get(investment, 'productName', '')}</span>
      </>
    );

    return (
      <div className="pb3 investment">
        <PanelItemCard title={title} info={info} />
      </div>
    );
  });
};

export const getSourceFund = detail => ({
  sourceName: get(detail, 'responseData.sourceProductName', ''),
  sourceAmount: get(detail, 'responseData.sourceAmountDisp', ''),
  sourceAccount: get(detail, 'responseData.sourceAccountNo', ''),
});

export const getTargetPeriod = (type, { retireAge, investmentPeriod }) => {
  const handler = {
    [GOAL_TYPE_EDUCATION]: () => investmentPeriod,
    [GOAL_TYPE_PENSION]: () => retireAge,
    [GOAL_TYPE_INVESTMENT]: () => investmentPeriod,
    default: () => '',
  };
  return (handler[type] || handler.default)();
};

export const getTooltips = (type, { datasets, lifeExpectancy, currentAge, retireAge, investmentPeriod }) => {
  const data = get(last(datasets), 'data', []);
  const targetYear = get(last(data), 'x', investmentPeriod);
  const currentYear = get(head(data), 'x', INVESTMENT_CURRENT_PERIOD);

  const handler = {
    // note: education is using the same tooltip as investment
    [GOAL_TYPE_EDUCATION]: () => getInvestmentTooltips({ data, currentAge: currentYear, targetAge: targetYear }),
    [GOAL_TYPE_PENSION]: () => getRetirementTooltips({ data, currentAge, targetAge: retireAge, lastAge: lifeExpectancy }),
    [GOAL_TYPE_INVESTMENT]: () => getInvestmentTooltips({ data, currentAge: currentYear, targetAge: targetYear }),
    default: () => [],
  };
  return (handler[type] || handler.default)();
};
