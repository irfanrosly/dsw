import { get } from 'utils/lodash';
import { getDisabledAfterDate, getDisabledBeforeDate } from 'utils/transaction';

import { TODAY } from 'settings/constants/calendar';
import { CURRENCY_IDR, DEFAULT_INT_ZERO } from 'settings/constants/common';
import {
  TRANSFER_NOW,
  TRANSFER_FUTURE,
  TRANSFER_RECURRING,
  DEFAULT_MAX_TRANSFER_AMOUNT,
  DEFAULT_MIN_TRANSFER_AMOUNT,
} from 'settings/constants/transaction';

export const getIntrabankNote = data => ({
  [TRANSFER_NOW]: get(data, 'mainNote1', ''),
  [TRANSFER_FUTURE]: get(data, 'mainNote2', ''),
  [TRANSFER_RECURRING]: [get(data, 'mainNote3', ''), get(data, 'mainNote4', ''), get(data, 'mainNote5', ''), get(data, 'mainNote6', '')],
});

export const getIntrabankDynamicFields = (detail, senderAccount) => {
  const isRecurring = get(detail, 'isRecurring', false);
  const duplicateDateValue = get(detail, 'transferDate', '');
  const initialDate = get(detail, 'initialTransferDate', TODAY);
  const currency = get(detail, 'currency', CURRENCY_IDR);
  const currencies = get(detail, 'currencies', []);

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
        options: currencies,
        name: 'currency',
        validationRules: [{ type: 'required', isValidateRequired: true }],
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
