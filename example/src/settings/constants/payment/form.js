import {
  CURRENCY_IDR_PREFIX,
  DEFAULT_CC_FORMAT,
  MOBILE_NUMBER_PREFIX,
  OTHER_BILL_ACCOUNT_MAX_LENGTH,
  OTHER_BILL_ACCOUNT_MIN_LENGTH,
  OTHER_BILL_REFERENCE_NUMBER_MAX_LENGTH,
  OTHER_BILL_REFERENCE_NUMBER_MIN_LENGTH,
} from 'settings/constants/common';
import {
  FORMAT_NUMBER,
  FIELD_TYPE_TEXT,
  FIELD_TYPE_NUMBER,
  FIELD_TYPE_SELECT,
  MOBILE_NUMBER_MAX_LENGTH,
  FORMAT_ALPHANUMERIC_WITHOUT_SPACE,
} from 'settings/constants/transaction';

export const UTILITY_FORM_FIELDS = [
  {
    name: 'customerNumber',
    label: 'transaction.payment.modal.customerNumber',
    type: FIELD_TYPE_TEXT,
    format: FORMAT_NUMBER,
    thousandSeparator: false,
  },
];

export const MOBILE_POSTPAID_FIELDS = [
  {
    name: 'mobileNumber',
    label: 'transaction.payment.modal.mobileNumber',
    type: FIELD_TYPE_TEXT,
    format: FORMAT_NUMBER,
    maxLength: MOBILE_NUMBER_MAX_LENGTH,
    leftLabel: MOBILE_NUMBER_PREFIX,
    isLeftLabelNoSpace: true,
    validationRules: [
      { type: 'required', isValidateRequired: true },
      { type: 'validMobileNumber', isValidateRequired: true },
    ],
  },
];

export const OWN_CREDIT_CARD_FORM_FIELDS = [
  {
    name: 'creditCardNumber',
    label: 'transaction.payment.modal.ccNumber',
    type: FIELD_TYPE_TEXT,
    readOnly: true,
  },
  {
    name: 'paymentOption',
    label: 'transaction.payment.modal.paymentOption',
    placeholder: 'transaction.payment.placeHolder.selectPaymentOption',
    type: FIELD_TYPE_SELECT,
    options: [],
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    name: 'paymentAmount',
    label: 'transaction.payment.modal.amount',
    type: FIELD_TYPE_NUMBER,
    prefix: CURRENCY_IDR_PREFIX,
    disabled: true,
  },
];

export const OTHER_CREDIT_CARD_FORM_FIELDS = [
  {
    name: 'creditCardNumber',
    label: 'transaction.payment.modal.ccNumber',
    type: FIELD_TYPE_NUMBER,
    format: DEFAULT_CC_FORMAT,
    validationRules: [
      { type: 'required', isValidateRequired: true },
      { type: 'validCcNumber', isValidateRequired: true },
    ],
  },
  {
    name: 'paymentAmount',
    label: 'transaction.payment.modal.amount',
    type: FIELD_TYPE_NUMBER,
    prefix: CURRENCY_IDR_PREFIX,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
];

export const OTHER_BILL_FORM_FIELDS = [
  {
    name: 'customerNumber',
    label: 'transaction.payment.otherBill.vaNumber', // default label as Virtual Account
    type: FIELD_TYPE_TEXT,
    format: FORMAT_ALPHANUMERIC_WITHOUT_SPACE,
    maxLength: OTHER_BILL_ACCOUNT_MAX_LENGTH,
    isHidden: true,
  },
  {
    name: 'referenceNumber',
    label: 'transaction.payment.otherBill.billRef',
    type: FIELD_TYPE_TEXT,
    format: FORMAT_ALPHANUMERIC_WITHOUT_SPACE,
    maxLength: OTHER_BILL_REFERENCE_NUMBER_MAX_LENGTH,
    isHidden: true,
  },
  {
    name: 'paymentAmount',
    label: 'transaction.payment.modal.amount',
    type: FIELD_TYPE_TEXT,
    isHidden: true,
  },
  {
    name: 'message',
    label: 'transaction.payment.otherBill.message',
    type: FIELD_TYPE_TEXT,
    isHidden: true,
  },
];
