import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { get } from 'utils/lodash';
import { getExchangeRatesDisplay, getReferenceNumberDetail } from 'utils/transaction';

import { DEFAULT_CURRENCY_EXCHANGE_RATE } from 'settings/constants/transaction';

export const getPlnReloadConfirmationPayload = ({ senderAccount, formDetail, userId, billerDetail }) => {
  return {
    userId,
    fromAccountNumber: get(senderAccount, 'accountNumber', ''),
    fromCurrency: get(senderAccount, 'currencyCode', ''),
    fromCurrencyCodeIso: get(senderAccount, 'currency', ''),
    customerNumber: get(formDetail, 'customerNumber', ''),
    payeeCode: get(billerDetail, 'payeeCode', ''),
    biller: get(billerDetail, 'biller', ''),
    amountType: get(billerDetail, 'amountType', ''),
    currencyCodeIso: get(billerDetail, 'currencyCodeIso', ''),
    amount: get(formDetail, 'purchaseAmount', ''),
    fixAmount: get(billerDetail, 'fixAmount', null),
    institutionKey: get(formDetail, 'selectedBiller.key', ''),
  };
};

export const getPlnMonetaryDetails = detail => {
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

export const getPlnBeneficiaries = (detail, resultDetail, referenceNumber = '') => {
  const resultBillers = get(resultDetail, 'billerDetails', []);
  const detailBillers = get(detail, 'billerDetails', []);

  const billers = !isEmpty(resultDetail) ? resultBillers : detailBillers;

  const referenceNumberDetail = getReferenceNumberDetail(referenceNumber);
  // if doesnt have value dont display the label. used for ("Token No")
  const beneficiaries = billers.reduce((acc, { label, value }) => (!value ? acc : [...acc, { title: label, info: value }]), []);
  return isEmpty(referenceNumberDetail) ? beneficiaries : beneficiaries.concat(referenceNumberDetail);
};

export const getPlnReceiverDetails = detail => ({
  transactionAmount: get(detail, 'toAmountDisplay', ''),
  receiverName: get(detail, 'namaDisplay', ''),
  receiverAccount: get(detail, 'customerNumber', ''),
  transactionType: get(detail, 'institution', ''),
});

export const getPlnResultPayload = data => ({
  userId: get(data, 'userId', ''),
  tacValue: get(data, 'tacValue', ''),
  restSMSService: get(data, 'tacDetail.tacViewBean.restSMSService', {}),
  fromAccountNumber: get(data, 'senderAccount.accountNumber', ''),
  fromCurrency: get(data, 'senderAccount.currencyCode', ''),
  fromCurrencyCodeIso: get(data, 'senderAccount.currency', ''),
  adminFee: get(data, 'confirmationDetail.adminFee', ''),
  adminFeeDisplay: get(data, 'confirmationDetail.adminFeeDisplay', ''),
  fromCurrencyRate: get(data, 'confirmationDetail.fromCurrencyRate', ''),
  toCurrencyRate: get(data, 'confirmationDetail.toCurrencyRate', DEFAULT_CURRENCY_EXCHANGE_RATE),
  institutionKey: get(data, 'selectedBiller.key', ''),
  customerNumber: get(data, 'confirmationDetail.customerNumber', ''),
  productCode: get(data, 'confirmationDetail.productCode', null),
  additionalData: get(data, 'confirmationDetail.additionalData', ''),
  nomorMeter: get(data, 'confirmationDetail.nomorMeter', ''),
  nama: get(data, 'confirmationDetail.nama', ''),
  namaDisplay: get(data, 'confirmationDetail.namaDisplay', ''),
  tarif: get(data, 'confirmationDetail.tarif', ''),
  unsold1Label: get(data, 'confirmationDetail.unsold1Label', ''),
  unsold1Value: get(data, 'confirmationDetail.unsold1Value', ''),
  unsold2Label: get(data, 'confirmationDetail.unsold2Label', ''),
  unsold2Value: get(data, 'confirmationDetail.unsold2Value', ''),
  de011SystemTraceAuditNumber: get(data, 'confirmationDetail.de011SystemTraceAuditNumber', ''),
  de012LocalTimeTransaction: get(data, 'confirmationDetail.de012LocalTimeTransaction', ''),
  de037RetrievalReferenceNumber: get(data, 'confirmationDetail.de037RetrievalReferenceNumber', ''),
});
