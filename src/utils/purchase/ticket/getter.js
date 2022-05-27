import { isEmpty } from 'lodash';
import { translate } from 'utils/i18n';

import { get } from 'utils/lodash';
import { getExchangeRatesDisplay, getReferenceNumberDetail } from 'utils/transaction';
import { DEFAULT_CURRENCY_EXCHANGE_RATE } from 'settings/constants/transaction';

export const getTicketConfirmationPayload = ({ senderAccount, formDetail, userId }) => ({
  userId,
  paymentCode: get(formDetail, 'paymentCode', ''),
  fromCurrency: get(senderAccount, 'currencyCode', ''),
  fromCurrencyCodeIso: get(senderAccount, 'currency', ''),
  institutionKey: get(formDetail, 'selectedBiller.key', ''),
  fromAccountNumber: get(senderAccount, 'accountNumber', ''),
});

export const getTicketMonetaries = detail => {
  const exchangeRates = get(detail, 'exchangeRate', []);
  const exchangeRateDisplay = getExchangeRatesDisplay(exchangeRates, 'transaction.payment.foreignExchange');
  const foreignTrxnDetails = [
    {
      title: translate('transaction.transfer.totalDebit'),
      info: get(detail, 'debitAmountDisp', ''),
    },
    {
      title: translate('transaction.transfer.localDebitedAmount'),
      info: get(detail, 'equDefaultAmountDisp', ''),
    },
  ];

  const details = [
    { title: translate('transaction.transfer.transactionAmount'), info: get(detail, 'totalPaymentDisp', '') },
    { title: translate('transaction.transfer.transactionFee'), info: get(detail, 'adminFeeDisp', '') },
  ];

  return isEmpty(exchangeRates) ? details : details.concat(foreignTrxnDetails, exchangeRateDisplay);
};

export const getTicketBeneficiaries = (detail, referenceNumber = '') => {
  const billers = get(detail, 'billerDetails', []);
  const referenceNumberDetail = getReferenceNumberDetail(referenceNumber);
  const beneficiaries = billers.reduce((acc, { label, value }) => [...acc, { title: label, info: value }], []);
  return isEmpty(referenceNumberDetail) ? beneficiaries : beneficiaries.concat(referenceNumberDetail);
};

export const getTicketReceiverDetail = detail => ({
  receiverName: get(detail, 'name', ''),
  receiverAccount: get(detail, 'paymentCode', ''),
  transactionType: get(detail, 'productNameDisp', ''),
  transactionAmount: get(detail, 'totalPaymentDisp', ''),
});

export const getTicketResultPayload = detail => ({
  userId: get(detail, 'userId', ''),
  tacValue: get(detail, 'tacValue', ''),
  institutionKey: get(detail, 'selectedBiller.key', ''),
  name: get(detail, 'confirmationDetail.name', ''),
  route: get(detail, 'confirmationDetail.route', ''),
  quota: get(detail, 'confirmationDetail.quota', ''),
  adminFee: get(detail, 'confirmationDetail.adminFee', ''),
  fromCurrency: get(detail, 'senderAccount.currencyCode', ''),
  fromAmount: get(detail, 'confirmationDetail.fromAmount', ''),
  ticketType: get(detail, 'confirmationDetail.ticketType', ''),
  fromCurrencyCodeIso: get(detail, 'senderAccount.currency', ''),
  paymentCode: get(detail, 'confirmationDetail.paymentCode', ''),
  totalPayment: get(detail, 'confirmationDetail.totalPayment', ''),
  adminFeeDisp: get(detail, 'confirmationDetail.adminFeeDisp', ''),
  fromAccountNumber: get(detail, 'senderAccount.accountNumber', ''),
  productNameDisp: get(detail, 'confirmationDetail.productNameDisp', ''),
  restSMSService: get(detail, 'tacDetail.tacViewBean.restSMSService', {}),
  totalPaymentDisp: get(detail, 'confirmationDetail.totalPaymentDisp', ''),
  fromCurrencyRate: get(detail, 'confirmationDetail.fromCurrencyRate', ''),
  de048AdditionalData: get(detail, 'confirmationDetail.de048AdditionalData', ''),
  de004AmountTransaction: get(detail, 'confirmationDetail.de004AmountTransaction', ''),
  toCurrencyRate: get(detail, 'confirmationDetail.toCurrencyRate', DEFAULT_CURRENCY_EXCHANGE_RATE),
});
