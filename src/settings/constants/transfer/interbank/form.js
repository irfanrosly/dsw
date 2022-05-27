import { CURRENCY_IDR } from 'settings/constants/common';

import {
  FORMAT_NUMBER,
  EMAIL_MAX_CHARS,
  FIELD_TYPE_TEXT,
  FORMAT_ALPHANUMERIC,
  MESSAGE_INPUT_MAX_CHARS,
  FIELD_TYPE_NUMBER,
} from 'settings/constants/transaction';

export const INTERBANK_FIELDS = [
  {
    name: 'accountNumber',
    label: 'transaction.transfer.accountNumber',
    type: FIELD_TYPE_TEXT,
    isHeader: true,
    format: FORMAT_NUMBER,
    validationRules: [
      { type: 'required', isValidateRequired: true },
      { type: 'accountLength', isValidateRequired: true },
    ],
  },
  {
    name: 'beneficiaryBankLabel',
    label: 'transaction.transfer.beneficiary.bank',
    type: FIELD_TYPE_TEXT,
    readOnly: true,
  },
  {
    name: 'transferAmount',
    label: 'transaction.transfer.amount',
    type: FIELD_TYPE_NUMBER,
    leftLabel: CURRENCY_IDR,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    name: 'message',
    label: 'transaction.transfer.sknTransfer.label.message',
    format: FORMAT_ALPHANUMERIC,
    type: FIELD_TYPE_TEXT,
    maxLength: MESSAGE_INPUT_MAX_CHARS,
    placeholder: 'transaction.transfer.sknTransfer.label.messagePlaceholder',
  },
  {
    name: 'beneficiaryEmail',
    label: 'transaction.transfer.sknTransfer.label.beneficiaryEmail',
    type: FIELD_TYPE_TEXT,
    maxLength: EMAIL_MAX_CHARS,
    validationRules: [{ type: 'validEmail', isValidateRequired: true }],
  },
];
