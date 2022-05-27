import { TODAY } from 'settings/constants/calendar';
import {
  FIELD_TYPE_DATE,
  FIELD_TYPE_NUMBER,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_SWITCH,
  FIELD_TYPE_TEXT,
  TRANSFER_FREQUENCIES,
} from 'settings/constants/transaction';

export const OWN_ACCOUNT_FIELDS = [
  {
    name: 'accountNumber',
    label: 'transaction.transfer.accountNumber',
    type: FIELD_TYPE_TEXT,
    isHeader: true,
    readOnly: true,
  },
  {
    name: 'transferAmount',
    label: 'transaction.transfer.transactionAmount',
    type: FIELD_TYPE_NUMBER,
    hasOption: true,
    optionField: {
      name: 'currency',
      isTextField: true,
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
