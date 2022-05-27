import { put } from 'redux-saga/effects';

import Instance from 'providers/instance';
import { paymentEndpoint as endpoint } from 'providers/endpoints/payment';
import {
  actions,
  putMaybankCardTac,
  putCreditCardTypes,
  putCreditCardAccess,
  putOtherBankCardTac,
  putMaybankCardResult,
  putMaybankCardReceipt,
  putOtherBankCardResult,
  putOtherBankCardReceipt,
  putCreditCardMaybankAccess,
  putMaybankCardConfirmation,
  putCreditCardMaybankHolders,
  putOtherBankCardConfirmation,
} from 'middleware/actions/payment';

const getAccess = ({ body }) => Instance.post(endpoint.creditCard.getAccess, body);
const getMaybankAccess = ({ body }) => Instance.post(endpoint.creditCard.getMaybankAccess, body);
const getMaybankConfirmation = ({ body }) => Instance.post(endpoint.creditCard.getMaybankConfirmation, body);
const getOtherBankConfirmation = ({ body }) => Instance.post(endpoint.creditCard.getOtherBankConfirmation, body);
const requestMaybankTac = ({ body }) => Instance.post(endpoint.creditCard.requestMaybankTac, body);
const requestOtherBankTac = ({ body }) => Instance.post(endpoint.creditCard.requestOtherBankTac, body);
const getMaybankResult = ({ body }) => Instance.post(endpoint.creditCard.getMaybankResult, body);
const getOtherBankResult = ({ body }) => Instance.post(endpoint.creditCard.getOtherBankResult, body);
const getMaybankReceipt = ({ body }) => Instance.post(endpoint.creditCard.getMaybankReceipt, body);
const getOtherBankReceipt = ({ body }) => Instance.post(endpoint.creditCard.getOtherBankReceipt, body);

const {
  ACCESS,
  MAYBANK_ACCESS,
  MAYBANK_RESULT,
  MAYBANK_RECEIPT,
  OTHER_BANK_RESULT,
  OTHER_BANK_RECEIPT,
  REQUEST_MAYBANK_TAC,
  MAYBANK_CONFIRMATION,
  REQUEST_OTHER_BANK_TAC,
  OTHER_BANK_CONFIRMATION,
} = actions.GET.CREDIT_CARD;

export const ccCallAccessHandler = type => {
  const handler = {
    [ACCESS]: () => getAccess,
    [MAYBANK_ACCESS]: () => getMaybankAccess,
    default: () => null,
  };

  return (handler[type] || handler.default)();
};

export const ccPutAccessHandler = ({ type, access, billers }) => {
  const handler = {
    [ACCESS]: () => [put(putCreditCardAccess(access)), put(putCreditCardTypes(billers))],
    [MAYBANK_ACCESS]: () => [put(putCreditCardMaybankAccess(access)), put(putCreditCardMaybankHolders(billers))],
    default: () => null,
  };

  return (handler[type] || handler.default)();
};

export const ccCallConfirmationHandler = type => {
  const handler = {
    [MAYBANK_CONFIRMATION]: () => getMaybankConfirmation,
    [OTHER_BANK_CONFIRMATION]: () => getOtherBankConfirmation,
    default: () => console.error('call confirmation handler not found'),
  };
  return (handler[type] || handler.default)();
};

export const ccPutConfirmationHandler = (type, data) => {
  const handler = {
    [MAYBANK_CONFIRMATION]: () => putMaybankCardConfirmation(data),
    [OTHER_BANK_CONFIRMATION]: () => putOtherBankCardConfirmation(data),
    default: () => console.error('put confirmation handler not found'),
  };

  return (handler[type] || handler.default)();
};

export const ccCallTacHandler = type => {
  const handler = {
    [REQUEST_MAYBANK_TAC]: () => requestMaybankTac,
    [REQUEST_OTHER_BANK_TAC]: () => requestOtherBankTac,
    default: () => console.error('call TAC handler not found'),
  };
  return (handler[type] || handler.default)();
};

export const ccPutTacHandler = (type, data) => {
  const handler = {
    [REQUEST_MAYBANK_TAC]: () => putMaybankCardTac(data),
    [REQUEST_OTHER_BANK_TAC]: () => putOtherBankCardTac(data),
    default: () => console.error('put confirmation handler not found'),
  };

  return (handler[type] || handler.default)();
};

export const ccCallResultHandler = type => {
  const handler = {
    [MAYBANK_RESULT]: () => getMaybankResult,
    [OTHER_BANK_RESULT]: () => getOtherBankResult,
    default: () => console.error('call Resul handler not found'),
  };
  return (handler[type] || handler.default)();
};

export const ccPutResultHandler = (type, data) => {
  const handler = {
    [MAYBANK_RESULT]: () => putMaybankCardResult(data),
    [OTHER_BANK_RESULT]: () => putOtherBankCardResult(data),
    default: () => console.error('put Resul handler not found'),
  };

  return (handler[type] || handler.default)();
};

export const ccCallReceiptHandler = type => {
  const handler = {
    [MAYBANK_RECEIPT]: () => getMaybankReceipt,
    [OTHER_BANK_RECEIPT]: () => getOtherBankReceipt,
    default: () => console.error('call Receipt handler not found'),
  };
  return (handler[type] || handler.default)();
};

export const ccPutReceiptHandler = (type, data) => {
  const handler = {
    [MAYBANK_RECEIPT]: () => putMaybankCardReceipt(data),
    [OTHER_BANK_RECEIPT]: () => putOtherBankCardReceipt(data),
    default: () => console.error('put Receipt handler not found'),
  };
  return (handler[type] || handler.default)();
};
