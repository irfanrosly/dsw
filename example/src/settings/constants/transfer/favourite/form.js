import { FIELD_TYPE_SELECT } from 'settings/constants/transaction';

// Initial Step: Choose transfer type
export const FAVOURITE_TRANSFER_TYPES = options => [
  {
    name: 'favouriteTransferType',
    label: 'transaction.transfer.to',
    placeholder: 'transaction.transfer.swift.placeholder.select',
    type: FIELD_TYPE_SELECT,
    options,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
];
