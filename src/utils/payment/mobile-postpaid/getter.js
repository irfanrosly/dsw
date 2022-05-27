import isEmpty from 'lodash/isEmpty';
import { FormattedMessage } from 'react-intl';

import { get } from 'utils/lodash';
import { getExchangeRatesDisplay } from 'utils/transaction';

import { CURRENCY_IDR } from 'settings/constants/common';

export const getMobileConfirmPayload = (form, userId, senderAccount) => {
  return {
    userId,
    payeeKey: get(form, 'selectedBiller.payeeKey', ''),
    fromCurrency: get(senderAccount, 'currencyCode', ''),
    mobileNumber: get(form, 'mobileNumber', ''),
    fromAccountNumber: get(senderAccount, 'accountNumber', ''),
    fromCurrencyCodeIso: get(senderAccount, 'currency', CURRENCY_IDR),
  };
};

export const getMobileReceiverDetails = detail => ({
  transactionAmount: get(detail, 'toAmountDisp', ''),
  receiverName: get(detail, 'customerName', ''),
  receiverAccount: get(detail, 'mobileNumber', ''),
  transactionType: get(detail, 'serviceName', ''),
});

export const getMobileMonetaryDetails = detail => {
  const exchangeRates = get(detail, 'exchangeRate', []);
  const exchangeRateDisplay = getExchangeRatesDisplay(exchangeRates, 'transaction.payment.foreignExchange');
  const foreignTrxnDetails = [
    {
      title: <FormattedMessage id="transaction.transfer.totalDebit" />,
      info: get(detail, 'debitAmountDisp', ''),
    },
    {
      title: <FormattedMessage id="transaction.transfer.localDebitedAmount" />,
      info: get(detail, 'equDefaultAmountDisp', ''),
    },
  ];

  const details = [
    { title: <FormattedMessage id="transaction.transfer.transactionAmount" />, info: get(detail, 'toAmountDisp', '') },
    { title: <FormattedMessage id="transaction.transfer.transactionFee" />, info: get(detail, 'chargeAmountDisp', '') },
  ];

  return !isEmpty(exchangeRates) ? details.concat(foreignTrxnDetails, exchangeRateDisplay) : details;
};

export const getMobileResultPayload = detail => {
  return {
    userId: get(detail, 'userId', ''),
    tacValue: get(detail, 'tacValue', ''),
    payeeKey: get(detail, 'selectedBiller.payeeKey', ''),
    fromCurrency: get(detail, 'senderAccount.currencyCode', CURRENCY_IDR),
    toAmount: get(detail, 'confirmationDetail.toAmount', ''),
    fromAmount: get(detail, 'confirmationDetail.fromAmount', ''),
    fromAccountNumber: get(detail, 'senderAccount.accountNumber', ''),
    fromCurrencyCodeIso: get(detail, 'senderAccount.currency', ''),
    additionalData: get(detail, 'confirmationDetail.additionalData', ''),
    fromCurrencyRate: get(detail, 'confirmationDetail.fromCurrencyRate', ''),
    restSMSService: get(detail, 'tacDetail.tacViewBean.restSMSService', {}),
    billInfoMap: get(detail, 'confirmationDetail.billInfoMap', {}),
    monetaryMap: get(detail, 'confirmationDetail.monetaryMap', {}),
  };
};
