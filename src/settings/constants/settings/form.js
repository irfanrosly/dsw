import { DEFAULT_LOCALE } from 'settings/constants/language';
import { CHANGE_PASSWORD_MAX_LENGTH } from 'settings/constants/settings';
import { PERSONAL_INFO_DISPLAY_NAME_MAX_LENGTH } from 'settings/constants/common';
import {
  FIELD_TYPE_TEXT,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_PASSWORD,
  FORMAT_PASSWORD_CHARACTER,
  FORMAT_ALPHANUMERIC_WITH_SPACE_DOT,
} from 'settings/constants/transaction';

export const SETTINGS_FORM_DETAIL = {
  newPassword: '',
  oldPassword: '',
  confirmNewPassword: '',
  fullName: '',
  displayName: '',
  languageList: [],
  language: DEFAULT_LOCALE,
};

export const CHANGE_PASSWORD_FORM_FIELDS = [
  {
    name: 'oldPassword',
    type: FIELD_TYPE_PASSWORD,
    maxLength: CHANGE_PASSWORD_MAX_LENGTH,
    label: 'settings.security.changePassword.currentPassword',
    placeholder: 'settings.security.changePassword.enterCurrentPassword',
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    name: 'newPassword',
    type: FIELD_TYPE_PASSWORD,
    format: FORMAT_PASSWORD_CHARACTER,
    maxLength: CHANGE_PASSWORD_MAX_LENGTH,
    label: 'settings.security.changePassword.newPassword',
    placeholder: 'settings.security.changePassword.enterNewPassword',
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    readOnly: true,
    name: 'confirmNewPassword',
    type: FIELD_TYPE_PASSWORD,
    format: FORMAT_PASSWORD_CHARACTER,
    maxLength: CHANGE_PASSWORD_MAX_LENGTH,
    label: 'settings.security.changePassword.confirmNewPassword',
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
];

export const PERSONAL_INFO_FORM_FIELDS = [
  {
    name: 'displayName',
    label: 'settings.personal.displayName',
    type: FIELD_TYPE_TEXT,
    format: FORMAT_ALPHANUMERIC_WITH_SPACE_DOT,
    maxLength: PERSONAL_INFO_DISPLAY_NAME_MAX_LENGTH,
    validationRules: [{ type: 'required', isValidateRequired: true }],
  },
  {
    name: 'fullName',
    label: 'settings.personal.name',
    isForm: false,
    className: 'gray b',
    type: FIELD_TYPE_TEXT,
  },
  {
    name: 'language',
    label: 'settings.personal.language',
    type: FIELD_TYPE_SELECT,
  },
];
