import { get } from 'utils/lodash';
import { formatArrayKeys } from 'utils/formatter';

export const getPersonalInfoDynamicFields = personalInfoAccess => [
  {
    name: 'language',
    label: 'settings.personal.language',
    options: formatArrayKeys(get(personalInfoAccess, 'languageList', [])),
  },
];
