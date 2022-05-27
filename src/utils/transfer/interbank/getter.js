import { FormattedMessage } from 'react-intl';

import { get } from 'utils/lodash';
import { removeStringComma } from 'utils/formatter';

import { CURRENCY_IDR, DEFAULT_INT_ZERO } from 'settings/constants/common';
import { DEFAULT_MAX_TRANSFER_AMOUNT, DEFAULT_MIN_TRANSFER_AMOUNT } from 'settings/constants/transaction';

export const getInterbankConfirmationBody = data => {
  return {
    bankCode: get(data, 'bankCode', ''),
    userId: get(data, 'userId', ''),
    allBank: get(data, 'allBank', {}),
    senderAccountNumber: get(data, 'senderAccount.accountNumber', ''),
    senderCurrency: get(data, 'senderAccount.currencyCodeIso', CURRENCY_IDR),
    receiverEmail: get(data, 'beneficiaryEmail', ''),
    receiveAmount: removeStringComma(get(data, 'transferAmount', '')),
    receiveMessage: get(data, 'message', ''),
    receiverAccountNumber: get(data, 'accountNumber', ''),
  };
};

export const getInterbankReceiverInfos = ({ confirmationDetail, referenceNumber, isTransactionSuccess }) => {
  const message = get(confirmationDetail, 'beneReferenceNo', '-');
  const bank = get(confirmationDetail, 'bankName', '');
  const effectiveDate = get(confirmationDetail, 'effectiveDateDisplay', '');
  const email = get(confirmationDetail, 'toAccountEmailAddress', '-');

  const defaultInfos = [
    { title: <FormattedMessage id="transaction.transfer.interbank.beneficiaryBank" />, info: bank },
    { title: <FormattedMessage id="transaction.transfer.effectiveDate" />, info: effectiveDate },
    { title: <FormattedMessage id="transaction.transfer.message" />, info: message },
    { title: <FormattedMessage id="transaction.transfer.interbank.beneficiaryEmail" />, info: email },
  ];

  const successfulInfos = defaultInfos.concat({
    title: <FormattedMessage id="transaction.transfer.referenceNumber" />,
    info: referenceNumber,
  });

  return isTransactionSuccess ? successfulInfos : defaultInfos;
};

export const getInterbankMonetaries = detail => {
  const debitedAmount = get(detail, 'toAmountDis', '');
  const transactionFee = get(detail, 'chargesDis', '');
  const transactionAmount = get(detail, 'fromAmountDis', '');
  const localDebitedAmount = get(detail, 'localAmountDis', '');

  return [
    { title: <FormattedMessage id="transaction.transfer.transactionAmount" />, info: transactionAmount },
    { title: <FormattedMessage id="transaction.transfer.transactionFee" />, info: transactionFee },
    { title: <FormattedMessage id="transaction.transfer.totalDebit" />, info: debitedAmount },
    { title: <FormattedMessage id="transaction.transfer.localDebitedAmount" />, info: localDebitedAmount },
  ];
};

export const getInterbankDynamicFields = detail => {
  const currency = get(detail, 'senderAccount.currency', CURRENCY_IDR);
  const minAmount = get(detail, 'serviceInfoBean.minLimit', DEFAULT_INT_ZERO);
  const maxAmount = get(detail, 'serviceInfoBean.maxLimit', DEFAULT_INT_ZERO);
  const currentBalance = get(detail, 'senderAccount.plainBalance', DEFAULT_INT_ZERO);

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
        { type: 'minAmount', value: minAmount > DEFAULT_INT_ZERO ? minAmount : DEFAULT_MIN_TRANSFER_AMOUNT, isValidateRequired: true },
        {
          type: 'maxAmount',
          value: maxAmount > DEFAULT_MIN_TRANSFER_AMOUNT ? maxAmount : DEFAULT_MAX_TRANSFER_AMOUNT,
          isValidateRequired: true,
        },
      ],
    },
  ];
};
