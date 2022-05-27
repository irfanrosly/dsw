import isEmpty from 'lodash/isEmpty';

import { get } from 'utils/lodash';
import { store } from 'providers/store';
import { findArrayEntry } from 'utils/array';

import {
  putUtilityTac,
  putOtherBillTac,
  getOtherBillTac,
  getUtilityAccess,
  getUtilityResult,
  getUtilityReceipt,
  requestUtilityTac,
  getOtherBillAccess,
  getOtherBillPayees,
  getOtherBillDetail,
  getOtherBillResult,
  getCreditCardAccess,
  getOtherBillReceipt,
  getMobilePostpaidTac,
  putMobilePostpaidTac,
  getUtlityConfirmation,
  getUtilityBillerDetail,
  getMobilePostpaidAccess,
  getMobilePostpaidDetail,
  getMobilePostpaidResult,
  getMobilePostpaidReceipt,
  getOtherBillConfirmation,
  getMobilePostpaidConfirmation,
} from 'middleware/actions/payment';
import {
  handleCcTitle,
  handleCcReceipt,
  handleCcFormField,
  handleCcSubmitTac,
  handleCcRequestTac,
  handleCcBillerDetail,
  handleGetCcConfirmation,
  handleCcHolderChange,
} from 'utils/payment/credit-card';
import { getIsOffline } from 'utils/transaction';
import { formatErrorMessage } from 'utils/formatter';
import { getDynamicFields } from 'utils/dynamic-field';
import { getConfirmationPayload } from 'utils/payment/getter';
import { getMobileResultPayload } from 'utils/payment/mobile-postpaid/getter';
import { getUtilityResultPayload, getUtilityDynamicFields } from 'utils/payment/utility/getter';
import { getOtherBillConfirmationPayload, getOtherBillResultPayload } from 'utils/payment/other-bill/getter';
import { getCcConfirmationPayload, getCcOwnDynamicFields, getCcResultPayload } from 'utils/payment/credit-card/getter';

import { UTILITY_FORM_FIELDS, MOBILE_POSTPAID_FIELDS, OTHER_BILL_FORM_FIELDS } from 'settings/constants/payment/form';
import { PAYMENT_CREDIT_CARD, PAYMENT_UTILITY, MOBILE_POSTPAID, PAYMENT_OTHER_BILL } from 'settings/constants/transaction';

export const paymentAccessHandler = (type, { mobileAccess, utilityAccess, ccAccess, otherBillAccess }) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: ccAccess,
    [MOBILE_POSTPAID]: mobileAccess,
    [PAYMENT_UTILITY]: utilityAccess,
    [PAYMENT_OTHER_BILL]: otherBillAccess,
    default: {},
  };

  return handler[type] || handler.default;
};

export const detailHandler = (type, { mobileDetail, utilityBillerDetail, ccOtherBankDetail, otherBillDetail }) => {
  const handler = {
    [MOBILE_POSTPAID]: mobileDetail,
    [PAYMENT_UTILITY]: utilityBillerDetail,
    [PAYMENT_CREDIT_CARD]: ccOtherBankDetail,
    [PAYMENT_OTHER_BILL]: otherBillDetail,
    default: {},
  };
  return handler[type] || handler.default;
};

export const billerHandler = (type, { ccTypes, mobileBillers, utilityBillers, otherBillBillers }) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: ccTypes,
    [MOBILE_POSTPAID]: mobileBillers,
    [PAYMENT_UTILITY]: utilityBillers,
    [PAYMENT_OTHER_BILL]: otherBillBillers,
    default: [],
  };

  return handler[type] || handler.default;
};

export const confirmationHandler = (
  type,
  { mobileConfirmation, utilityConfirmation, ccMaybankConfirmation, ccOtherBankConfirmation, otherBillConfirmation }
) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: isEmpty(ccMaybankConfirmation) ? ccOtherBankConfirmation : ccMaybankConfirmation,
    [PAYMENT_UTILITY]: utilityConfirmation,
    [MOBILE_POSTPAID]: mobileConfirmation,
    [PAYMENT_OTHER_BILL]: otherBillConfirmation,
    default: {},
  };

  return handler[type] || handler.default;
};

export const tacResultHandler = (paymentType, { mobileTac, utilityTac, ccMaybankTac, ccOtherBankTac, otherBillTac }) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: isEmpty(ccMaybankTac) ? ccOtherBankTac : ccMaybankTac,
    [PAYMENT_UTILITY]: utilityTac,
    [MOBILE_POSTPAID]: mobileTac,
    [PAYMENT_OTHER_BILL]: otherBillTac,
    default: {},
  };

  return handler[paymentType] || handler.default;
};

export const paymentResultHandler = (paymentType, { mobileResult, utilityResult, ccMaybankResult, ccOtherBankResult, otherBillResult }) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: isEmpty(ccMaybankResult) ? ccOtherBankResult : ccMaybankResult,
    [PAYMENT_UTILITY]: utilityResult,
    [MOBILE_POSTPAID]: mobileResult,
    [PAYMENT_OTHER_BILL]: otherBillResult,
    default: {},
  };

  return handler[paymentType] || handler.default;
};

export const receiptHandler = (paymentType, { mobileReceipt, utilityReceipt, ccMaybankReceipt, ccOtherBankReceipt, otherBillReceipt }) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: isEmpty(ccMaybankReceipt) ? ccOtherBankReceipt : ccMaybankReceipt,
    [PAYMENT_UTILITY]: utilityReceipt,
    [MOBILE_POSTPAID]: mobileReceipt,
    [PAYMENT_OTHER_BILL]: otherBillReceipt,
    default: {},
  };

  return handler[paymentType] || handler.default;
};

// Action dispatcher handler
export const confirmationPayloadHandler = (paymentType, data) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: () => getCcConfirmationPayload(data),
    [PAYMENT_UTILITY]: () => getConfirmationPayload(data),
    [MOBILE_POSTPAID]: () => getConfirmationPayload(data),
    [PAYMENT_OTHER_BILL]: () => getOtherBillConfirmationPayload(data),
    default: () => {},
  };

  return (handler[paymentType] || handler.default)();
};

export const paymentTypeHandler = (type, userId) => {
  const handler = {
    [PAYMENT_UTILITY]: () => store.dispatch(getUtilityAccess({ userId })),
    [PAYMENT_CREDIT_CARD]: () => store.dispatch(getCreditCardAccess({ userId })),
    [MOBILE_POSTPAID]: () => store.dispatch(getMobilePostpaidAccess({ userId })),
    [PAYMENT_OTHER_BILL]: () => store.dispatch(getOtherBillAccess({ userId })),
    default: () => null,
  };
  return (handler[type] || handler.default)();
};

export const handleFormSubmit = ({ senderAccount, paymentType, formDetail, userId, ccPaymentModes, otherBillDetail }) => {
  const creditCardType = get(formDetail, 'creditCardType', '');
  const confirmationPayload = confirmationPayloadHandler(paymentType, {
    senderAccount,
    formDetail,
    userId,
    paymentType,
    ccPaymentModes,
    otherBillDetail,
  });

  const handler = {
    [PAYMENT_CREDIT_CARD]: () => handleGetCcConfirmation(confirmationPayload, creditCardType),
    [PAYMENT_UTILITY]: () => store.dispatch(getUtlityConfirmation(confirmationPayload)),
    [MOBILE_POSTPAID]: () => store.dispatch(getMobilePostpaidConfirmation(confirmationPayload)),
    [PAYMENT_OTHER_BILL]: () => store.dispatch(getOtherBillConfirmation(confirmationPayload)),
    default: () => alert('No such request found!'),
  };

  return (handler[paymentType] || handler.default)();
};

export const billerDetailHandler = ({ paymentType, userId, value, setState, billers, onErrorDrawerOpen, formatMessage }) => {
  const keyName = paymentType === PAYMENT_OTHER_BILL ? 'categoryName' : 'fullName';
  const selectedBiller = findArrayEntry(billers, keyName, value);
  const payeeKey = get(selectedBiller, 'payeeKey', '');
  const category = get(selectedBiller, 'category', '');

  const isOffline = getIsOffline(value);

  if (isOffline) return onErrorDrawerOpen(formatErrorMessage(formatMessage, 'TRANSACTION_SERVICE_OFFLINE'));

  const handler = {
    [PAYMENT_CREDIT_CARD]: () => handleCcBillerDetail({ billers, value, setState, userId }),
    [PAYMENT_UTILITY]: () => store.dispatch(getUtilityBillerDetail({ userId, payeeKey })),
    [MOBILE_POSTPAID]: () => store.dispatch(getMobilePostpaidDetail({ userId, payeeKey })),
    [PAYMENT_OTHER_BILL]: () => store.dispatch(getOtherBillPayees({ userId, category })),
    default: () => null,
  };
  if (paymentType !== PAYMENT_CREDIT_CARD) setState({ selectedBiller });

  return (handler[paymentType] || handler.default)();
};

export const payeeDetailHandler = ({ paymentType, ccMaybankHolders, selectedBiller, otherBillPayees, value, userId, setState }) => {
  const selectedPayee = findArrayEntry(otherBillPayees, 'value', value);
  const toPayee = get(selectedPayee, 'key', '');
  const category = get(selectedBiller, 'category', '');

  const handler = {
    [PAYMENT_CREDIT_CARD]: () => handleCcHolderChange({ ccMaybankHolders, value, userId, setState }),
    [PAYMENT_OTHER_BILL]: () => {
      setState({ selectedPayee });
      return store.dispatch(getOtherBillDetail({ userId, category, toPayee }));
    },
    default: () => null,
  };
  return (handler[paymentType] || handler.default)();
};

export const secondOptionHandler = (paymentType, { ccMaybankHolders, otherBillPayees }) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: () => (!isEmpty(ccMaybankHolders) ? ccMaybankHolders.map(item => item.value) : []),
    [PAYMENT_OTHER_BILL]: () => (!isEmpty(otherBillPayees) ? otherBillPayees.map(item => item.value) : []),
    default: () => null,
  };
  return (handler[paymentType] || handler.default)();
};

export const requestTacHandler = (paymentType, creditCardType, payload) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: () => handleCcRequestTac(payload, creditCardType),
    [PAYMENT_UTILITY]: () => {
      store.dispatch(putUtilityTac());
      store.dispatch(requestUtilityTac(payload));
    },
    [MOBILE_POSTPAID]: () => {
      store.dispatch(putMobilePostpaidTac());
      store.dispatch(getMobilePostpaidTac(payload));
    },
    [PAYMENT_OTHER_BILL]: () => {
      store.dispatch(putOtherBillTac());
      store.dispatch(getOtherBillTac(payload));
    },
    default: () => null,
  };
  return (handler[paymentType] || handler.default)();
};

export const submitTacHandler = (paymentType, payload, creditCardType) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: () => {
      const formattedPayload = getCcResultPayload(payload, creditCardType);
      return handleCcSubmitTac(formattedPayload, creditCardType);
    },
    [PAYMENT_UTILITY]: () => store.dispatch(getUtilityResult(getUtilityResultPayload(payload))),
    [MOBILE_POSTPAID]: () => store.dispatch(getMobilePostpaidResult(getMobileResultPayload(payload))),
    [PAYMENT_OTHER_BILL]: () => store.dispatch(getOtherBillResult(getOtherBillResultPayload(payload))),
    default: () => null,
  };
  return (handler[paymentType] || handler.default)();
};

export const retrieveReceiptHandler = (paymentType, creditCardType, payload) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: () => handleCcReceipt(payload, creditCardType),
    [PAYMENT_UTILITY]: () => store.dispatch(getUtilityReceipt(payload)),
    [MOBILE_POSTPAID]: () => store.dispatch(getMobilePostpaidReceipt(payload)),
    [PAYMENT_OTHER_BILL]: () => store.dispatch(getOtherBillReceipt(payload)),
    default: () => null,
  };
  return (handler[paymentType] || handler.default)();
};

// Other handler
export const formTitleHandler = (paymentType, creditCardType) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: () => handleCcTitle(creditCardType),
    [PAYMENT_UTILITY]: () => `transaction.payment.modal.title`,
    [MOBILE_POSTPAID]: () => 'transaction.payment.modal.title',
    [PAYMENT_OTHER_BILL]: () => 'transaction.payment.modal.title',
    default: () => '',
  };

  return (handler[paymentType] || handler.default)();
};

export const formFieldHandler = (paymentType, creditCardType) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: () => handleCcFormField(creditCardType),
    [MOBILE_POSTPAID]: () => MOBILE_POSTPAID_FIELDS,
    [PAYMENT_UTILITY]: () => UTILITY_FORM_FIELDS,
    [PAYMENT_OTHER_BILL]: () => OTHER_BILL_FORM_FIELDS,
    default: () => [],
  };

  return (handler[paymentType] || handler.default)();
};

export const dynamicFieldHandler = ({
  paymentType,
  formDetail,
  creditCardType,
  ccPaymentModes,
  onChange,
  senderAccount,
  otherBillDetail,
}) => {
  const handler = {
    [PAYMENT_UTILITY]: () => getUtilityDynamicFields(formDetail),
    [PAYMENT_CREDIT_CARD]: () => getCcOwnDynamicFields({ formDetail, creditCardType, ccPaymentModes, onChange, senderAccount }),
    [PAYMENT_OTHER_BILL]: () => getDynamicFields({ formDetail, otherBillDetail, senderAccount }),
    default: () => [],
  };
  return (handler[paymentType] || handler.default)();
};

export const firstOptionValueHandler = (paymentType, { creditCardIssuer, selectedBiller }) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: () => creditCardIssuer,
    [PAYMENT_OTHER_BILL]: () => get(selectedBiller, 'categoryName', ''),
    default: () => null,
  };
  return (handler[paymentType] || handler.default)();
};

export const secondOptionValueHandler = (paymentType, { creditCardHolder, selectedPayee }) => {
  const handler = {
    [PAYMENT_CREDIT_CARD]: () => creditCardHolder,
    [PAYMENT_OTHER_BILL]: () => get(selectedPayee, 'value', ''),
    default: () => null,
  };
  return (handler[paymentType] || handler.default)();
};

export const getAccountNumber = confirmationDetail =>
  get(confirmationDetail, 'fromAccountNumber', '') ||
  get(confirmationDetail, 'fromAccountNo', '') || // fromAccountNo is for Credit Card Other Bank
  get(confirmationDetail, 'fromAccount', ''); // fromAccount is for otherBill payment
