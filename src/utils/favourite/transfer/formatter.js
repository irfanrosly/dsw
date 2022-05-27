import { get } from 'utils/lodash';
import { formatArrayKeys } from 'utils/formatter';

import { SUCCESS_RESPONSE_CODE } from 'settings/constants/response-codes';

export const formatFavouriteAccountResult = res => {
  const responseCode = get(res, 'responseCode', '');
  return {
    responseCode,
    responseMessage: get(res, 'responseMessage', ''),
    isSuccess: responseCode === SUCCESS_RESPONSE_CODE,
    favouriteAccountMap: get(res, 'favAccountMaps', {}),
    favouriteAccounts: get(res, 'favAccountMapsDisplay', ''),
  };
};

export const formatAddIntrabankDetail = res => {
  const responseCode = get(res, 'responseCode', '');
  const currencies = get(res, 'currencyList', []);
  const favouriteLimits = get(res, 'favouriteLimitList', []);

  return {
    responseCode,
    currencies: formatArrayKeys(currencies),
    responseMessage: get(res, 'responseMessage', ''),
    serviceInfoBean: get(res, 'serviceInfoBean', {}),
    favouriteLimits: formatArrayKeys(favouriteLimits),
    isSuccess: responseCode === SUCCESS_RESPONSE_CODE,
    isFromTransferResult: get(res, 'isFromTransferResult', false),
  };
};
