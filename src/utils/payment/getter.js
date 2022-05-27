import { get } from 'utils/lodash';
import { formatMobileNumber } from 'utils/formatter';
import { getReferenceNumberDetail } from 'utils/transaction';
import { getOtherBillBeneficiaries, getOtherBillMonetaryDetails, getOtherBillReceiverDetails } from 'utils/payment/other-bill/getter';
import { getCcMonetaryDetails, getCcReceiverDetail, getCcPaymentOptionDetail } from 'utils/payment/credit-card/getter';
import { getMobileReceiverDetails, getMobileMonetaryDetails } from 'utils/payment/mobile-postpaid/getter';
import { getUtilityBeneficiaries, getUtilityMonetaries, getUtilityReceiverDetail } from 'utils/payment/utility/getter';

import { CURRENCY_IDR } from 'settings/constants/common';
import { TAC_EXCEED_MAX_TRIES } from 'settings/constants/response-codes';
import { PAYMENT_UTILITY, MOBILE_POSTPAID, PAYMENT_CREDIT_CARD, PAYMENT_OTHER_BILL } from 'settings/constants/transaction';

// Dynamic confirmation getter for utility and mobile postpaid
export const getConfirmationPayload = ({ senderAccount, formDetail, userId, paymentType }) => {
  const mobileNumber = get(formDetail, 'mobileNumber', '');
  const subscriberNumber = get(formDetail, 'customerNumber', '');
  const paymentNumber = paymentType === PAYMENT_UTILITY ? { subscriberNumber } : { mobileNumber: formatMobileNumber(mobileNumber) };

  return {
    ...paymentNumber,
    userId,
    fromCurrency: get(senderAccount, 'currencyCode', ''),
    payeeKey: get(formDetail, 'selectedBiller.payeeKey', ''),
    fromAccountNumber: get(senderAccount, 'accountNumber', ''),
    fromCurrencyCodeIso: get(senderAccount, 'currency', CURRENCY_IDR),
  };
};

export const getTotalDisplayAmount = ({ confirmationDetail, paymentType }) => {
  const totalAmountHandler = {
    [PAYMENT_UTILITY]: get(confirmationDetail, 'debitAmountDisp', ''),
    [MOBILE_POSTPAID]: get(confirmationDetail, 'debitAmountDisp', ''),
    [PAYMENT_CREDIT_CARD]: get(confirmationDetail, 'debitAmountDisp', ''),
    [PAYMENT_OTHER_BILL]: get(confirmationDetail, 'debitAmountDisp', ''),
    default: get(confirmationDetail, 'debitAmountDisp', ''),
  };
  return <span className="red">{totalAmountHandler[paymentType] || totalAmountHandler.default}</span>;
};

export const getReceiverDetail = (detail, paymentType, selectedBiller = {}) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: getCcReceiverDetail(detail),
    [PAYMENT_UTILITY]: getUtilityReceiverDetail(detail, selectedBiller),
    [MOBILE_POSTPAID]: getMobileReceiverDetails(detail),
    [PAYMENT_OTHER_BILL]: getOtherBillReceiverDetails(detail),
    default: {},
  };

  return handler[paymentType] || handler.default;
};

export const getMonetaryDetail = (detail, paymentType) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: () => getCcMonetaryDetails(detail),
    [PAYMENT_UTILITY]: () => getUtilityMonetaries(detail),
    [MOBILE_POSTPAID]: () => getMobileMonetaryDetails(detail),
    [PAYMENT_OTHER_BILL]: () => getOtherBillMonetaryDetails(detail),
    default: () => ({}),
  };

  return (handler[paymentType] || handler.default)();
};

export const getPaymentBeneficiary = (detail, paymentType, paymentOption, referenceNumber, creditCardType, otherBillDetail) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: () => getCcPaymentOptionDetail(paymentOption, referenceNumber, creditCardType),
    [PAYMENT_UTILITY]: () => getUtilityBeneficiaries(detail, referenceNumber),
    [MOBILE_POSTPAID]: () => getReferenceNumberDetail(referenceNumber),
    [PAYMENT_OTHER_BILL]: () => getOtherBillBeneficiaries(detail, referenceNumber, otherBillDetail),
    default: () => [],
  };
  return (handler[paymentType] || handler.default)();
};

export const getResultDetail = detail => {
  const resultError = get(detail, 'errorCode', '');

  return {
    resultError,
    isTacLocked: resultError === TAC_EXCEED_MAX_TRIES,
    statusCode: get(detail, 'statusCode', ''),
    statusMessage: get(detail, 'statusMessage', ''),
    transactionID: get(detail, 'transactionID', ''),
    isResultSuccess: get(detail, 'isSuccess', false),
    transactionStatus: get(detail, 'transactionStatus', ''),
    isTransactionSuccess: get(detail, 'transactionSuccessful', false),
    isTransactionSuccessful: get(detail, 'transactionSuccessful', false),
    referenceNumber: get(detail, 'transactionReferenceNumber', ''),
  };
};
