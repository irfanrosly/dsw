import { get } from 'utils/lodash';

export const formatVirtualAccountResultBody = ({ userId, tacValue, confirmationDetail, transferTacDetail }) => {
  return {
    userId,
    tacValue,
    restSMSService: get(transferTacDetail, 'tacViewBean.restSMSService', {}),
    fromAccountNumber: get(confirmationDetail, 'fromAccountNumber', ''),
    fromCurrency: get(confirmationDetail, 'fromCurrency', ''),
    fromCurrencyCode: get(confirmationDetail, 'fromCurrencyCode', ''),
    fromCurrencyRate: get(confirmationDetail, 'fromCurrencyRate', ''),
    toAccountNumber: get(confirmationDetail, 'toAccountNumber', ''),
    toCurrency: get(confirmationDetail, 'toCurrency', ''),
    toCurrencyCode: get(confirmationDetail, 'toCurrencyCode', ''),
    toCurrencyRate: get(confirmationDetail, 'toCurrencyRate', ''),
    additionalData: get(confirmationDetail, 'additionalData', ''),
    fromAmount: get(confirmationDetail, 'fromAmount', ''),
    toAmount: get(confirmationDetail, 'toAmount', ''),
    localAmount: get(confirmationDetail, 'localAmount', ''),
    toAccountHolderName: get(confirmationDetail, 'toAccountHolderName', ''),
    debitAmount: get(confirmationDetail, 'debitAmount', ''),
  };
};
