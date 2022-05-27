import { get } from 'utils/lodash';
import { formatArrayKeys } from 'utils/formatter';

export const formatInterbankDetail = res => {
  const allBank = get(res, 'bankMap', {});
  const initialBanks = get(res, 'bankList', []);
  const initialCurrencies = get(res, 'currencyMap', []);
  const serviceInfoBean = get(res, 'serviceInfoBean', {});
  const transferBanks = formatArrayKeys(initialBanks);
  const currencies = formatArrayKeys(initialCurrencies);

  return { allBank, transferBanks, currencies, serviceInfoBean };
};

export const formatInterbankResultBody = ({ userId, tacValue, confirmationDetail, transferTacDetail }) => {
  return {
    userId,
    tacValue,
    restSMSService: get(transferTacDetail, 'tacViewBean.restSMSService', {}),
    additionalData: get(confirmationDetail, 'additionalData', ''),
    accountHolderName: get(confirmationDetail, 'accountHolderName', ''),
    bankCode: get(confirmationDetail, 'bankCode', ''),
    bankName: get(confirmationDetail, 'bankName', ''),
    beneReferenceNo: get(confirmationDetail, 'beneReferenceNo', ''),
    fromAccountNumber: get(confirmationDetail, 'fromAccountNumber', ''),
    fromCurrencyCode: get(confirmationDetail, 'fromCurrencyCode', ''),
    toAmount: get(confirmationDetail, 'toAmount', ''),
    toAccountNumber: get(confirmationDetail, 'toAccountNumber', ''),
    toAccountEmailAddress: get(confirmationDetail, 'toAccountEmailAddress', ''),
  };
};
