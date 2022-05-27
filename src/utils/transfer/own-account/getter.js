import { get } from 'utils/lodash';
import { findArrayEntry } from 'utils/array';
import { getDisabledAfterDate, getDisabledBeforeDate } from 'utils/transaction';

import { CURRENCY_IDR, DEFAULT_INT_ZERO } from 'settings/constants/common';
import {
  TRANSFER_NOW,
  TRANSFER_FUTURE,
  TRANSFER_RECURRING,
  DEFAULT_MAX_TRANSFER_AMOUNT,
  DEFAULT_MIN_TRANSFER_AMOUNT,
} from 'settings/constants/transaction';
import { TODAY } from 'settings/constants/calendar';

// add key `selected` to receiverAccounts for OwnAccountModal
export const getSelectedReceiverAccount = (payload, selected) => findArrayEntry(payload, 'accountKey', selected);

// different transfer type use different mainNote
export const getOwnAccountTransferNote = serviceInfo => ({
  [TRANSFER_NOW]: get(serviceInfo, 'mainNote1', ''),
  [TRANSFER_FUTURE]: get(serviceInfo, 'mainNote2', ''),
  [TRANSFER_RECURRING]: [
    get(serviceInfo, 'mainNote3', ''),
    get(serviceInfo, 'mainNote4', ''),
    get(serviceInfo, 'mainNote5', ''),
    get(serviceInfo, 'mainNote6', ''),
  ],
});

export const getOwnAccountDynamicFields = (detail, senderAccount) => {
  const isRecurring = get(detail, 'isRecurring', false);
  const duplicateDateValue = get(detail, 'transferDate', '');
  const initialDate = get(detail, 'initialTransferDate', TODAY);
  const currency = get(detail, 'currency', CURRENCY_IDR);

  const transferDateLabel = !isRecurring ? 'transaction.transfer.effectiveDate' : '';
  const disabledAfterDate = getDisabledAfterDate(isRecurring);
  const disabledBeforeDate = (isEndDate = true) =>
    getDisabledBeforeDate({ isRecurring, disabledStartDate: initialDate, isEndDate, duplicateDateValue, initialDate });

  const currentBalance = get(senderAccount, 'plainBalance', DEFAULT_INT_ZERO);
  const senderCurrency = get(senderAccount, 'currency', CURRENCY_IDR);

  return [
    {
      name: 'transferAmount',
      hasOption: true,
      optionField: {
        name: 'currency',
        isTextField: true,
      },
      validationRules: [
        { type: 'required', isValidateRequired: true },
        { type: 'minAmount', value: DEFAULT_MIN_TRANSFER_AMOUNT, isValidateRequired: true },
        { type: 'maxAmount', value: DEFAULT_MAX_TRANSFER_AMOUNT, isValidateRequired: true },
        {
          type: 'senderBalance',
          value: currentBalance,
          isValidateRequired: senderCurrency === currency,
        },
      ],
    },
    {
      name: 'transferDate',
      label: transferDateLabel,
      disabledAfterDate,
      disabledBeforeDate: disabledBeforeDate(false),
    },
    {
      name: 'transferEndDate',
      duplicateDateValue,
      disabledAfterDate,
      disabledBeforeDate: disabledBeforeDate(),
    },
  ];
};
