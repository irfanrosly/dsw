import isEmpty from 'lodash/isEmpty';

import { get } from 'utils/lodash';

import { M2U_THEME } from 'settings/constants/settings';
import { DEFAULT_LOCALE } from 'settings/constants/language';

const { NATURE, CITY, TIGER, ABSTRACT } = M2U_THEME;

const THEMES = new Map([
  [TIGER, 'tiger'],
  [CITY, 'city'],
  [ABSTRACT, 'abstract'],
  [NATURE, 'nature'],
  ['default', ''],
]);

const THEME_KEYS = new Map([
  ['city', CITY],
  ['tiger', TIGER],
  ['nature', NATURE],
  ['abstract', ABSTRACT],
  ['default', ''],
]);

export const getThemeName = (key = 'default') => THEMES.get(key);
export const getThemeKey = (name = 'default') => THEME_KEYS.get(name);

export const getCustomerProfile = customerProfile => {
  const displayName = get(customerProfile, 'userDisplayName', '');
  const fullname = get(customerProfile, 'userName', '');

  return {
    fullname,
    displayName,
    userId: get(customerProfile, 'userId', ''),
    userDob: get(customerProfile, 'userDobBrd', ''),
    language: get(customerProfile, 'language', DEFAULT_LOCALE),
    headerImageLink: get(customerProfile, 'headerImageLink', ''),
    greetingName: isEmpty(displayName) ? fullname : displayName,
  };
};

export const getTacDetail = detail => ({
  tacTimestamp: get(detail, 'tacSentDateTime', ''),
  isTacRequestSuccess: get(detail, 'isSuccess', false),
});

export const getImageSubmitPayload = ({ userId, tacValue, tacResult, state, images }) => {
  const selectedImage = get(state, 'selectedImage', '');
  const securityImage = images.find(image => image.value === selectedImage);
  return {
    userId,
    tacValue,
    securityImage: get(securityImage, 'key', ''),
    restSMSService: get(tacResult, 'tacViewBean.restSMSService', {}),
  };
};
