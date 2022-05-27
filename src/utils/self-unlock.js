import { get } from 'utils/lodash';
import { encrypt } from 'utils/crypto';
import { userAgent } from 'providers/fingerprint';

import {
  TAC_INVALID,
  TAC_EXCEED_MAX_TRIES,
  TAC_EXPIRED,
  TAC_NOT_GENERATE,
  TAC_EXCEED_MAX_USE,
  CASA_ACCOUNT_CODE,
  USER_STATUS_NORMAL,
  USER_STATUS_ENABLED,
  USER_STATUS_LOCKED,
} from 'settings/constants/self-unlock';

import { SUCCESS_RESPONSE_CODE } from 'settings/constants/response-codes';

import { DRAWER_TYPE_ERROR } from 'settings/constants/ui-control';
import { formatKeys } from 'utils/formatter';

import { MENU_ITEMS } from 'settings/constants/menu';
import { SELF_UNLOCK_KEYMAP } from 'settings/constants/keymap';

// NOTE: get selfUnlock status message
export const getStatusMessage = status => {
  const message = {
    [USER_STATUS_NORMAL]: { id: 'selfUnlock.modal.unlock.normal' },
    [USER_STATUS_ENABLED]: { id: 'selfUnlock.modal.unlock.normal' },
    [USER_STATUS_LOCKED]: { id: 'selfUnlock.modal.unlock.locked' },
    // account Disabled / TAC locked
    default: { id: 'selfUnlock.modal.unlock.disabled' },
  };

  return message[status] || message.default;
};

// NOTE: Get selfUnlock action option items
export const getActionItems = (isNormal, isEnabled) => {
  const NORMAL_ACTION = get(MENU_ITEMS, 'selfUnlock.action.normal', []);
  const LOCKED_ACTION = get(MENU_ITEMS, 'selfUnlock.action.locked', []);

  return isNormal || isEnabled ? NORMAL_ACTION : LOCKED_ACTION;
};

export const encryptPayload = payload => {
  const method = get(payload, 'method', '');
  const accountNumber = get(payload, 'accountNumber', '');
  const creditCardNumber = get(payload, 'creditCardNumber', '');
  const expiryMonth = get(payload, 'expiryMonth', '');
  const expiryYear = get(payload, 'expiryYear', '');
  const pin = get(payload, 'pin', '');

  const selectedAccountNumber = method === CASA_ACCOUNT_CODE ? accountNumber : creditCardNumber;

  const mutatedPayload = { selectedAccountNumber, expiryMonth, expiryYear, pin };
  const renamedPayload = formatKeys(mutatedPayload, SELF_UNLOCK_KEYMAP);

  return encrypt(JSON.stringify(renamedPayload));
};

export const formatBody = (body, payload) => {
  const accountType = get(payload, 'method', '');
  const selectedCurrency = get(payload, 'selectedCurrency', '');

  const initialBody = { ...body, accountType };

  return accountType === CASA_ACCOUNT_CODE ? { ...initialBody, selectedCurrency } : initialBody;
};

export const formatTacSubmitData = payload => {
  const newPassword = get(payload, 'newPassword', '');
  const tacValue = get(payload, 'tacValue', '');
  const restSMSService = get(payload, 'restSMSService', {});
  const encryptedUserId = get(payload, 'encryptedUserId', '');

  const encryptedPassword = encrypt(newPassword);

  return { encryptedUserId, encryptedPassword, tacValue, restSMSService, userAgent };
};

export const handleTacSubmitResponse = responseCode => {
  switch (responseCode) {
    case SUCCESS_RESPONSE_CODE:
      return { tacDrawerMessage: 'login.feedbackDrawer.successPasswordChange', redirectMainSite: false, tacDrawerType: '' };
    case TAC_INVALID:
      return { tacDrawerMessage: 'selfUnlock.errorMessage.tacInvalid', redirectMainSite: false, tacDrawerType: DRAWER_TYPE_ERROR };
    case TAC_EXCEED_MAX_TRIES:
      return { tacDrawerMessage: 'selfUnlock.errorMessage.tacExceedMaxTries', redirectMainSite: true, tacDrawerType: DRAWER_TYPE_ERROR };
    case TAC_EXPIRED:
      return { tacDrawerMessage: 'selfUnlock.errorMessage.tacExpired', redirectMainSite: false, tacDrawerType: DRAWER_TYPE_ERROR };
    case TAC_NOT_GENERATE:
      return { tacDrawerMessage: 'selfUnlock.errorMessage.tacNotGenerate', redirectMainSite: false, tacDrawerType: DRAWER_TYPE_ERROR };
    case TAC_EXCEED_MAX_USE:
      return { tacDrawerMessage: 'selfUnlock.errorMessage.tacExceedMaxUse', redirectMainSite: false, tacDrawerType: DRAWER_TYPE_ERROR };
    default:
      return {};
  }
};
