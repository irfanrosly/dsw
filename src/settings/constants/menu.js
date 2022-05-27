import { FormattedMessage } from 'react-intl';
import { ACTION_FORGOT_USER_ID, ACTION_RESET_PASSWORD, CASA_ACCOUNT_CODE, CREDIT_CARD_CODE } from './self-unlock';
import { SETTINGS_PERSONAL_TAB_VALUE, SETTINGS_SECURITY_TAB_VALUE } from './settings';
import { TRANSACTION_PAYMENT_TAB_VALUE, TRANSACTION_PURCHASE_TAB_VALUE, TRANSACTION_TRANSFER_TAB_VALUE } from './transaction';

// Menu items for dropdown menu
export const MENU_ITEMS = {
  dashboard: {
    casa: {
      mains: [
        { label: <FormattedMessage id="dashboard.casa.menu.viewDetails" />, option: 'details' },
        { label: <FormattedMessage id="dashboard.casa.menu.payment" />, option: 'payment' },
        { label: <FormattedMessage id="dashboard.casa.menu.transfer" />, option: 'transfer' },
        { label: <FormattedMessage id="dashboard.casa.menu.purchase" />, option: 'purchase' },
      ],
      details: [
        { label: <FormattedMessage id="dashboard.casa.menu.payment" />, option: 'payment' },
        { label: <FormattedMessage id="dashboard.casa.menu.transfer" />, option: 'transfer' },
        { label: <FormattedMessage id="dashboard.casa.menu.purchase" />, option: 'purchase' },
      ],
      transactions: [
        { label: <FormattedMessage id="dashboard.casa.transactionHistory.today" />, value: 'today' },
        { label: <FormattedMessage id="dashboard.casa.transactionHistory.thisMonth" />, value: 'thisMonth' },
        { label: <FormattedMessage id="dashboard.casa.transactionHistory.previousMonth" />, value: 'previousMonth' },
      ],
      transactionTypes: [{ label: <FormattedMessage id="dashboard.casa.transactionHistory.allTransactionDetails" />, value: 'all' }],
    },

    loan: {
      mains: [{ label: <FormattedMessage id="dashboard.loan.menu.viewDetail" />, option: 'detail' }],
      details: [],
    },

    creditCard: {
      mains: [
        { label: <FormattedMessage id="dashboard.cc.menu.viewDetail" />, option: 'viewDetail' },
        { label: <FormattedMessage id="dashboard.cc.menu.payCard" />, option: 'payCard' },
      ],
      details: [{ label: <FormattedMessage id="dashboard.cc.menu.blockCard" />, option: 'blockCard' }],
      transactionHistory: {
        categories: [{ value: 'all', label: <FormattedMessage id="dashboard.cc.transactionHistory.allTransactionHistory" /> }],
        ranges: [
          { value: 'currentStatement', label: <FormattedMessage id="dashboard.cc.transactionHistory.currentStatement" /> },
          { value: 'nextStatement', label: <FormattedMessage id="dashboard.cc.transactionHistory.nextStatement" /> },
          { value: 'previousStatement', label: <FormattedMessage id="dashboard.cc.transactionHistory.previousStatement" /> },
        ],
      },
    },

    timeDeposit: {
      mains: [{ label: <FormattedMessage id="dashboard.td.menu.viewDetail" />, option: 'viewDetail' }],
      details: [{ label: <FormattedMessage id="dashboard.td.menu.stopARO" />, option: 'stopARO' }],
    },
  },
  selfUnlock: {
    types: [
      { label: <FormattedMessage id="selfUnlock.accountNumber" />, value: CASA_ACCOUNT_CODE },
      { label: <FormattedMessage id="selfUnlock.creditCard" />, value: CREDIT_CARD_CODE },
    ],
    action: {
      normal: [
        { label: <FormattedMessage id="selfUnlock.modal.unlock.forgotUserId" />, value: ACTION_FORGOT_USER_ID },
        { label: <FormattedMessage id="selfUnlock.modal.unlock.resetPassword" />, value: ACTION_RESET_PASSWORD },
      ],
      locked: [{ label: <FormattedMessage id="selfUnlock.modal.unlock.unlockUserIdOrTac" />, value: 0 }],
    },
  },
  transaction: {
    navigationTab: [
      {
        type: 'payment',
        value: TRANSACTION_PAYMENT_TAB_VALUE,
        label: <FormattedMessage id="transaction.payment.label" />,
      },
      {
        type: 'transfer',
        value: TRANSACTION_TRANSFER_TAB_VALUE,
        label: <FormattedMessage id="transaction.transfer.label" />,
      },
      {
        type: 'purchase',
        value: TRANSACTION_PURCHASE_TAB_VALUE,
        label: <FormattedMessage id="transaction.purchase.label" />,
      },
    ],
  },
  settings: {
    navigationTab: [
      {
        type: 'personal',
        value: SETTINGS_PERSONAL_TAB_VALUE,
        label: <FormattedMessage id="settings.personal.label" />,
      },
      {
        type: 'security',
        value: SETTINGS_SECURITY_TAB_VALUE,
        label: <FormattedMessage id="settings.security.label" />,
      },
    ],
  },
};
