import Icon from 'components/common/Icon';

export const DEFAULT_LOCALE = 'en';
export const INDONESIA_LOCALE = 'id';

export const LANGUAGE_OPTIONS = [
  {
    label: (
      <span className="inline--icon">
        <Icon isAssetIcon type="langID" />
        ID
      </span>
    ),
    value: 'id',
  },
  {
    label: (
      <span className="inline--icon">
        <Icon isAssetIcon type="langEN" />
        EN
      </span>
    ),
    value: 'en',
  },
];
