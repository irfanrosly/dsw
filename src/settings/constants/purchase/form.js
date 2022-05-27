import {
  PAYMENT_CODE_MAX_LENGTH,
  PAYMENT_CODE_MIN_LENGTH,
  PURCHASE_PLN_MAX_LENGTH,
  PURCHASE_PLN_MIN_LENGTH,
} from 'settings/constants/common';
import { FIELD_TYPE_NUMBER, FIELD_TYPE_TEXT, FORMAT_NUMBER } from 'settings/constants/transaction';
import { DEFAULT_MOBILE_NUMBER_FIELD, DEFAULT_AMOUNT_FIELD } from 'settings/constants/dynamic-field';

export const MOBILE_PREPAID_FIELDS = [DEFAULT_MOBILE_NUMBER_FIELD, { ...DEFAULT_AMOUNT_FIELD, name: 'purchaseAmount' }];

export const TICKET_FORM_FIELDS = [
  {
    name: 'paymentCode',
    label: 'transaction.purchase.modal.paymentCode',
    type: FIELD_TYPE_TEXT,
    format: FORMAT_NUMBER,
    thousandSeparator: false,
    maxLength: PAYMENT_CODE_MAX_LENGTH,
    validationRules: [
      { type: 'required', isValidateRequired: true },
      { type: 'validPaymentCode', isValidateRequired: true, minLength: PAYMENT_CODE_MIN_LENGTH, maxLength: PAYMENT_CODE_MAX_LENGTH },
    ],
  },
];

export const PLN_RELOAD_FORM_FIELDS = [
  {
    name: 'customerNumber',
    label: 'transaction.purchase.customerNumber',
    type: FIELD_TYPE_NUMBER,
    maxLength: PURCHASE_PLN_MAX_LENGTH,
    thousandSeparator: '',
    validationRules: [
      { type: 'required', isValidateRequired: true },
      {
        type: 'validCustomerNumber',
        isValidateRequired: true,
        minLength: PURCHASE_PLN_MIN_LENGTH,
        maxLength: PURCHASE_PLN_MAX_LENGTH,
      },
    ],
  },
  {
    name: 'purchaseAmount',
    label: 'transaction.payment.modal.amount',
    // type will be determined in `utils\dynamic-field\getDynamicFields`
  },
];
