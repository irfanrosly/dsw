import {
  putTicketTAC,
  getTicketResult,
  putPlnReloadTac,
  requestTicketTAC,
  getTicketReceipt,
  getPlnReloadDetail,
  getPlnReloadResult,
  requestPlnReloadTac,
  getPlnReloadReceipt,
  getTicketConfirmation,
  getMobilePrepaidDetail,
  getMobilePrepaidResult,
  getMobilePrepaidReceipt,
  getPlnReloadConfirmation,
  putMobilePrepaidRequestTac,
  getMobilePrepaidRequestTac,
  getMobilePrepaidConfirmation,
} from 'middleware/actions/purchase';
import { get } from 'utils/lodash';
import { store } from 'providers/store';
import { getDynamicFields } from 'utils/dynamic-field';
import { getPlnReloadConfirmationPayload, getPlnResultPayload } from 'utils/purchase/pln-reload/getter';
import { getTicketConfirmationPayload, getTicketResultPayload } from 'utils/purchase/ticket/getter';
import { getPrepaidConfirmationPayload, getPrepaidResultPayload } from 'utils/purchase/mobile-prepaid/getter';

import { PURCHASE_PLN_RELOAD, PURCHASE_PREPAID, PURCHASE_TICKET } from 'settings/constants/transaction';
import { MOBILE_PREPAID_FIELDS, PLN_RELOAD_FORM_FIELDS, TICKET_FORM_FIELDS } from 'settings/constants/purchase/form';

const confirmationPayloadHandler = (purchaseType, data) => {
  const handler = {
    [PURCHASE_TICKET]: () => getTicketConfirmationPayload(data),
    [PURCHASE_PREPAID]: () => getPrepaidConfirmationPayload(data),
    [PURCHASE_PLN_RELOAD]: () => getPlnReloadConfirmationPayload(data),
    default: () => {},
  };
  return (handler[purchaseType] || handler.default)();
};

export const detailHandler = (type, { prepaidDetail, plnReloadDetail }) => {
  const handler = {
    [PURCHASE_PREPAID]: prepaidDetail,
    [PURCHASE_PLN_RELOAD]: plnReloadDetail,
    default: {},
  };
  return handler[type] || handler.default;
};

export const detailDispatchHandler = ({ purchaseType, userId, selectedBiller }) => {
  const institutionKey = get(selectedBiller, 'key', '');

  const handler = {
    [PURCHASE_PREPAID]: () => store.dispatch(getMobilePrepaidDetail({ userId, institutionKey })),
    [PURCHASE_PLN_RELOAD]: () => store.dispatch(getPlnReloadDetail({ userId, institutionKey })),
    default: () => null,
  };

  return (handler[purchaseType] || handler.default)();
};

export const formFieldHandler = type => {
  const handler = {
    [PURCHASE_TICKET]: () => TICKET_FORM_FIELDS,
    [PURCHASE_PREPAID]: () => MOBILE_PREPAID_FIELDS,
    [PURCHASE_PLN_RELOAD]: () => PLN_RELOAD_FORM_FIELDS,
    default: () => [],
  };

  return (handler[type] || handler.default)();
};

export const dynamicFieldHandler = (type, billerDetail) => {
  const handler = {
    [PURCHASE_PREPAID]: () => getDynamicFields({ purchaseMobileDetail: billerDetail }),
    [PURCHASE_PLN_RELOAD]: () => getDynamicFields({ purchaseMobileDetail: billerDetail }),
    default: () => [],
  };

  return (handler[type] || handler.default)();
};

export const formSubmitHandler = ({ senderAccount, purchaseType, formDetail, userId, billerDetail, selectedBiller }) => {
  const payload = confirmationPayloadHandler(purchaseType, { senderAccount, formDetail, userId, billerDetail, selectedBiller });

  const handler = {
    [PURCHASE_TICKET]: () => store.dispatch(getTicketConfirmation(payload)),
    [PURCHASE_PREPAID]: () => store.dispatch(getMobilePrepaidConfirmation(payload)),
    [PURCHASE_PLN_RELOAD]: () => store.dispatch(getPlnReloadConfirmation(payload)),
    default: () => alert('No such request found!'),
  };

  return (handler[purchaseType] || handler.default)();
};

export const confirmationHandler = (type, { ticketConfirmation, prepaidConfirmation, plnReloadConfirmation }) => {
  const handler = {
    [PURCHASE_TICKET]: ticketConfirmation,
    [PURCHASE_PREPAID]: prepaidConfirmation,
    [PURCHASE_PLN_RELOAD]: plnReloadConfirmation,
    default: {},
  };

  return handler[type] || handler.default;
};

export const requestTacHandler = (type, payload) => {
  const handler = {
    [PURCHASE_TICKET]: () => {
      store.dispatch(putTicketTAC());
      store.dispatch(requestTicketTAC(payload));
    },
    [PURCHASE_PREPAID]: () => {
      store.dispatch(putMobilePrepaidRequestTac());
      store.dispatch(getMobilePrepaidRequestTac(payload));
    },
    [PURCHASE_PLN_RELOAD]: () => {
      store.dispatch(putPlnReloadTac());
      store.dispatch(requestPlnReloadTac(payload));
    },
    default: () => null,
  };
  return (handler[type] || handler.default)();
};

export const submitTacHandler = (type, payload) => {
  const handler = {
    [PURCHASE_TICKET]: () => store.dispatch(getTicketResult(getTicketResultPayload(payload))),
    [PURCHASE_PREPAID]: () => store.dispatch(getMobilePrepaidResult(getPrepaidResultPayload(payload))),
    [PURCHASE_PLN_RELOAD]: () => store.dispatch(getPlnReloadResult(getPlnResultPayload(payload))),
    default: () => null,
  };
  return (handler[type] || handler.default)();
};

export const tacResultHandler = (type, { ticketTac, prepaidTac, plnReloadTac }) => {
  const handler = {
    [PURCHASE_TICKET]: ticketTac,
    [PURCHASE_PREPAID]: prepaidTac,
    [PURCHASE_PLN_RELOAD]: plnReloadTac,
    default: {},
  };
  return handler[type] || handler.default;
};

export const purchaseResultHandler = (type, { ticketResult, prepaidResult, plnReloadResult }) => {
  const handler = {
    [PURCHASE_TICKET]: ticketResult,
    [PURCHASE_PREPAID]: prepaidResult,
    [PURCHASE_PLN_RELOAD]: plnReloadResult,
    default: {},
  };
  return handler[type] || handler.default;
};

export const receiptHandler = (type, { ticketReceipt, prepaidReceipt, plnReloadReceipt }) => {
  const handler = {
    [PURCHASE_TICKET]: ticketReceipt,
    [PURCHASE_PREPAID]: prepaidReceipt,
    [PURCHASE_PLN_RELOAD]: plnReloadReceipt,
    default: {},
  };
  return handler[type] || handler.default;
};

export const getReceiptHandler = (type, payload) => {
  const handler = {
    [PURCHASE_TICKET]: () => store.dispatch(getTicketReceipt(payload)),
    [PURCHASE_PREPAID]: () => store.dispatch(getMobilePrepaidReceipt(payload)),
    [PURCHASE_PLN_RELOAD]: () => store.dispatch(getPlnReloadReceipt(payload)),
    default: () => null,
  };
  return (handler[type] || handler.default)();
};

export const optionPlaceholderHandler = type => {
  const handler = {
    [PURCHASE_PLN_RELOAD]: () => 'transaction.purchase.placeholder.reloadType',
    [PURCHASE_PREPAID]: () => 'transaction.purchase.placeholder.operator',
    [PURCHASE_TICKET]: () => 'transaction.purchase.placeholder.serviceType',
    default: () => 'transaction.purchase.placeholder.autocomplete',
  };
  return (handler[type] || handler.default)();
};
