import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { get } from 'utils/lodash';
import { formatPrepaidMobileNumber } from 'utils/purchase/mobile-prepaid/formatter';
import { getExchangeRatesDisplay, getReferenceNumberDetail } from 'utils/transaction';
import { DEFAULT_CURRENCY_EXCHANGE_RATE } from 'settings/constants/transaction';

export const getPrepaidConfirmationPayload = ({ userId, formDetail, senderAccount, billerDetail, selectedBiller }) => {
  const prefix = get(formDetail, 'mobilePrefix', '');
  const mobileNumber = get(formDetail, 'mobileNumber', '');
  const prefixType = get(billerDetail, 'billAccountValueType', '');
  const fullMobileNumber = formatPrepaidMobileNumber(mobileNumber, prefix, prefixType);

  return {
    userId,
    ...fullMobileNumber,
    fromCurrency: get(senderAccount, 'currencyCode', ''),
    fromAccountNumber: get(senderAccount, 'accountNumber', ''),
    fromCurrencyCodeIso: get(senderAccount, 'currency', ''),
    payeeCode: get(billerDetail, 'payeeCode', ''),
    biller: get(billerDetail, 'biller', ''),
    amountType: get(billerDetail, 'amountType', ''),
    currencyCodeIso: get(billerDetail, 'currencyCodeIso', ''),
    amount: get(formDetail, 'purchaseAmount', ''),
    fixAmount: get(billerDetail, 'fixAmount', ''),
    institutionKey: get(selectedBiller, 'key', ''),
  };
};

export const getPrepaidBeneficiaries = (detail, referenceNumber = '') => {
  const billers = get(detail, 'billerDetails', []);
  const referenceNumberDetail = getReferenceNumberDetail(referenceNumber);
  const beneficiaries = billers.reduce((acc, { label, value }) => [...acc, { title: label, info: value }], []);
  return isEmpty(referenceNumberDetail) ? beneficiaries : beneficiaries.concat(referenceNumberDetail);
};

export const getPrepaidReceiverDetails = detail => {
  return {
    transactionAmount: get(detail, 'toAmountDisplay', ''),
    receiverName: get(detail, 'institution', ''),
    receiverAccount: get(detail, 'mobileNumber', ''),
    transactionType: get(detail, 'serviceName', ''),
  };
};

export const getPrepaidMonetaryDetails = detail => {
  const exchangeRates = get(detail, 'exchangeRate', []);
  const exchangeRateDisplay = getExchangeRatesDisplay(exchangeRates, 'transaction.payment.foreignExchange');
  const foreignTrxnDetails = [
    {
      title: <FormattedMessage id="transaction.transfer.totalDebit" />,
      info: get(detail, 'debitAmountDisplay', ''),
    },
    {
      title: <FormattedMessage id="transaction.transfer.localDebitedAmount" />,
      info: get(detail, 'equDefaultAmountDisplay', ''),
    },
  ];

  const details = [
    { title: <FormattedMessage id="transaction.transfer.transactionAmount" />, info: get(detail, 'toAmountDisplay', '') },
    { title: <FormattedMessage id="transaction.transfer.transactionFee" />, info: get(detail, 'adminFeeDisplay', '') },
  ];

  return !isEmpty(exchangeRates) ? details.concat(foreignTrxnDetails, exchangeRateDisplay) : details;
};

export const getPrepaidResultPayload = data => ({
  userId: get(data, 'userId', ''),
  tacValue: get(data, 'tacValue', ''),
  restSMSService: get(data, 'tacDetail.tacViewBean.restSMSService', {}),
  fromAccountNumber: get(data, 'senderAccount.accountNumber', ''),
  fromCurrency: get(data, 'senderAccount.currencyCode', ''),
  fromCurrencyCodeIso: get(data, 'senderAccount.currency', ''),
  mobileNumber: get(data, 'confirmationDetail.mobileNumber', ''),
  productCode: get(data, 'confirmationDetail.productCode', ''),
  voucherAmount: get(data, 'confirmationDetail.voucherAmount', ''),
  adminFee: get(data, 'confirmationDetail.adminFee', ''),
  adminFeeDisplay: get(data, 'confirmationDetail.adminFeeDisplay', ''),
  fromCurrencyRate: get(data, 'confirmationDetail.fromCurrencyRate', ''),
  toCurrencyRate: get(data, 'confirmationDetail.toCurrencyRate', DEFAULT_CURRENCY_EXCHANGE_RATE),
  institutionKey: get(data, 'selectedBiller.key', ''),
});
