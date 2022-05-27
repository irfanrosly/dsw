import { FormattedMessage } from 'react-intl';

import { ALIGN_RIGHT } from 'settings/constants/ui-control';

export const INITIAL_DASHBAORD_TAB = 'casa';

// for exchange rate disclaimer
export const BASE_CURRENCY_DISPLAY = '1';

// To parse debitCreditIndicator from API
export const DEFAULT_DEBIT_CREDIT_INDICATOR = 1;

export const DEFAULT_CREDIT_CARD_HISTORY_VALUE = 'currentStatement';

export const WEALTH_MUTUAL_FUND = '300';
export const WEALTH_BOND_FUND = '500';
export const WEALTH_BANCA_FUND = '400';

export const WEALTH_HISTORY_30_DAY = '30';
export const WEALTH_HISTORY_60_DAY = '60';
export const WEALTH_HISTORY_90_DAY = '90';

export const INITIAL_ACCOUNT_BALANCES = [
  {
    value: 'casa',
    label: <FormattedMessage id="dashboard.casa.label" />,
    link: '/dashboard/casa',
  },
  {
    value: 'td',
    label: <FormattedMessage id="dashboard.td.label" />,
    link: '/dashboard/td',
  },
  {
    value: 'cc',
    label: <FormattedMessage id="dashboard.cc.label" />,
    link: '/dashboard/cc',
  },
  {
    value: 'loan',
    label: <FormattedMessage id="dashboard.loan.label" />,
    link: '/dashboard/loan',
  },
  {
    value: 'wealth',
    label: <FormattedMessage id="dashboard.wealth.label" />,
    link: '/dashboard/wealth',
  },
];

export const CASA_TRANSACTION_COLUMNS = [
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'description', headerName: 'Description' },
  { field: 'amount', headerName: 'Amount' },
];

export const TIME_DEPOSIT_INSTRUCTION = {
  NON_APPLICABLE: -1,
  PRINCIPAL_ROLLOVER: 0,
  PRINCIPAL_INTEREST_ROLLOVER: 1,
  TERMINATED: 2,
};

export const LOAN_PAYMENT_HEADER_ITEMS = [
  { field: 'maturityDate', headerName: <FormattedMessage id="dashboard.loan.details.maturity" /> },
  { field: 'currentInterestBalance', headerName: <FormattedMessage id="dashboard.loan.details.currentBalance" /> },
  { field: 'currentPrincipalAmount', headerName: <FormattedMessage id="dashboard.loan.details.totalBilled" /> },
  { field: 'loanOutstanding', headerName: <FormattedMessage id="dashboard.loan.details.outstanding" /> },
  { field: 'loanPayOffAmountAsToday', headerName: <FormattedMessage id="dashboard.loan.details.payoffAmount" /> },
  { field: 'loanTenor', headerName: <FormattedMessage id="dashboard.loan.details.tenor" /> },
];

export const MUTUAL_FUND_SUMMARY_TABLE_HEADER_ITEMS = [
  { field: 'fundName', headerName: <FormattedMessage id="dashboard.wealth.details.fundName" /> },
  { field: 'fundManager', headerName: <FormattedMessage id="dashboard.wealth.details.fundManager" /> },
  { field: 'totalUnit', headerName: <FormattedMessage id="dashboard.wealth.details.totalUnit" /> },
  { field: 'navDisp', headerName: <FormattedMessage id="dashboard.wealth.details.nav" /> },
  { field: 'growthFund', headerName: <FormattedMessage id="dashboard.wealth.details.growthFund" /> },
  { field: 'balanceDisp', headerName: <FormattedMessage id="dashboard.wealth.details.balance" /> },
];

export const BOND_TABLE_SUMMARY_HEADER_ITEMS = [
  { field: 'productName', headerName: <FormattedMessage id="dashboard.wealth.details.productName" /> },
  { field: 'coupon', headerName: <FormattedMessage id="dashboard.wealth.details.coupon" /> },
  { field: 'maturityDateDisp', headerName: <FormattedMessage id="dashboard.wealth.details.maturityDate" /> },
  { field: 'tenor', headerName: <FormattedMessage id="dashboard.wealth.details.tenor" /> },
  { field: 'balanceDisp', headerName: <FormattedMessage id="dashboard.wealth.details.balance" /> },
  { field: 'action', headerName: '' },
];

export const BANCA_TABLE_SUMMARY_HEADER_ITEMS = [
  { field: 'productName', headerName: <FormattedMessage id="dashboard.wealth.details.productName" /> },
  { field: 'policyNo', headerName: <FormattedMessage id="dashboard.wealth.details.policyNumber" /> },
  { field: 'policyHolderName', headerName: <FormattedMessage id="dashboard.wealth.details.policyHolderName" /> },
  { field: 'fundName', headerName: <FormattedMessage id="dashboard.wealth.details.fundName" /> },
  { field: 'balanceUnitDisp', headerName: <FormattedMessage id="dashboard.wealth.details.balanceUnit" /> },
  { field: 'balanceDisp', headerName: <FormattedMessage id="dashboard.wealth.details.balance" /> },
];

export const CASA_TRANSACTION_HEADER_ITEMS = [
  { field: 'transactionDate', headerName: <FormattedMessage id="dashboard.casa.details.date" /> },
  { field: 'transactionDescription', headerName: <FormattedMessage id="dashboard.casa.details.description" /> },
  { field: 'debitCreditAmount', headerName: <FormattedMessage id="dashboard.casa.details.amount" />, align: ALIGN_RIGHT },
];

export const CREDIT_CARD_TABLE_HEADER_ITEMS = [
  { field: 'transactionDate', headerName: <FormattedMessage id="dashboard.cc.details.date" /> },
  { field: 'transactionDescription', headerName: <FormattedMessage id="dashboard.cc.details.description" /> },
  { field: 'amount', headerName: <FormattedMessage id="dashboard.cc.details.amount" />, align: ALIGN_RIGHT },
];
