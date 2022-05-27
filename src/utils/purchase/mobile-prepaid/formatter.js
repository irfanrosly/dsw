import { get } from 'utils/lodash';
import { formatArrayKeys } from 'utils/formatter';
import { MOBILE_NUMBER_PREFIX } from 'settings/constants/common';
import { MOBILE_TYPE_FREE_INPUT, MOBILE_PREFIX_START_POSITION, MOBILE_PREFIX_END_POSITION } from 'settings/constants/transaction';
import { SUCCESS_RESPONSE_CODE } from 'settings/constants/response-codes';

export const formatPrepaidDetail = data => {
  const responseCode = get(data, 'responseCode', '');

  const isSuccess = responseCode === SUCCESS_RESPONSE_CODE;
  const errorCode = !isSuccess && responseCode;
  const areaCodes = formatArrayKeys(get(data, 'areaCodeList', []), 'value', 'label', true);

  return { ...data, isSuccess, errorCode, areaCodes };
};

export const formatPrepaidMobileNumber = (mobileNumber, prefix, prefixType) => {
  const isFreeInput = prefixType === MOBILE_TYPE_FREE_INPUT;

  // mobile number e.g: 08123456789
  return isFreeInput
    ? {
        // prefix assigned with first 4 char on mobile number, e.g: 0812
        prefix: MOBILE_NUMBER_PREFIX.concat(mobileNumber.substring(MOBILE_PREFIX_START_POSITION, MOBILE_PREFIX_END_POSITION)),
        // mobileNumber assigned with the remaining mobile number, e.g: 3456789
        mobileNumber: mobileNumber.substring(MOBILE_PREFIX_END_POSITION),
      }
    : // if mobile number is not free input, assign to original value
      { prefix, mobileNumber };
};
