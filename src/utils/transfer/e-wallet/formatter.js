import { get } from 'utils/lodash';
import { removeStringComma } from 'utils/formatter';

import { CURRENCY_IDR } from 'settings/constants/common';
import { DEFAULT_CURRENCY_EXCHANGE_RATE } from 'settings/constants/transaction';
import { SUCCESS_RESPONSE_CODE, UNRESPONSIVE_HOST } from 'settings/constants/response-codes';

export const formatEWallet = data =>
  data.reduce((acc, { payeeName, payeeCode, ...props }) => [...acc, { label: payeeName, value: payeeCode, ...props }], []);

export const formatEWalletDetail = data => {
  const responseCode = get(data, 'responseCode', UNRESPONSIVE_HOST);
  const products = get(data, 'productList', []);

  return {
    products,
    responseCode,
    isSuccess: responseCode === SUCCESS_RESPONSE_CODE,
    serviceInfoBean: get(data, 'serviceInfoBean', {}),
    transferBanks: formatEWallet(products),
  };
};
export const formatEWalletConfirmationBody = data => ({
  userId: get(data, 'userId', ''),
  senderAccountNumber: get(data, 'senderAccount.accountNumber', ''),
  senderCurrencyCode: get(data, 'senderAccount.currencyCode', ''),
  senderCurrency: get(data, 'senderAccount.currency', CURRENCY_IDR),
  payeeCode: get(data, 'beneficiaryBank.value', ''),
  receiverAccountNumber: get(data, 'accountNumber', ''),
  transferAmount: removeStringComma(get(data, 'transferAmount', '')),
});
export const formatEWalletResultBody = ({ userId, tacValue, transferTacDetail, confirmationDetail, senderAccount }) => {
  const tacViewBean = get(transferTacDetail, 'tacViewBean', {});

  return {
    userId,
    tacValue,
    adminFee: get(confirmationDetail, 'adminFee', ''),
    adminFeeDisplay: get(confirmationDetail, 'adminFeeDisplay', ''),
    de004AmountTransaction: get(confirmationDetail, 'de004AmountTransaction', ''),
    de048AdditionalData: get(confirmationDetail, 'de048AdditionalData', ''),
    equivalentIdrAmount: get(confirmationDetail, 'equivalentIdrAmount', ''),
    equivalentIdrAmountDisplay: get(confirmationDetail, 'equivalentIdrAmountDisplay', ''),
    fromAccountNumber: get(confirmationDetail, 'fromAccountNumber', ''),
    fromAmount: get(confirmationDetail, 'fromAmount', ''),
    fromCurrencyCode: get(senderAccount, 'currencyCode', ''),
    fromCurrency: get(senderAccount, 'currency', CURRENCY_IDR),
    fromCurrencyRate: get(confirmationDetail, 'fromCurrencyRate', DEFAULT_CURRENCY_EXCHANGE_RATE),
    name: get(confirmationDetail, 'name', ''),
    payeeName: get(confirmationDetail, 'payeeName', ''),
    toAccountNumber: get(confirmationDetail, 'toAccountNumber', ''),
    toAmount: get(confirmationDetail, 'toAmount', ''),
    toAmountDisplay: get(confirmationDetail, 'toAmountDisplay', ''),
    toCurrencyRate: get(confirmationDetail, 'toCurrencyRate', DEFAULT_CURRENCY_EXCHANGE_RATE),
    totalPayment: get(confirmationDetail, 'totalPayment', ''),
    totalPaymentDisplay: get(confirmationDetail, 'totalPaymentDisplay', ''),
    restSMSService: get(tacViewBean, 'restSMSService', {}),
  };
};
