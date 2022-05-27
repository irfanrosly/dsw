import isEmpty from 'lodash/isEmpty';

import { get } from 'utils/lodash';
import { SUCCESS_RESPONSE_CODE, UNRESPONSIVE_HOST } from 'settings/constants/response-codes';

// Mobile & Utility has billers, while CC doesnt have it
export const formatPaymentAccess = (data, isCreditCard = false, isMaybank = false) => {
  // Other Bill
  const categories = get(data, 'paymentCategoryList', []);
  // Mobile Postpaid and utility
  const billers = get(data, 'billerList', []);
  const responseCode = get(data, 'responseCode', UNRESPONSIVE_HOST);
  const isSuccess = responseCode === SUCCESS_RESPONSE_CODE;

  // Credit Card
  const getCcTypes = isMaybank ? get(data, 'maybankCreditCardOptionList') : get(data, 'creditCardOptionList', []);
  // get array list for selection
  const getList = !isEmpty(categories) ? categories : billers;

  const list = isCreditCard ? getCcTypes : getList;

  return [{ ...data, isSuccess }, list];
};
