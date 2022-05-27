import { store } from 'providers/store';
import {
  getMaybankCardResult,
  putCreditCardOwnCards,
  requestMaybankCardTac,
  getMaybankCardReceipt,
  getCreditCardOwnCards,
  getOtherBankCardResult,
  requestOtherBankCardTac,
  getOtherBankCardReceipt,
  getOtherBankConfirmation,
  getCreditCardMaybankAccess,
  getMaybankCardConfirmation,
} from 'middleware/actions/payment';

import { CURRENCY_IDR } from 'settings/constants/common';
import { OTHER_CREDIT_CARD_FORM_FIELDS, OWN_CREDIT_CARD_FORM_FIELDS } from 'settings/constants/payment/form';
import {
  OTHER_BANK_CC,
  OWN_MAYBANK_CC,
  CC_OTHER_AMOUNT,
  OTHER_MAYBANK_CC,
  MAYBANK_CREDIT_CARD_KEY,
  OWN_MAYBANK_CREDIT_CARD_KEY,
} from 'settings/constants/transaction';

export const handleCcBillerDetail = ({ billers, value, setState, userId }) => {
  const isMaybankCc = billers.find(row => value === row.value && row.key === MAYBANK_CREDIT_CARD_KEY);

  const creditCardIssuer = isMaybankCc ? value : '';
  const creditCardType = isMaybankCc ? OWN_MAYBANK_CC : OTHER_BANK_CC;

  // clear ccOwnMaybankCards to avoid ownCardList from coming out when change creditCardType to Other Bank Credit Card
  if (!isMaybankCc) store.dispatch(putCreditCardOwnCards([]));

  // note: when `Maybank Credit Card` selected. display value on autocomplete and open secondAutocomplete
  // when other bank credit card selected. form modal open and autocomplete value ''
  setState({ creditCardIssuer, creditCardType, isFormModalOpen: !isMaybankCc });
  return isMaybankCc && store.dispatch(getCreditCardMaybankAccess({ userId }));
};

export const handleCcTitle = creditCardType => {
  const handler = {
    [OWN_MAYBANK_CC]: 'transaction.payment.modal.titleOwnCard',
    [OTHER_MAYBANK_CC]: 'transaction.payment.modal.titleOtherMaybankCard',
    [OTHER_BANK_CC]: 'transaction.payment.modal.titleOtherBankCard',
    default: '',
  };

  return handler[creditCardType] || handler.default;
};

export const handleCcFormField = creditCardType => {
  if (creditCardType === OWN_MAYBANK_CC) return OWN_CREDIT_CARD_FORM_FIELDS;
  // other bank and other maybank cc use same form
  return OTHER_CREDIT_CARD_FORM_FIELDS;
};

export const handleOwnCcFields = ({ ccPaymentModes, paymentOption, currentBalance, currency, paymentAmount }) => {
  return [
    {
      name: 'paymentOption',
      options: ccPaymentModes,
    },
    {
      name: 'paymentAmount',
      disabled: paymentOption !== CC_OTHER_AMOUNT,
      validateOnChange: paymentOption !== CC_OTHER_AMOUNT || !paymentAmount,
      validationRules: [
        {
          type: 'senderBalance',
          value: currentBalance,
          isValidateRequired: currency === CURRENCY_IDR,
        },
        { type: 'required', isValidateRequired: true },
      ],
    },
  ];
};

export const handleOtherCcFields = ({ currentBalance, currency }) => {
  return [
    {
      name: 'paymentAmount',
      validationRules: [
        { type: 'required', isValidateRequired: true },
        {
          type: 'senderBalance',
          value: currentBalance,
          isValidateRequired: currency === CURRENCY_IDR,
        },
      ],
    },
  ];
};

export const handleGetCcConfirmation = (payload, creditCardType) => {
  const handler = {
    [OWN_MAYBANK_CC]: () => store.dispatch(getMaybankCardConfirmation(payload)),
    [OTHER_MAYBANK_CC]: () => store.dispatch(getMaybankCardConfirmation(payload)),
    [OTHER_BANK_CC]: () => store.dispatch(getOtherBankConfirmation(payload)),
    default: () => null,
  };
  return (handler[creditCardType] || handler.default)();
};

export const handleCcRequestTac = (payload, creditCardType) => {
  const handler = {
    [OWN_MAYBANK_CC]: () => store.dispatch(requestMaybankCardTac(payload)),
    [OTHER_MAYBANK_CC]: () => store.dispatch(requestMaybankCardTac(payload)),
    [OTHER_BANK_CC]: () => store.dispatch(requestOtherBankCardTac(payload)),
    default: () => null,
  };

  return (handler[creditCardType] || handler.default)();
};

export const handleCcSubmitTac = (payload, creditCardType) => {
  const handler = {
    [OWN_MAYBANK_CC]: () => store.dispatch(getMaybankCardResult(payload)),
    [OTHER_MAYBANK_CC]: () => store.dispatch(getMaybankCardResult(payload)),
    [OTHER_BANK_CC]: () => store.dispatch(getOtherBankCardResult(payload)),
    default: () => null,
  };

  return (handler[creditCardType] || handler.default)();
};

export const handleCcReceipt = (payload, creditCardType) => {
  const handler = {
    [OWN_MAYBANK_CC]: () => store.dispatch(getMaybankCardReceipt(payload)),
    [OTHER_MAYBANK_CC]: () => store.dispatch(getMaybankCardReceipt(payload)),
    [OTHER_BANK_CC]: () => store.dispatch(getOtherBankCardReceipt(payload)),
    default: () => null,
  };

  return (handler[creditCardType] || handler.default)();
};

export const handleCcHolderChange = ({ ccMaybankHolders, value, userId, setState }) => {
  const isOwnMaybankCc = ccMaybankHolders.find(row => row.value === value && row.key === OWN_MAYBANK_CREDIT_CARD_KEY);
  // if own maybank cc. set value for second autocomplete.
  const creditCardHolderValue = isOwnMaybankCc ? value : '';
  const creditCardTypeValue = isOwnMaybankCc ? OWN_MAYBANK_CC : OTHER_MAYBANK_CC;

  // not own maybank credit card, open modal
  setState({ creditCardHolder: creditCardHolderValue, isFormModalOpen: !isOwnMaybankCc, creditCardType: creditCardTypeValue });

  return isOwnMaybankCc && store.dispatch(getCreditCardOwnCards({ userId }));
};
