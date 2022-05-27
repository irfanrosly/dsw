import { FormattedMessage } from 'react-intl';

import { DASHBOARD_PATH, DIGITAL_WEALTH_PATH, TRANSACTION_PATH } from 'settings/constants/common';

import Icon from 'components/common/Icon';

// main global navigation
export const HEADER_NAVIGATION_LINKS = [
  { label: <FormattedMessage id="dashboard.header.topNavigation.digitalWealth" />, value: DIGITAL_WEALTH_PATH },
  { label: <FormattedMessage id="dashboard.header.topNavigation.myAccount" />, value: DASHBOARD_PATH },
  { label: <FormattedMessage id="dashboard.header.topNavigation.transaction" />, value: TRANSACTION_PATH },
];
export const PROFILE_LINKS = [
  {
    label: <FormattedMessage id="dashboard.sidebar.topNavigation.settings" />,
    value: 'settings',
    icon: <Icon isAssetIcon={false} type="settings" />,
  },
  {
    label: <FormattedMessage id="dashboard.sidebar.topNavigation.logout" />,
    value: 'logout',
    icon: <Icon isAssetIcon type="logout" />,
  },
];
