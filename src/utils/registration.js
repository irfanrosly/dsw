import { KEYMAP } from 'settings/constants/keymap';
import { DEFAULT_ACCOUNT_TYPE, DEFAULT_CURRENCY_KEY } from 'settings/constants/registration';
import { formatArrayKeys, formatKeys } from './formatter';

import { get } from './lodash';
import { encrypt } from './crypto';

export const formatAccountBody = state => {
  const pin = get(state, 'pin', '');
  const expiryYear = get(state, 'year', '');
  const expiryMonth = get(state, 'month', '');
  const accountType = get(state, 'accountType', '');
  const currencyCode = get(state, 'currencyCode', '');
  const accountNumber = get(state, 'accountNumber', '');
  const creditCardNumber = get(state, 'creditCardNumber', '');

  return accountType === DEFAULT_ACCOUNT_TYPE
    ? {
        accountType,
        currencyCode,
        registerInfo: { registerNumber: accountNumber, pin, expiryMonth: '', expiryYear: '' },
      }
    : {
        accountType,
        currencyCode: '',
        registerInfo: { registerNumber: creditCardNumber, pin, expiryMonth, expiryYear },
      };
};

const formatImages = images =>
  Array.isArray(images) &&
  images.map(item => {
    const key = get(item, 'key', '');
    const value = get(item, 'value', '');
    return { value: key, src: `${process.env.REACT_APP_FILE_URL}/${value}` };
  });

// Combine request body to use in user verification API call
export const formatPinResult = (res, body) => {
  const mobiles = get(res, 'mobileNoDisplayMap', []);
  const captchas = get(res, 'securityImageRandomMap', []);

  return {
    referralNumber: get(res, 'referralNumber', null),
    email: get(res, 'ibsEmail', ''),
    branchCode: get(res, 'branchCode', ''),
    currencyCode: get(res, 'currencyCode', ''),
    mobileNumbers: get(res, 'mobileNoMap', []),
    displayMobiles: formatArrayKeys(mobiles),
    securityImages: formatImages(captchas),
    accountType: get(body, 'registrationType', ''),
    registerInfo: get(body, 'encRegistrationData', ''),
  };
};

export const formatProfileBody = (state, userDetail) => {
  return {
    userInfo: {
      username: get(state, 'username', ''),
      password: get(state, 'confirmPassword', ''),
    },
    mobileNumber: get(state, 'mobileNumber', ''),
    selectedMobile: get(state, 'selectedMobile', ''),
    selectedImage: get(state, 'selectedImage', ''),
    branchCode: get(userDetail, 'branchCode', ''),
    accountType: get(userDetail, 'accountType', ''),
    currencyCode: get(userDetail, 'currencyCode', ''),
    registerInfo: get(userDetail, 'registerInfo', ''),
    mobileNumbers: get(userDetail, 'mobileNumbers', ''),
  };
};

export const formatCredentialBody = (payload, locale) => {
  const accountType = get(payload, 'accountType', '');
  const branchCode = get(payload, 'branchCode', '');
  const registerInfo = get(payload, 'registerInfo', '');
  const currencyCode = get(payload, 'currencyCode', '');
  const userInfo = get(payload, 'userInfo', '');
  const mobileNumber = get(payload, 'mobileNumber', '');
  const mobileNumbers = get(payload, 'mobileNumbers', '');

  return {
    locale,
    accountType,
    registerInfo,
    userInfo,
    branchCode,
    currencyCode,
    mobileNumbers,
    mobileNumber,
  };
};

export const formatCredentialResult = (result, payload, userAlias) => {
  const tacBean = get(result, 'tacBean', {});
  const userInfo = get(payload, 'userInfo', {});
  const renamedUserInfo = formatKeys(userInfo, KEYMAP);
  // Its better to save userInfo as encrypted since it have username and password
  const encryptedUserInfo = encrypt(JSON.stringify(renamedUserInfo));
  return {
    userAlias,
    encryptedUserInfo,
    tacToken: get(result, 'vToken', ''),
    mobileNumber: get(payload, 'mobileNumber', ''),
    selectedImage: get(payload, 'selectedImage', ''),
    tacDetail: {
      amount: get(tacBean, 'amount', ''),
      beneName: get(tacBean, 'beneName', ''),
      toAccount: get(tacBean, 'toAccount', ''),
      serviceName: get(tacBean, 'serviceName', ''),
      fromAccount: get(tacBean, 'fromAccount', ''),
      tacMobileNumber: get(tacBean, 'tacMobileNo', ''),
    },
  };
};

// Destruct & return body to use inside saga
export const getRequestTacBody = (body, locale) => {
  const userAlias = get(body, 'userAlias', '');
  const tacDetail = get(body, 'tacDetail', '');
  return { locale, tacDetail, userAlias: encrypt(JSON.stringify({ userAlias })) };
};

export const formatConfirmRegisterBody = (pinResult, credentialResult, tacResult) => {
  const selectedImage = get(credentialResult, 'tacDetail.selectedImage', '');
  const encryptedUserInfo = get(credentialResult, 'tacDetail.encryptedUserInfo', {});
  const accountType = get(pinResult, 'userDetail.accountType', '');
  const registerInfo = get(pinResult, 'userDetail.registerInfo', '');
  const branchCode = get(pinResult, 'userDetail.branchCode', '');
  const currencyCode = get(pinResult, 'userDetail.currencyCode', DEFAULT_CURRENCY_KEY);
  const mobileNumbers = get(pinResult, 'userDetail.mobileNumbers', []);
  const mobileNumber = get(credentialResult, 'tacDetail.mobileNumber', '');

  const referralNumber = get(pinResult, 'userDetail.referralNumber', '');
  const tacToken = get(credentialResult, 'tacDetail.tacToken', '');
  const SMSServiceResponse = get(tacResult, 'responseDetail.tacViewBean.restSMSService', {});

  return {
    selectedImage,
    encryptedUserInfo,
    accountType,
    registerInfo,
    branchCode,
    currencyCode,
    mobileNumbers,
    mobileNumber,
    referralNumber,
    tacToken,
    SMSServiceResponse,
  };
};
