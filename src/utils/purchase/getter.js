import { get } from 'utils/lodash';
import { getPlnBeneficiaries, getPlnMonetaryDetails, getPlnReceiverDetails } from 'utils/purchase/pln-reload/getter';
import { getTicketBeneficiaries, getTicketMonetaries, getTicketReceiverDetail } from 'utils/purchase/ticket/getter';
import { getPrepaidBeneficiaries, getPrepaidReceiverDetails, getPrepaidMonetaryDetails } from 'utils/purchase/mobile-prepaid/getter';

import { TAC_EXCEED_MAX_TRIES } from 'settings/constants/response-codes';
import { PURCHASE_TICKET, PURCHASE_PREPAID, PURCHASE_PLN_RELOAD } from 'settings/constants/transaction';

export const getPurchaseMonetaries = (type, detail) => {
  const handler = {
    [PURCHASE_TICKET]: () => getTicketMonetaries(detail),
    [PURCHASE_PREPAID]: () => getPrepaidMonetaryDetails(detail),
    [PURCHASE_PLN_RELOAD]: () => getPlnMonetaryDetails(detail),
    default: () => ({}),
  };
  return (handler[type] || handler.default)();
};

export const getTotalDisplayAmount = (type, detail) => {
  const totalAmountHandler = {
    [PURCHASE_TICKET]: get(detail, 'debitAmountDisp', ''),
    [PURCHASE_PREPAID]: get(detail, 'debitAmountDisplay', ''),
    [PURCHASE_PLN_RELOAD]: get(detail, 'debitAmountDisplay', ''),
    default: get(detail, 'equDefaultAmountDisp', ''),
  };
  return <span className="red">{totalAmountHandler[type] || totalAmountHandler.default}</span>;
};

export const getPurchaseBeneficiaries = (type, detail, resultDetail, referenceNumber) => {
  const handler = {
    [PURCHASE_TICKET]: () => getTicketBeneficiaries(detail, referenceNumber),
    [PURCHASE_PREPAID]: () => getPrepaidBeneficiaries(detail, referenceNumber),
    [PURCHASE_PLN_RELOAD]: () => getPlnBeneficiaries(detail, resultDetail, referenceNumber),
    default: () => [],
  };
  return (handler[type] || handler.default)();
};

export const getPurchaseReceiverDetail = (type, detail, selectedBiller) => {
  const handler = {
    [PURCHASE_TICKET]: getTicketReceiverDetail(detail),
    [PURCHASE_PREPAID]: getPrepaidReceiverDetails(detail),
    [PURCHASE_PLN_RELOAD]: getPlnReceiverDetails(detail),
    default: {},
  };
  return handler[type] || handler.default;
};

export const getSenderAccountNumber = (type, detail) => {
  const handler = {
    [PURCHASE_TICKET]: get(detail, 'fromAccountDisp', ''),
    [PURCHASE_PREPAID]: get(detail, 'fromAccountNumber', ''),
    [PURCHASE_PLN_RELOAD]: get(detail, 'fromAccountNumber', ''),
    default: '',
  };
  return handler[type] || handler.default;
};

export const getPurchaseResultDetail = detail => {
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
