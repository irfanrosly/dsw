import { CURRENCY_IDR } from 'settings/constants/common';
import {
  FORMAT_NUMBER,
  FIELD_TYPE_TEXT,
  EMAIL_MAX_CHARS,
  FIELD_TYPE_NUMBER,
  FORMAT_FAVOURITE_NICKNAME,
  FAVOURITE_NICKNAME_MAX_LENGTH,
} from 'settings/constants/transaction';

export const VIRTUAL_ACCOUNT_FIELDS = [
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
    name: 'transferAmount',
    label: 'transaction.transfer.amount',
    type: FIELD_TYPE_NUMBER,
    leftLabel: CURRENCY_IDR,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
];

// Add new favourite from main transfer page
export const VIRTUAL_ACCOUNT_NEW_FAVOURITE = [
  {
    name: 'accountNickname',
    label: 'transaction.favourite.form.beneficiaryNickname',
    type: FIELD_TYPE_TEXT,
    format: FORMAT_FAVOURITE_NICKNAME,
    maxLength: FAVOURITE_NICKNAME_MAX_LENGTH,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    name: 'accountNumber',
    label: 'transaction.transfer.accountNumber',
    type: FIELD_TYPE_TEXT,
    format: FORMAT_NUMBER,
    validationRules: [
      { type: 'required', isValidateRequired: true },
      { type: 'accountLength', isValidateRequired: true },
    ],
  },
  {
    name: 'beneficiaryEmail',
    label: 'transaction.transfer.beneficiary.emailOptional',
    type: FIELD_TYPE_TEXT,
    maxLength: EMAIL_MAX_CHARS,
    validationRules: [{ type: 'validEmail', isValidateRequired: true }],
  },
];

// Add new favourite after transfer confirmation OR Edit favourite
export const VIRTUAL_ACCOUNT_FAVOURITE_EXIST = [
  {
    name: 'accountNickname',
    label: 'transaction.favourite.form.beneficiaryNickname',
    type: FIELD_TYPE_TEXT,
    format: FORMAT_FAVOURITE_NICKNAME,
    maxLength: FAVOURITE_NICKNAME_MAX_LENGTH,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    name: 'accountNumber',
    label: 'transaction.transfer.accountNumber',
    type: FIELD_TYPE_TEXT,
    readOnly: true,
  },
  {
    name: 'beneficiaryName',
    label: 'transaction.transfer.beneficiary.name',
    type: FIELD_TYPE_TEXT,
    readOnly: true,
  },
  {
    name: 'beneficiaryEmail',
    label: 'transaction.transfer.beneficiary.emailOptional',
    type: FIELD_TYPE_TEXT,
    maxLength: EMAIL_MAX_CHARS,
    validationRules: [{ type: 'validEmail', isValidateRequired: true }],
  },
];
