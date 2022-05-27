import moment from 'moment-timezone';

import { get } from 'utils/lodash';
import { formatArrayKeys, removeStringComma } from 'utils/formatter';
import { formatCommonResultBody, formatTransferRecurringBody } from 'utils/transfer/formatter';

import { TRANSFER_RECURRING } from 'settings/constants/transaction';
import { SUCCESS_RESPONSE_CODE } from 'settings/constants/response-codes';

export const formatIntrabankDetail = data => {
  const currencies = formatArrayKeys(get(data, 'currencyMap', []));
  const responseCode = get(data, 'responseCode', '');
  const isSuccess = responseCode === SUCCESS_RESPONSE_CODE;
  const errorCode = !isSuccess && responseCode;

  return { ...data, isSuccess, errorCode, currencies };
};

export const formatIntrabankDetailBody = data => {
  const senderDetail = get(data, 'senderAccount', {});
  const transferMode = get(data, 'transferMode', '');
  const transferDate = get(data, 'transferDate', '');
  const terminateDate = get(data, 'transferEndDate', '');
  const transferFrequency = get(data, 'transferFrequency', '');

  const body = {
    payMode: transferMode,
    userId: get(data, 'userId', ''),
    fromAccountNumber: get(senderDetail, 'accountNumber', ''),
    fromCurrency: get(senderDetail, 'currency', ''),
    toAccountNumber: get(data, 'accountNumber', ''),
    toCurrency: get(data, 'currency', ''),
    toAmount: removeStringComma(get(data, 'transferAmount', '')),
    fromAccountList: get(data, 'initialSenderAccounts', []),
    selectedDate: transferDate && moment(transferDate).format('DD'),
    selectedMonth: transferDate && moment(transferDate).format('MM'),
    selectedYear: transferDate && moment(transferDate).format('YYYY'),
  };

  if (transferMode === TRANSFER_RECURRING) return formatTransferRecurringBody(body, transferFrequency, transferDate, terminateDate);
  return body;
};

export const formatIntrabankResultBody = ({ userId, tacValue, confirmationDetail, transferTacDetail, transferMode, transferFrequency }) => {
  const toAccountHolderName = get(confirmationDetail, 'toAccountHolderName', '');
  const initialBody = formatCommonResultBody(userId, tacValue, confirmationDetail, transferTacDetail, transferMode, transferFrequency);

  return { ...initialBody, toAccountHolderName };
};
