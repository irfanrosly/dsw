import { FormattedMessage } from 'react-intl';

import ThemeContainer from 'container/settings/personal/Theme';
import PersonalInfoContainer from 'container/settings/personal/Info';
import SecurityImageContainer from 'container/settings/security/SecurityImage';
import ChangePasswordContainer from 'container/settings/security/ChangePassword';

export const SETTINGS_PERSONAL_CONTENT = ({ userId }) => [
  {
    value: 0,
    label: <FormattedMessage id="settings.personal.personalInfo" />,
    content: <PersonalInfoContainer userId={userId} />,
  },
  { value: 1, label: <FormattedMessage id="settings.personal.theme" />, content: <ThemeContainer userId={userId} /> },
];

export const SETTINGS_SECURITY_CONTENT = ({
  userId,
  state,
  access,
  fields,
  images,
  mainNote,
  setState,
  securityImage,
  isAccessSuccess,
  handleGetImages,
  handleSaveAction,
  checklistValidators,
}) => [
  {
    value: 0,
    label: <FormattedMessage id="settings.security.changePassword.label" />,
    content: (
      <ChangePasswordContainer
        userId={userId}
        fields={fields}
        formDetail={state}
        onChange={setState}
        mainNote={mainNote}
        isAccessSuccess={isAccessSuccess}
        onChangePassword={handleSaveAction}
        checklistValidators={checklistValidators}
      />
    ),
  },
  {
    value: 1,
    label: <FormattedMessage id="settings.security.securityImage.label" />,
    content: (
      <SecurityImageContainer
        userId={userId}
        state={state}
        access={access}
        images={images}
        onChange={setState}
        securityImage={securityImage}
        onGetImages={handleGetImages}
        onChangeImage={handleSaveAction}
      />
    ),
  },
];
