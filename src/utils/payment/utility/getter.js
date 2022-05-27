import { translate } from 'utils/i18n';
import { isEmpty, toUpper } from 'lodash';

import { get } from 'utils/lodash';
import { getExchangeRatesDisplay, getReferenceNumberDetail } from 'utils/transaction';

import { DEFAULT_UTILITY_PAYEE, UTILITY_PAYEE, UTILITY_PAYEE_MIN_LENGTH, UTILITY_PAYEE_MAX_LENGTH } from 'settings/constants/transaction';

const { PAM_PALYJA, TELKOM, PLN_NON_TAGLIS, PLN_POSTPAID } = UTILITY_PAYEE;

const {
  TELKOM: TELKOM_MIN_LENGTH,
  PAM_PALYJA: PAM_PALYJA_MIN_LENGTH,
  PLN_NON_TAGLIS: PLN_NON_TAGLIS_MIN_LENGTH,
  PLN_POSTPAID: PLN_POSTPAID_MIN_LENGTH,
} = UTILITY_PAYEE_MIN_LENGTH;

const {
  TELKOM: TELKOM_MAX_LENGTH,
  PAM_PALYJA: PAM_PALYJA_MAX_LENGTH,
  PLN_NON_TAGLIS: PLN_NON_TAGLIS_MAX_LENGTH,
  PLN_POSTPAID: PLN_POSTPAID_MAX_LENGTH,
} = UTILITY_PAYEE_MAX_LENGTH;

const getPayeeName = (detail, payeeCode) => {
  const payeeName = toUpper(get(detail, 'payeeName', ''));
  const biller = {
    [PAM_PALYJA]: payeeName,
    [TELKOM]: get(detail, 'nama', ''),
    [PLN_POSTPAID]: get(detail, 'namaDisplay', ''),
    [PLN_NON_TAGLIS]: get(detail, 'namaDisplay', ''),
    default: payeeName,
  };
  return biller[payeeCode] || biller.default;
};

const getCustomerNumberMinLength = payeeCode => {
  const minLength = {
    [TELKOM]: TELKOM_MIN_LENGTH,
    [PAM_PALYJA]: PAM_PALYJA_MIN_LENGTH,
    [PLN_POSTPAID]: PLN_POSTPAID_MIN_LENGTH,
    [PLN_NON_TAGLIS]: PLN_NON_TAGLIS_MIN_LENGTH,
    default: PAM_PALYJA_MIN_LENGTH,
  };
  return minLength[payeeCode] || minLength.default;
};

const getCustomerNumberMaxLength = payeeCode => {
  const maxLength = {
    [TELKOM]: TELKOM_MAX_LENGTH,
    [PAM_PALYJA]: PAM_PALYJA_MAX_LENGTH,
    [PLN_POSTPAID]: PLN_NON_TAGLIS_MAX_LENGTH,
    [PLN_NON_TAGLIS]: PLN_POSTPAID_MAX_LENGTH,
    default: TELKOM_MAX_LENGTH,
  };
  return maxLength[payeeCode] || maxLength.default;
};

export const getUtilityReceiverDetail = (detail, selectedBiller = {}) => {
  const payeeCode = get(selectedBiller, 'payeeCode', DEFAULT_UTILITY_PAYEE);
  return {
    receiverName: getPayeeName(detail, payeeCode),
    receiverAccount: get(detail, 'subscriberNumber', ''),
    transactionType: payeeCode === PAM_PALYJA ? get(detail, 'serviceName', '') : get(detail, 'payeeName', ''),
    transactionAmount: payeeCode === PAM_PALYJA ? get(detail, 'paymentAmount', '') : get(detail, 'toAmountDisp', ''),
  };
};

export const getUtilityBeneficiaries = (detail, referenceNumber) => {
  const billerDetails = get(detail, 'billerDetails', []);
  const referenceNumberDetail = getReferenceNumberDetail(referenceNumber);
  const beneficiaryDetail = billerDetails.reduce((acc, { label, value }) => [...acc, { title: label, info: value }], []);
  return !isEmpty(referenceNumberDetail) ? beneficiaryDetail.concat(referenceNumberDetail) : beneficiaryDetail;
};

export const getUtilityMonetaries = detail => {
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
    { title: translate('transaction.transfer.transactionAmount'), info: get(detail, 'toAmountDisp', '') },
    { title: translate('transaction.transfer.transactionFee'), info: get(detail, 'chargeAmountDisp', '') },
  ];

  return isEmpty(exchangeRates) ? details : details.concat(foreignTrxnDetails, exchangeRateDisplay);
};

export const getUtilityResultPayload = detail => {
  return {
    userId: get(detail, 'userId', ''),
    tacValue: get(detail, 'tacValue', ''),
    nama: get(detail, 'confirmationDetail.nama', ''),
    blTh: get(detail, 'confirmationDetail.blTh', ''),
    regNo: get(detail, 'confirmationDetail.regNo', ''),
    rpTag: get(detail, 'confirmationDetail.rpTag', ''),
    idPel: get(detail, 'confirmationDetail.idPel', ''),
    payeeKey: get(detail, 'selectedBiller.payeeKey', ''),
    fromCurrency: get(detail, 'senderAccount.currencyCode', ''),
    toAmount: get(detail, 'confirmationDetail.toAmount', ''),
    lembarTag: get(detail, 'confirmationDetail.lembarTag', ''),
    fromAmount: get(detail, 'confirmationDetail.fromAmount', ''),
    fromAccountNumber: get(detail, 'senderAccount.accountNumber', ''),
    fromCurrencyCodeIso: get(detail, 'senderAccount.currency', ''),
    additionalData: get(detail, 'confirmationDetail.additionalData', ''),
    chargeAmount: get(detail, 'confirmationDetail.chargeAmount', ''),
    transactionName: get(detail, 'confirmationDetail.transactionName', ''),
    fromCurrencyRate: get(detail, 'confirmationDetail.fromCurrencyRate', ''),
    de004AmountTransaction: get(detail, 'confirmationDetail.de004AmountTransaction', ''),
    billInfoMap: get(detail, 'confirmationDetail.billInfoMap', {}),
    monetaryMap: get(detail, 'confirmationDetail.monetaryMap', {}),
    restSMSService: get(detail, 'tacDetail.tacViewBean.restSMSService', {}),
  };
};

export const getUtilityDynamicFields = detail => {
  const payeeCode = get(detail, 'selectedBiller.payeeCode', DEFAULT_UTILITY_PAYEE);
  const minLength = getCustomerNumberMinLength(payeeCode);
  const maxLength = getCustomerNumberMaxLength(payeeCode);

  return [
    {
      name: 'customerNumber',
      maxLength,
      validationRules: [
        { type: 'required', isValidateRequired: true },
        { type: 'validCustomerNumber', minLength, maxLength, isValidateRequired: true },
      ],
    },
  ];
};
