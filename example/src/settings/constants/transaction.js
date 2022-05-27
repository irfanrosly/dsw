import { FormattedMessage } from 'react-intl';

export const OFFLINE_VALUE = 'OFFLINE';

// none refers to placeholder value if theres none selected
export const DEFAULT_CURRENCY_OPTION = 'none';

export const TRANSACTION_PAYMENT_TAB_VALUE = 'payment';
export const TRANSACTION_TRANSFER_TAB_VALUE = 'transfer';
export const TRANSACTION_PURCHASE_TAB_VALUE = 'purchase';
export const INITIAL_TRANSACTION_TAB = TRANSACTION_PAYMENT_TAB_VALUE;

export const DEFAULT_SENDER_ACCOUNT = '0';
export const DEFAULT_TRANSFER_TYPE_VALUE = '';
export const MINIMUM_ACCOUNT_OWNED = 1;

// Transfer to Value
export const OWN_ACCOUNT = '1';
export const INTRABANK = '2';
export const INTERBANK = '3';
export const E_WALLET = '4';
export const SKN_TRANSFER = '5';
export const RTGS_TRANSFER = '6';
export const VIRTUAL_ACCOUNT = '7';
export const SWIFT_TRANSFER = '8';
export const WESTERN_UNION = '9';

export const IDR_ONLY_TRANSFERS = [INTERBANK, VIRTUAL_ACCOUNT];
export const WITHOUT_BANK_SELECTIONS = [INTRABANK, VIRTUAL_ACCOUNT];

// Transfer mode
export const TRANSFER_NOW = '1';
export const TRANSFER_FUTURE = '2';
export const TRANSFER_RECURRING = '3';
export const TRANSFER_RECURRING_WEEKLY = 'W';
export const TRANSFER_RECURRING_MONTHLY = 'M';

export const TRANSFER_FREQUENCIES = [
  {
    value: TRANSFER_RECURRING_MONTHLY,
    label: <FormattedMessage id="transaction.transfer.monthly" />,
  },
  {
    value: TRANSFER_RECURRING_WEEKLY,
    label: <FormattedMessage id="transaction.transfer.weekly" />,
  },
];

// Transfer date selection
export const TRANSFER_ONE_TIME_MAX_DURATION = 1; // 1 month
export const TRANSFER_RECURRING_MAX_YEAR = 2;
export const TRANSFER_RECURRING_MAX_MONTH = 12;
export const TRANSFER_RECURRING_MAX_DAY = 31;

// Transfer amount
export const DEFAULT_MIN_TRANSFER_AMOUNT = '1';
export const DEFAULT_MAX_TRANSFER_AMOUNT = '999999999999.99';

// SKN constants
export const DEFAULT_SOURCE_OF_FUND = '1';
export const DEFAULT_TRANSACTION_PURPOSE = '0';
export const DEFAULT_BENEFICIARY_TYPE = '1';
export const DEFAULT_BENEFICIARY_CITIZEN_STATUS = '1';
export const SKN_MAXIMUM_AMOUNT_LENGTH = '12';
export const SKN_RTGS_DEFAULT_ADDRESS = 'Indonesia';

// message field max chars
export const DEFAULT_TEXTFIELD_MAX_CHARS = 64;
export const MESSAGE_INPUT_MAX_CHARS = 40;
export const BENEFICIARY_NAME_MAX_CHARS = 64;
export const EMAIL_MAX_CHARS = 40;
export const BENEFICIARY_ADDRESS_MAX_LENGTH = 35;
export const PURCHASE_OTHER_BILLS_MSG_MAX_LENGTH = 120;

export const RECURRING_DISABLED_DATES = [29, 30, 31];
export const HOLIDAY_DATE_FORMAT = 'YYYY-MM-DD';
export const CONFIRMATION_DETAIL_DATE_FORMAT = 'DD/MM/YYYY';
export const CONFIRMATION_DETAIL_EMPTY_LABEL = '-';
export const CUTOFF_TIME_FORMAT = 'HHmm';
export const CUTOFF_TIME_DISPLAY_FORMAT = 'H.mm';
export const SWIFT_CUTOFF_TIME_DISPLAY_FORMAT = 'h.mm A';

// Operation Hour if not provided by API
export const DEFAULT_OPERATION_START_TIME = '0800';
export const DEFAULT_OPERATION_END_TIME = '1400';
export const SWIFT_OPERATION_START_TIME = '0400';
export const SWIFT_OPERATION_END_TIME = '1300';

// 10 minutes
export const CUTOFF_COUNTDOWN_TIMER = 10;

export const DEFAULT_CURRENCY_EXCHANGE_RATE = 1;

// FORM field type
export const FIELD_TYPE_TEXT = 'text';
export const FIELD_TYPE_NUMBER = 'number';
export const FIELD_TYPE_SWITCH = 'switch';
export const FIELD_TYPE_SELECT = 'select';
export const FIELD_TYPE_DATE = 'date';
export const FIELD_TYPE_ACCORDION = 'accordion';
export const FIELD_TYPE_AUTOCOMPLETE = 'autocomplete';
export const FIELD_TYPE_SECTION_HEADER = 'sectionHeader';
export const FIELD_TYPE_PASSWORD = 'password';

export const FORMAT_NUMBER = 'number';
export const FORMAT_MOBILE_NUMBER = 'mobileNumber';
export const FORMAT_ALPHANUMERIC = 'alphanumeric';
export const FORMAT_BENEFICIARY_NAME = 'beneficiaryName';
export const FORMAT_FAVOURITE_NICKNAME = 'favouriteNickname';
export const FORMAT_PASSWORD_CHARACTER = 'passwordCharacter';
export const FORMAT_ALPHABET_WITH_SPACE = 'alphabetWithSpace';
export const FORMAT_ALPHANUMERIC_WITHOUT_SPACE = 'alphanumericNoSpace';
export const FORMAT_ALPHANUMERIC_WITH_SPACE_DOT = 'alphanumericWithSpaceDot';

export const HAS_OPTION_GRID_SIZE = 9;
export const NO_OPTION_GRID_SIZE = 12;

// unit of years old
export const BENEFICIARY_MIN_AGE = 18;
export const BENEFICIARY_MAX_AGE = 90;

export const BANK_NAME_MIN_LENGTH = 3;

export const FAVOURITE_NICKNAME_MIN_LENGTH = 3;
export const FAVOURITE_NICKNAME_MAX_LENGTH = 50;

// PAYMENT TO VALUE
export const PAYMENT_CREDIT_CARD = '1';
export const MOBILE_POSTPAID = '2';
export const PAYMENT_UTILITY = '3';
export const PAYMENT_OTHER_BILL = '4';

export const DEFAULT_UTILITY_PAYEE = 0;

export const UTILITY_PAYEE = { TELKOM: '000200', PAM_PALYJA: '001810', PLN_POSTPAID: '000500', PLN_NON_TAGLIS: '002500' };

export const UTILITY_PAYEE_MIN_LENGTH = { TELKOM: 10, PAM_PALYJA: 8, PLN_POSTPAID: 10, PLN_NON_TAGLIS: 8 };

export const UTILITY_PAYEE_MAX_LENGTH = { TELKOM: 12, PAM_PALYJA: 10, PLN_POSTPAID: 12, PLN_NON_TAGLIS: 12 };

// Credit card option list
export const MAYBANK_CREDIT_CARD_KEY = '1';
// Maybank credit card option list
export const OWN_MAYBANK_CREDIT_CARD_KEY = '1';

// CC cardType
export const OWN_MAYBANK_CC = '0';
export const OTHER_MAYBANK_CC = '1';
export const OTHER_BANK_CC = '2';

// CC Payment mode list
export const CC_OUTSTANDING_BALANCE = '1';
export const CC_MINIMUM_PAYMENT = '2';
export const CC_OTHER_AMOUNT = '3';

// Min length for mobile no is 8, but count in the 2 chars prefix (08), it become 6 chars
export const MOBILE_NUMBER_MIN_LENGTH = 6;
// Max length for mobile no is 13, but count in the 2 chars prefix (08), it become 11 chars
export const MOBILE_NUMBER_MAX_LENGTH = 11;
// Min length for mobile no. with prefix selection (4 initial digits), it becomes 4 chars
export const MOBILE_NUMBER_WITH_PREFIX_MIN_LENGTH = 4;
// Max length for mobile no. with prefix selection (4 initial digits), it becomes 9 chars
export const MOBILE_NUMBER_WITH_PREFIX_MAX_LENGTH = 9;

// Purchase to value
export const PURCHASE_PREPAID = '1';
export const PURCHASE_PLN_RELOAD = '2';
export const PURCHASE_TICKET = '3';

// OTHER BILL FORM
export const AMOUNT_TYPE_FREE_INPUT = 0;
export const AMOUNT_TYPE_SELECT = 1;
export const AMOUNT_TYPE_VA_INPUT = 3;

// Mobile Prepaid purchase billAccountValueType
export const MOBILE_TYPE_FREE_INPUT = '0';
export const MOBILE_TYPE_PREFIX_SELECT = '1';
export const MOBILE_TYPE_FIX_INPUT = '2';

// Purchase - mobile number prefix split index
export const MOBILE_PREFIX_START_POSITION = 0;
export const MOBILE_PREFIX_END_POSITION = 2;

export const FAVOURITE_MENU_ITEMS = [
  { label: <FormattedMessage id="buttonText.edit" />, option: 'edit' },
  { label: <FormattedMessage id="buttonText.delete" />, option: 'delete' },
];

// Maintenance transfer type
export const MAINTENANCE_INTRABANK = '2';
export const MAINTENANCE_INTERBANK = '3';
export const MAINTENANCE_EWALLET = '4';
export const MAINTENANCE_RTGS = '5';
export const MAINTENANCE_SKN = '6';
export const MAINTENANCE_SWIFT = '7';
export const MAINTENANCE_VIRTUAL_ACCOUNT = '8';
