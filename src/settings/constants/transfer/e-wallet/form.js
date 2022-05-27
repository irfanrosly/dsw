import { CURRENCY_IDR } from 'settings/constants/common';
import {
  FIELD_TYPE_NUMBER,
  FIELD_TYPE_TEXT,
  FORMAT_NUMBER,
  DEFAULT_MIN_TRANSFER_AMOUNT,
  DEFAULT_MAX_TRANSFER_AMOUNT,
} from 'settings/constants/transaction';

export const E_WALLET_FIELDS = [
  {
    name: 'accountNumber',
    label: 'transaction.transfer.eWallet.customerNumber',
    type: FIELD_TYPE_TEXT,
    isHeader: true,
    format: FORMAT_NUMBER,
    validationRules: [
      { type: 'required', isValidateRequired: true },
      { type: 'accountLength', isValidateRequired: true },
      { type: 'minAmount', value: DEFAULT_MIN_TRANSFER_AMOUNT, isValidateRequired: true },
      { type: 'maxAmount', value: DEFAULT_MAX_TRANSFER_AMOUNT, isValidateRequired: true },
    ],
  },
  {
    name: 'beneficiaryBankLabel',
    label: 'transaction.transfer.eWallet.name',
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
];
