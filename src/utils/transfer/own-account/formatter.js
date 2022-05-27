import { get } from 'utils/lodash';
import { formatTransferOnetimeBody, formatTransferRecurringBody } from 'utils/transfer/formatter';

import { TRANSFER_FUTURE, TRANSFER_RECURRING } from 'settings/constants/transaction';

export const formatOwnTransferConfirmBody = payload => {
  const receiverCurrency = get(payload, 'currency', '');
  const selectedCurrency = receiverCurrency;
  const transferMode = get(payload, 'transferMode', '');
  const transferDate = get(payload, 'transferDate', '');
  const transferEndDate = get(payload, 'transferEndDate', '');
  const transferFrequency = get(payload, 'transferFrequency', '');

  const body = {
    transferMode,
    receiverCurrency,
    selectedCurrency,
    userId: get(payload, 'userId', ''),
    senderAccountNumber: get(payload, 'senderAccount.accountNumber', ''),
    senderCurrency: get(payload, 'senderAccount.currency', ''),
    receiverAccountNumber: get(payload, 'accountNumber', ''),
    transferAmount: get(payload, 'transferAmount', ''),
  };
  if (transferMode === TRANSFER_FUTURE) return formatTransferOnetimeBody(body, transferDate);
  if (transferMode === TRANSFER_RECURRING) return formatTransferRecurringBody(body, transferFrequency, transferDate, transferEndDate);
  return body;
};
