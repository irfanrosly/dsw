import { store } from 'providers/store';

import { translate } from 'utils/i18n';

import {
  getPasswordResult,
  getSecurityImageResult,
  putPasswordResult,
  putPasswordTac,
  getPasswordTac,
  getSecurityImageTac,
  putSecurityImageTac,
  putSecurityImageResult,
} from 'middleware/actions/settings';

import { getImageSubmitPayload } from 'utils/settings/getter';
import { getPasswordSubmitPayload } from 'utils/settings/change-password/getter';

import { SETTINGS_PERSONAL_MODULE_TAB_VALUE } from 'settings/constants/settings';

const { PERSONAL_INFO, THEME, PASSWORD, SECURITY_IMAGE } = SETTINGS_PERSONAL_MODULE_TAB_VALUE;

// TODO: Add your handler
export const personalResultHandler = (type, { themeResult, personalInfoResult }) => {
  const handler = {
    [THEME]: () => themeResult,
    [PERSONAL_INFO]: () => personalInfoResult,
    default: () => {},
  };
  return (handler[type] || handler.default)();
};

export const personalAccessHandler = (type, { themeAccess }) => {
  const handler = {
    [THEME]: () => themeAccess,
    [PERSONAL_INFO]: () => {},
    default: () => {},
  };
  return (handler[type] || handler.default)();
};

export const securityResultHandler = (type, { passwordResult, securityImageResult }) => {
  const handler = {
    [PASSWORD]: () => passwordResult,
    [SECURITY_IMAGE]: () => securityImageResult,
    default: () => {},
  };
  return (handler[type] || handler.default)();
};

export const securityTacHandler = (type, { passwordTac, securityImageTac }) => {
  const handler = {
    [PASSWORD]: () => passwordTac,
    [SECURITY_IMAGE]: () => securityImageTac,
    default: () => {},
  };
  return (handler[type] || handler.default)();
};

export const securityAccessHandler = (type, { passwordAccess, imageAccess }) => {
  const handler = {
    [PASSWORD]: () => passwordAccess,
    [SECURITY_IMAGE]: () => imageAccess,
    default: () => {},
  };
  return (handler[type] || handler.default)();
};

export const securitySubmitTacHandler = (type, payload) => {
  const handler = {
    [PASSWORD]: () => {
      store.dispatch(putPasswordResult());
      store.dispatch(getPasswordResult(getPasswordSubmitPayload(payload)));
    },
    [SECURITY_IMAGE]: () => store.dispatch(getSecurityImageResult(getImageSubmitPayload(payload))),
    default: () => {},
  };
  return (handler[type] || handler.default)();
};

export const securitySaveActionHandler = (type, payload) => {
  const handler = {
    [PASSWORD]: () => {
      store.dispatch(putPasswordTac());
      store.dispatch(getPasswordTac(payload));
    },
    [SECURITY_IMAGE]: () => {
      store.dispatch(putSecurityImageTac());
      store.dispatch(getSecurityImageTac(payload));
    },
    default: () => {},
  };
  return (handler[type] || handler.default)();
};

export const securityClearDataHandler = type => {
  const handler = {
    [PASSWORD]: () => {
      store.dispatch(putPasswordTac());
      store.dispatch(putPasswordResult());
    },
    [SECURITY_IMAGE]: () => {
      store.dispatch(putSecurityImageTac());
      store.dispatch(putSecurityImageResult());
    },
    default: () => {},
  };
  return (handler[type] || handler.default)();
};

// TODO: Add your success drawer message
export const personalDrawerMessageHandler = (type, formatMessage) => {
  const handler = {
    [THEME]: () => formatMessage({ id: 'settings.message.themeChanged' }),
    // locale is not being updated in `translate`, that's why need to use formatMessage
    [PERSONAL_INFO]: () => formatMessage({ id: 'settings.message.infoChanged' }),
    default: () => '',
  };
  return (handler[type] || handler.default)();
};

export const securityDrawerMessageHandler = (type, formatMessage) => {
  const handler = {
    [PASSWORD]: () => formatMessage({ id: 'settings.message.passwordChanged' }),
    [SECURITY_IMAGE]: () => formatMessage({ id: 'settings.message.securityImageChanged' }),
    default: () => '',
  };
  return (handler[type] || handler.default)();
};
