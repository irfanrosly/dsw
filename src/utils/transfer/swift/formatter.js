import moment from 'moment';

import { get } from 'utils/lodash';
import { formatArrayKeys, removeStringComma } from 'utils/formatter';

import { CURRENCY_CHF, DEFAULT_CONVERSION_RATE } from 'settings/constants/common';
import { CONFIRMATION_DETAIL_DATE_FORMAT } from 'settings/constants/transaction';
import { SUCCESS_RESPONSE_CODE, UNRESPONSIVE_HOST } from 'settings/constants/response-codes';

export const formatSwiftAccess = res => {
  const responseCode = get(res, 'responseCode', UNRESPONSIVE_HOST);
  const isSuccess = responseCode === SUCCESS_RESPONSE_CODE;
  const serviceInfoBean = get(res, 'serviceInfoBean', {});
  return { responseCode, isSuccess, serviceInfoBean };
};

export const formatSwiftBank = res => {
  return { responseCode: get(res, 'responseCode', UNRESPONSIVE_HOST), banks: get(res, 'bankList', []), bankMap: get(res, 'bankMap', {}) };
};

export const formatSwiftBankDetail = res => {
  const responseCode = get(res, 'responseCode', UNRESPONSIVE_HOST);
  const currencies = formatArrayKeys(get(res, 'currencyList', []));
  const transactionCharges = formatArrayKeys(get(res, 'trnxChargesList', []));

  return {
    currencies,
    transactionCharges,
    isSuccess: responseCode === SUCCESS_RESPONSE_CODE,
    toForeignBankOID: get(res, 'toForeignBankOID', ''),
    toForeignBankCode: get(res, 'toForeignBankCode', ''),
    toForeignBankName: get(res, 'toForeignBankName', ''),
    toForeignBankCountry: get(res, 'toForeignBankCountry', ''),
    toForeignBankAddress1: get(res, 'toForeignBankAddress1', ''),
    toForeignBankAddress2: get(res, 'toForeignBankAddress2', ''),
    toForeignBankAddress3: get(res, 'toForeignBankAddress3', ''),
    toForeignBankCountryCode: get(res, 'toForeignBankCountryCode', ''),
  };
};

export const formatSwiftLLDBody = detail => ({
  userId: get(detail, 'userId', ''),
  toCurrency: get(detail, 'currency', ''),
  toAmount: removeStringComma(get(detail, 'transferAmount', '')),
});

export const formatSwiftConfirmationBody = body => {
  const currency = get(body, 'currency', '');

  const payload = {
    userId: get(body, 'userId', ''),
    transCharges: get(body, 'transactionCharges', ''),
    fromCurrency: get(body, 'senderAccount.currency', ''),
    fromAccount: get(body, 'senderAccount.accountNumber', ''),

    info1Key: get(body, 'lldIdentityStatus.key', ''), //  beneficiary identical status
    info2Key: get(body, 'lldCitizenship.key', ''), // beneficiary citizenship
    info3Key: get(body, 'lldBeneficiary.key', ''), // beneficiary category
    info4Key: get(body, 'lldRelationship.key', ''), // transactor relationship
    info5Key: get(body, 'lldPurpose.key', ''), //  transaction purpose category
    info6Key: get(body, 'lldDescription.key', ''), //  information description
    transactionDescription: get(body, 'lldMessage', ''), // optional description

    toCurrency: currency,
    message: get(body, 'message', ''),
    toForeignBankOID: get(body, 'beneficiaryBankOID', ''),
    toEmailAddress: get(body, 'beneficiaryEmail', ''),
    toName: get(body, 'beneficiaryName', ''),
    toAccount: get(body, 'accountNumber', ''),
    toAddress1: get(body, 'beneficiaryAddressStreet', ''),
    toAddress2: get(body, 'beneficiaryAddressOther', ''),
    toAddress3: get(body, 'beneficiaryAddressCountry', ''),
    toAmount: removeStringComma(get(body, 'transferAmount', '')),
  };

  const chfPayload = {
    ...payload,
    identityNo: get(body, 'beneficiaryID', ''),
    dateBirth: moment(get(body, 'beneficiaryDateOfBirth', {})).format(CONFIRMATION_DETAIL_DATE_FORMAT),
  };

  return currency === CURRENCY_CHF ? chfPayload : payload;
};

export const formatSwiftResultBody = ({ userId, tacValue, formDetail, detail, resultBody, transactionCharges }) => {
  return {
    userId,
    tacValue,
    toForeignBankCode: get(detail, 'toForeignBankCode', ''),
    toForeignBankName: get(detail, 'toForeignBankName', ''),
    toForeignBankSwiftCode: get(detail, 'toForeignBankSwiftCode', ''),
    toForeignBankAddress1: get(detail, 'toForeignBankAddress1', ''),
    toForeignBankAddress2: get(detail, 'toForeignBankAddress2', ''),
    toForeignBankAddress3: get(detail, 'toForeignBankAddress3', ''),
    toForeignBankAddress4: get(detail, 'toForeignBankAddress4', ''),
    toForeignBankAddress5: get(detail, 'toForeignBankAddress5', ''),
    toName: get(detail, 'toName', ''),
    toAccount: get(detail, 'toAccount', ''),
    toCurrency: get(detail, 'toCurrency', ''),
    toEmailAddress: get(detail, 'toEmailAddress', ''),
    toAddress1: get(detail, 'toAddress1', ''),
    toAddress2: get(detail, 'toAddress2', ''),
    toAddress3: get(detail, 'toAddress3', ''),
    chargeAmount: get(detail, 'chargeAmount', ''),
    debitAmount: get(detail, 'debitAmount', ''),
    debitAmountWoCharge: get(detail, 'debitAmountWoCharge', ''),
    effectiveDate: get(detail, 'effectiveDate', ''),
    fromAccount: get(detail, 'fromAccount', ''),
    fromCurrency: get(detail, 'fromCurrency', ''),
    fromCurrencyRate: get(detail, 'fromCurrencyRate', DEFAULT_CONVERSION_RATE),
    localAmount: get(detail, 'localAmount', ''),
    localAmountWoCharge: get(detail, 'localAmountWoCharge', ''),
    message: get(detail, 'message', ''),
    toAmount: get(detail, 'toAmount', ''),
    toAmountDis: get(detail, 'toAmountDis', ''),
    toCountryISOAlpha2: get(detail, 'toCountryISOAlpha2', ''),
    toCountryDisplay: get(detail, 'toCountryDisplay', ''),
    toCurrencyRate: get(detail, 'toCurrencyRate', DEFAULT_CONVERSION_RATE),
    trxFee1: get(detail, 'trxFee1', ''),
    usdAmount: get(detail, 'usdAmount', ''),
    transCharges: transactionCharges,

    info1Key: get(formDetail, 'lldIdentityStatus.key', ''), //  beneficiary identical status
    info2Key: get(formDetail, 'lldCitizenship.key', ''), // beneficiary citizenship
    info3Key: get(formDetail, 'lldBeneficiary.key', ''), // beneficiary category
    info4Key: get(formDetail, 'lldRelationship.key', ''), // transactor relationship
    info5Key: get(formDetail, 'lldPurpose.key', ''), //  transaction purpose category
    info6Key: get(formDetail, 'lldDescription.key', ''), //  information description
    transactionDescription: get(formDetail, 'lldMessage', ''), // optional description

    identityNo: get(detail, 'identityNo', ''),
    placeBirth: get(detail, 'placeBirth', ''),
    dateBirth: get(detail, 'dateBirth', ''),
    restSMSService: get(resultBody, 'restSMSService', {}),
  };
};
