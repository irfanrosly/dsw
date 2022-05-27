import { TODAY } from 'settings/constants/calendar';
import {
  FIELD_TYPE_DATE,
  FIELD_TYPE_NUMBER,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_SWITCH,
  FIELD_TYPE_TEXT,
  EMAIL_MAX_CHARS,
  FORMAT_NUMBER,
  TRANSFER_FREQUENCIES,
  FORMAT_FAVOURITE_NICKNAME,
  FAVOURITE_NICKNAME_MAX_LENGTH,
} from 'settings/constants/transaction';

export const INTRABANK_FIELDS = [
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
    label: 'transaction.transfer.transactionAmount',
    type: FIELD_TYPE_NUMBER,
    hasOption: true,
    optionField: {
      options: [],
      name: 'currency',
    },
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    name: 'transferFrequency',
    label: 'transaction.transfer.frequency',
    type: FIELD_TYPE_SELECT,
    isRecurringDisplay: true,
    options: TRANSFER_FREQUENCIES,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    name: 'transferDate',
    label: 'transaction.transfer.effectiveDate',
    type: FIELD_TYPE_DATE,
    recurringLabel: 'transaction.transfer.start',
    validationRules: [{ type: 'required', isValidateRequired: true }],
    initialDate: TODAY,
    disabledBeforeDate: TODAY,
  },
  {
    name: 'transferEndDate',
    label: '',
    type: FIELD_TYPE_DATE,
    isRecurringDisplay: true,
    recurringLabel: 'transaction.transfer.end',
    validationRules: [
      { type: 'required', isValidateRequired: true },
      { type: 'duplicateDate', value: 'transferDate', isValidateRequired: true },
    ],
  },
  {
    name: 'debitDate',
    readOnly: true,
    label: 'transaction.transfer.debitDate',
    type: FIELD_TYPE_TEXT,
    isRecurringDisplay: true,
  },
  { initialValue: false, name: 'isRecurring', label: 'transaction.transfer.setRecurring', type: FIELD_TYPE_SWITCH },
];

// Add new favourite from main transfer page
export const INTRABANK_NEW_FAVOURITE = [
  {
    name: 'accountNickname',
    label: 'transaction.favourite.form.beneficiaryNickname',
    type: FIELD_TYPE_TEXT,
    format: FORMAT_FAVOURITE_NICKNAME,
    maxLength: FAVOURITE_NICKNAME_MAX_LENGTH,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    options: [],
    name: 'currency',
    label: 'Currency',
    type: FIELD_TYPE_SELECT,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    options: [],
    name: 'currency',
    label: 'Daily Transaction Limit',
    type: FIELD_TYPE_SELECT,
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
