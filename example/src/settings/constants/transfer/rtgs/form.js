import { CALENDAR_MODIFIER_WEEKEND } from 'settings/constants/calendar';
import { CURRENCY_IDR } from 'settings/constants/common';
import {
  BENEFICIARY_NAME_MAX_CHARS,
  EMAIL_MAX_CHARS,
  FIELD_TYPE_DATE,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_NUMBER,
  FIELD_TYPE_SWITCH,
  FIELD_TYPE_TEXT,
  FORMAT_ALPHANUMERIC,
  FORMAT_BENEFICIARY_NAME,
  FORMAT_NUMBER,
  MESSAGE_INPUT_MAX_CHARS,
  TRANSFER_FREQUENCIES,
} from 'settings/constants/transaction';

export const RTGS_FIELDS = [
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
    name: 'beneficiaryName',
    label: 'transaction.transfer.beneficiary.name',
    type: FIELD_TYPE_TEXT,
    format: FORMAT_BENEFICIARY_NAME,
    maxLength: BENEFICIARY_NAME_MAX_CHARS,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    options: [],
    name: 'sourceOfFund',
    label: 'transaction.transfer.sourceOfFund',
    type: FIELD_TYPE_SELECT,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    options: [],
    name: 'transactionPurpose',
    label: 'transaction.transfer.transactionPurpose',
    type: FIELD_TYPE_SELECT,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    options: [],
    name: 'beneficiaryType',
    label: 'transaction.transfer.beneficiary.type',
    type: FIELD_TYPE_SELECT,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    options: [],
    name: 'beneficiaryCitizenStatus',
    label: 'transaction.transfer.beneficiary.citizenStatus',
    type: FIELD_TYPE_SELECT,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    options: TRANSFER_FREQUENCIES,
    isRecurringDisplay: true,
    name: 'transferFrequency',
    label: 'transaction.transfer.frequency',
    type: FIELD_TYPE_SELECT,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    name: 'transferDate',
    label: 'transaction.transfer.effectiveDate',
    type: FIELD_TYPE_DATE,
    recurringLabel: 'transaction.transfer.start',
    validationRules: [{ type: 'required', isValidateRequired: true }],
    blockedDays: [CALENDAR_MODIFIER_WEEKEND],
    disabledStartDate: '',
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
    blockedDays: [CALENDAR_MODIFIER_WEEKEND],
    disabledStartDate: '',
  },
  {
    name: 'debitDate',
    readOnly: true,
    label: 'transaction.transfer.debitDate',
    type: FIELD_TYPE_TEXT,
    isRecurringDisplay: true,
  },
  { initialValue: false, name: 'isRecurring', label: 'transaction.transfer.setRecurring', type: FIELD_TYPE_SWITCH },
  {
    initialValue: '',
    name: 'message',
    label: 'transaction.transfer.sknTransfer.label.message',
    format: FORMAT_ALPHANUMERIC,
    type: FIELD_TYPE_TEXT,
    maxLength: MESSAGE_INPUT_MAX_CHARS,
    placeholder: 'transaction.transfer.sknTransfer.label.messagePlaceholder',
  },
  {
    initialValue: '',
    name: 'beneficiaryEmail',
    label: 'transaction.transfer.sknTransfer.label.beneficiaryEmail',
    type: FIELD_TYPE_TEXT,
    maxLength: EMAIL_MAX_CHARS,
    validationRules: [{ type: 'validEmail', isValidateRequired: true }],
  },
];
