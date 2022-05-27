import moment from 'moment-timezone';
import { isEmpty, trim } from 'lodash';

import { get } from 'utils/lodash';

import {
  SWIFT_TRANSFER,
  CUTOFF_TIME_FORMAT,
  SWIFT_OPERATION_END_TIME,
  SWIFT_OPERATION_START_TIME,
  CONFIRMATION_DETAIL_EMPTY_LABEL,
} from 'settings/constants/transaction';
import { SUCCESS_RESPONSE_CODE } from 'settings/constants/response-codes';

// Check if the service is available. service available time is 4 am - 1 pm  GMT +7
export const isSwiftOperating = res => {
  if (isEmpty(res)) return false;

  const currentTime = moment();
  const endTime = get(res, 'serviceInfoBean.operationEndTime', SWIFT_OPERATION_END_TIME);
  const startTime = get(res, 'serviceInfoBean.operationStartTime', SWIFT_OPERATION_START_TIME);
  const isBeforEndTime = currentTime.isBefore(moment(endTime, CUTOFF_TIME_FORMAT));
  const isAfterStartTime = currentTime.isAfter(moment(startTime, CUTOFF_TIME_FORMAT));

  // Return true & service is available if it's not cut off time
  return isAfterStartTime && isBeforEndTime;
};

// check for valid SWIFT code (ISO standard)
export const isValidSwiftCode = code =>
  /([a-zA-Z]{4})([a-zA-Z]{2})(([2-9a-zA-Z]{1})([0-9a-np-zA-NP-Z]{1}))((([0-9a-wy-zA-WY-Z]{1})([0-9a-zA-Z]{2}))|([xX]{3})|)/g.test(
    trim(code)
  );

export const isSwiftBankEmpty = swiftBank => {
  const banks = get(swiftBank, 'banks', []);
  const bankMap = get(swiftBank, 'bankMap', {});
  return isEmpty(banks) && isEmpty(Object.values(bankMap));
};

export const isSwiftSearchInvalid = swiftBank => {
  const isBankEmpty = isSwiftBankEmpty(swiftBank);
  const responseCode = get(swiftBank, 'responseCode', '');
  return responseCode === SUCCESS_RESPONSE_CODE && isBankEmpty;
};

export const isLldRequired = lldDetail => get(lldDetail, 'responseCode', '') === SUCCESS_RESPONSE_CODE;

// just check for one key because it's mandatory
export const hasLldDetail = (transferType, detail = {}) =>
  transferType === SWIFT_TRANSFER && get(detail, 'beneCitizenship', '-') !== CONFIRMATION_DETAIL_EMPTY_LABEL;
