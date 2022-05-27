import isEmpty from 'lodash/isEmpty';
import { FormattedMessage } from 'react-intl';

import { get } from 'utils/lodash';
import { encrypt } from 'utils/crypto';
import { isLengthValid, hasUpperCase, hasLowerCase, hasNumber, hasNoSpace, isNewPasswordValid } from 'utils/validation';

import { CHANGE_PASSWORD_MIN_LENGTH } from 'settings/constants/settings';

export const getChangePasswordDynamicField = (state, checklistValidators) => {
  const oldPassword = get(state, 'oldPassword', '');
  const newPassword = get(state, 'newPassword', '');
  const confirmNewPassword = get(state, 'confirmNewPassword', '');
  return [
    {
      name: 'oldPassword',
      hasPeekButton: !isEmpty(oldPassword),
    },
    {
      name: 'newPassword',
      hasPeekButton: !isEmpty(newPassword),
    },
    {
      name: 'confirmNewPassword',
      hasPeekButton: !isEmpty(confirmNewPassword),
      // false if new password not entered
      readOnly: !isNewPasswordValid(checklistValidators),
      // only validate if there is a value on newPassword
      validationRules: [
        { type: 'required', isValidateRequired: isNewPasswordValid(checklistValidators) },
        { type: 'validPasswordMatch', password: newPassword, isValidateRequired: isNewPasswordValid(checklistValidators) },
      ],
    },
  ];
};

export const getPasswordValidatorMapper = password => [
  {
    type: 'length',
    hasValidation: true,
    isValid: isLengthValid(password, CHANGE_PASSWORD_MIN_LENGTH),
    message: <FormattedMessage id="settings.security.changePassword.newPasswordCriteria.length" />,
  },
  {
    type: 'uppercase',
    hasValidation: true,
    isValid: hasUpperCase(password),
    message: <FormattedMessage id="settings.security.changePassword.newPasswordCriteria.uppercase" />,
  },
  {
    type: 'lowercase',
    hasValidation: true,
    isValid: hasLowerCase(password),
    message: <FormattedMessage id="settings.security.changePassword.newPasswordCriteria.lowercase" />,
  },
  {
    type: 'number',
    hasValidation: true,
    isValid: hasNumber(password),
    message: <FormattedMessage id="settings.security.changePassword.newPasswordCriteria.number" />,
  },
  {
    type: 'space',
    hasValidation: true,
    isValid: hasNoSpace(password),
    message: <FormattedMessage id="settings.security.changePassword.newPasswordCriteria.space" />,
  },
  {
    type: 'userId',
    hasValidation: false,
    message: <FormattedMessage id="settings.security.changePassword.newPasswordCriteria.userId" />,
  },
  {
    type: 'previousPassword',
    hasValidation: false,
    message: <FormattedMessage id="settings.security.changePassword.newPasswordCriteria.previousPassword" />,
  },
  {
    type: 'characters',
    hasValidation: false,
    message: <FormattedMessage id="settings.security.changePassword.newPasswordCriteria.characters" />,
  },
];

export const getPasswordSubmitPayload = ({ userId, tacValue, tacResult, state }) => {
  const oldPassword = get(state, 'oldPassword', '');
  const newPassword = get(state, 'newPassword', '');

  return {
    userId,
    tacValue,
    encPasswordData: encrypt(JSON.stringify({ oldPassword, newPassword })),
    restSMSService: get(tacResult, 'tacViewBean.restSMSService', {}),
  };
};
