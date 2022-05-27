/* eslint-disable react/display-name */
import {
  FORMAT_NUMBER,
  FIELD_TYPE_TEXT,
  FIELD_TYPE_DATE,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_SWITCH,
  FIELD_TYPE_NUMBER,
  FIELD_TYPE_PASSWORD,
  FIELD_TYPE_AUTOCOMPLETE,
  FIELD_TYPE_SECTION_HEADER,
} from 'settings/constants/transaction';

import DynoDate from 'components/dyno-template/Date';
import DynoSelect from 'components/dyno-template/Select';
import DynoSwitch from 'components/dyno-template/Switch';
import DynoTextfield from 'components/dyno-template/TextField';
import DynoNumberField from 'components/dyno-template/NumberField';
import DynoAutocomplete from 'components/dyno-template/Autocomplete';
import DynoSectionHeader from 'components/dyno-template/SectionHeader';
import DynoPasswordField from 'components/dyno-template/PasswordField';

import {
  PAYMENT_CODE_MIN_LENGTH,
  PAYMENT_CODE_MAX_LENGTH,
  OTHER_BILL_ACCOUNT_MAX_LENGTH,
  OTHER_BILL_ACCOUNT_MIN_LENGTH,
  OTHER_BILL_REFERENCE_NUMBER_MAX_LENGTH,
  OTHER_BILL_REFERENCE_NUMBER_MIN_LENGTH,
} from './common';

export const ACCOUNT_DISPLAY_TYPE_REQUIRED = '0';

// other bill confirmation display receiverAccount
export const DISPLAY_RECEIVER_ACCOUNT = '0';

export const DYNAMIC_FIELD = {
  [FIELD_TYPE_SELECT]: props => <DynoSelect {...props} />,
  [FIELD_TYPE_SWITCH]: props => <DynoSwitch {...props} />,
  [FIELD_TYPE_TEXT]: props => <DynoTextfield {...props} />,
  [FIELD_TYPE_NUMBER]: props => <DynoNumberField {...props} />,
  [FIELD_TYPE_PASSWORD]: props => <DynoPasswordField {...props} />,
  [FIELD_TYPE_AUTOCOMPLETE]: props => <DynoAutocomplete {...props} />,
  [FIELD_TYPE_SECTION_HEADER]: props => <DynoSectionHeader {...props} />,
  [FIELD_TYPE_DATE]: (props, isRecurring) => <DynoDate {...props} isRecurring={isRecurring} />,
};

export const DEFAULT_CUSTOMER_NUMBER_FIELD = {
  name: 'customerNumber',
  isHidden: false,
  // validationRules are inside dynamic-fields
};

export const DEFAULT_REFERENCE_NUMBER_FIELD = {
  name: 'referenceNumber',
  isHidden: false,
  validationRules: [
    { type: 'required', isValidateRequired: true },
    {
      type: 'validReferenceNumber',
      isValidateRequired: true,
      minLength: OTHER_BILL_REFERENCE_NUMBER_MIN_LENGTH,
      maxLength: OTHER_BILL_REFERENCE_NUMBER_MAX_LENGTH,
    },
  ],
};

export const DEFAULT_AMOUNT_FIELD = {
  label: 'transaction.payment.modal.amount',
  type: FIELD_TYPE_NUMBER,
  isHidden: false,
  validationRules: [{ type: 'required', isValidateRequired: true }],
};

export const DEFAULT_MESSAGE_FIELD = {
  name: 'message',
  label: 'transaction.payment.otherBill.message',
  isHidden: false,
};

export const DEFAULT_MOBILE_NUMBER_FIELD = {
  name: 'mobileNumber',
  label: 'transaction.payment.modal.mobileNumber',
  type: FIELD_TYPE_TEXT,
  format: FORMAT_NUMBER,
  isHidden: false,
};
