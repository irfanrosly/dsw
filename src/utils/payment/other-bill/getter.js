import isEmpty from 'lodash/isEmpty';

import { FormattedMessage } from 'react-intl';

import { get } from 'utils/lodash';
import { getExchangeRatesDisplay, getReferenceNumberDetail } from 'utils/transaction';

import { DEFAULT_MESSAGE_VALUE } from 'settings/constants/common';
import { DISPLAY_RECEIVER_ACCOUNT } from 'settings/constants/dynamic-field';

export const getOtherBillConfirmationPayload = ({ senderAccount, formDetail, userId, otherBillDetail }) => {
  const currencyCode = get(otherBillDetail, 'currencyISOCode', '');

  return {
    userId,
    category: get(formDetail, 'selectedBiller.category', ''),
    toPayee: get(formDetail, 'selectedPayee.key', ''),
    fromAccountNumber: get(senderAccount, 'accountNumber', ''),
    fromCurrency: get(senderAccount, 'currencyCode', ''),
    fromCurrencyCodeIso: get(senderAccount, 'currency', ''),
    productCode: get(senderAccount, 'productCode', ''),
    billAccNumber: get(formDetail, 'customerNumber', ''),
    referenceNumber: get(formDetail, 'referenceNumber', ''),
    referenceNumber1: '',
    referenceNumber2: '',
    currencyISOCode: currencyCode,
    toCurrency: get(formDetail, 'currency', '') || currencyCode,
    toAmount: get(formDetail, 'paymentAmount', ''),
    message: get(formDetail, 'message', DEFAULT_MESSAGE_VALUE),
  };
};

export const getOtherBillMonetaryDetails = detail => {
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

export const getOtherBillBeneficiaries = (detail, referenceNumber, otherBillDetail) => {
  const referenceNumberDetail = getReferenceNumberDetail(referenceNumber);
  const isVirtualAccount = get(otherBillDetail, 'isVirtualAccount', false);
  const message = get(detail, 'message', DEFAULT_MESSAGE_VALUE);

  if (isVirtualAccount) return referenceNumberDetail;

  const beneficiaryDetails = [{ title: <FormattedMessage id="transaction.payment.otherBill.beneficiaryMessage" />, info: message }];
  return !isEmpty(referenceNumberDetail) ? beneficiaryDetails.concat(referenceNumberDetail) : beneficiaryDetails;
};

export const getOtherBillReceiverDetails = detail => {
  const payeeName = get(detail, 'payee.fullName', '');
  const toAccountHolderName = get(detail, 'toAccountHolderName', '');

  const hasReceiverAccount = get(detail, 'payee.billAcctReq', '0') === DISPLAY_RECEIVER_ACCOUNT; // 0 have receiver account, 1 doesn't have receiver account

  return {
    receiverName: `${payeeName} ${toAccountHolderName}`,
    receiverAccount: hasReceiverAccount ? get(detail, 'billAccNumber', '') : '',
    transactionType: get(detail, 'serviceName', ''),
    transactionAmount: get(detail, 'toAmountDisp', ''),
  };
};

export const getOtherBillResultPayload = detail => ({
  userId: get(detail, 'userId', ''),
  tacValue: get(detail, 'tacValue', ''),
  fromCurrencyRate: get(detail, 'confirmationDetail.fromCurrencyRate', ''),
  toCurrencyRate: get(detail, 'confirmationDetail.toCurrencyRate', ''),
  category: get(detail, 'selectedBiller.category', ''),
  toPayee: get(detail, 'selectedPayee.key', ''),
  fromAccountNumber: get(detail, 'senderAccount.accountNumber', ''),
  fromCurrencyCodeIso: get(detail, 'senderAccount.currency', ''),
  toCurrency: get(detail, 'confirmationDetail.toCurrency', ''),
  billAccNumber: get(detail, 'confirmationDetail.billAccNumber', ''),
  referenceNumber: get(detail, 'confirmationDetail.referenceNumber', ''),
  referenceNumber1: get(detail, 'confirmationDetail.referenceNumber1', ''),
  referenceNumber2: get(detail, 'confirmationDetail.referenceNumber2', ''),
  message: get(detail, 'confirmationDetail.message', ''),
  additionalData: get(detail, 'confirmationDetail.additionalData', ''),
  amountCurrency: get(detail, 'confirmationDetail.amountCurrency', ''),
  toAmount: get(detail, 'confirmationDetail.toAmount', ''),
  chargeAmount: get(detail, 'confirmationDetail.chargeAmount', ''),
  debitAmount: get(detail, 'confirmationDetail.debitAmount', ''),
  equDefaultAmount: get(detail, 'confirmationDetail.equDefaultAmount', ''),
  subscriberName: get(detail, 'confirmationDetail.subscriberName', ''),
  payeeAccNumber: get(detail, 'confirmationDetail.payeeAccNumber', ''),
  restSMSService: get(detail, 'tacDetail.tacViewBean.restSMSService', {}),
});
