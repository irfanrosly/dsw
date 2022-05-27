import { FormattedMessage } from 'react-intl';

// Default register account type is "Account Number (0)"
export const DEFAULT_ACCOUNT_TYPE = '0';
export const DEFAULT_CURRENCY_KEY = '016';

export const ACCOUNT_NUMBER_ACCOUNT_TYPE = '0';
export const CREDIT_CARD_ACCOUNT_TYPE = '2';

export const ACCOUNT_TYPES = [
  { name: 'register', id: 'an', value: '0', label: <FormattedMessage id="registration.form.accountType.accountNumber" /> },
  { name: 'register', id: 'cc', value: '2', label: <FormattedMessage id="registration.form.accountType.creditCard" /> },
];
