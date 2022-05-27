import { FormattedMessage } from 'react-intl';

import { get } from 'utils/lodash';
import { removeStringComma } from 'utils/formatter';

import { CURRENCY_IDR, DEFAULT_INT_ZERO } from 'settings/constants/common';
import { DEFAULT_MAX_TRANSFER_AMOUNT, DEFAULT_MIN_TRANSFER_AMOUNT } from 'settings/constants/transaction';

export const getVirtualConfirmationBody = payload => ({
  userId: get(payload, 'userId', ''),
  toAccountNumber: get(payload, 'accountNumber', ''),
  fromAccountNumber: get(payload, 'senderAccount.accountNumber', ''),
  fromCurrency: get(payload, 'senderAccount.currency', ''),
  toAmount: removeStringComma(get(payload, 'transferAmount', '')),
  fromAccountList: get(payload, 'initialSenderAccounts', ''),
});

export const getVirtualAccountDynamicFields = senderAccount => {
  const currentBalance = get(senderAccount, 'plainBalance', DEFAULT_INT_ZERO);
  const currency = get(senderAccount, 'currency', CURRENCY_IDR);

  return [
    {
      name: 'transferAmount',
      validationRules: [
        { type: 'required', isValidateRequired: true },
        {
          type: 'senderBalance',
          value: currentBalance,
          isValidateRequired: currency === CURRENCY_IDR,
        },
        { type: 'minAmount', value: DEFAULT_MIN_TRANSFER_AMOUNT, isValidateRequired: true },
        { type: 'maxAmount', value: DEFAULT_MAX_TRANSFER_AMOUNT, isValidateRequired: true },
      ],
    },
  ];
};

export const getVirtualAccountMonetaries = detail => {
  const transactionAmount = get(detail, 'toAmountDis', '');
  const transactionFee = get(detail, 'chargeAmountDis', '');
  const debitedAmount = get(detail, 'debitAmountDis', '');
  const localDebitedAmount = get(detail, 'localAmountDis', '');

  return [
    { title: <FormattedMessage id="transaction.transfer.transactionAmount" />, info: transactionAmount },
    { title: <FormattedMessage id="transaction.transfer.transactionFee" />, info: transactionFee },
    { title: <FormattedMessage id="transaction.transfer.totalDebit" />, info: debitedAmount },
    { title: <FormattedMessage id="transaction.transfer.localDebitedAmount" />, info: localDebitedAmount },
  ];
};
