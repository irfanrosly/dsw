import moment from 'moment-timezone';
import isEmpty from 'lodash/isEmpty';
import { FormattedMessage } from 'react-intl';

import { Link } from 'components/common';

import { get } from 'utils/lodash';
import { findArrayEntry } from 'utils/array';
import { getMedianDate, getMinDate } from 'utils/date-time';
// eslint-disable-next-line import/no-cycle
import { getExchangeRatesDisplay, getOnetimeLabel } from 'utils/transaction';

import {
  FIELD_TYPE_TEXT,
  FIELD_TYPE_DATE,
  CUTOFF_TIME_FORMAT,
  BENEFICIARY_MAX_AGE,
  BENEFICIARY_MIN_AGE,
  FORMAT_BENEFICIARY_NAME,
  SWIFT_OPERATION_END_TIME,
  SWIFT_OPERATION_START_TIME,
  BENEFICIARY_NAME_MAX_CHARS,
  SWIFT_CUTOFF_TIME_DISPLAY_FORMAT,
  FORMAT_ALPHANUMERIC_WITHOUT_SPACE,
} from 'settings/constants/transaction';
import { CURRENCY_CHF, CURRENCY_JPY } from 'settings/constants/common';
import { DEFAULT_LLD_CATEGORY, LLD_DESCRIPTION_MAP, LLD_INFO } from 'settings/constants/transfer/swift';

const getSelectedBank = (banks, code, onClick) => {
  const selectedBank = banks.find(item => item.swiftCode === code);
  onClick(selectedBank);
};

export const getSwiftOperationHour = res => {
  const endTime = get(res, 'serviceInfoBean.operationEndTime', SWIFT_OPERATION_END_TIME);
  const startTime = get(res, 'serviceInfoBean.operationStartTime', SWIFT_OPERATION_START_TIME);

  // force EN format to display correct meridiem
  return {
    swiftEndTime: moment(endTime, CUTOFF_TIME_FORMAT).locale('en').format(SWIFT_CUTOFF_TIME_DISPLAY_FORMAT),
    swiftStartTime: moment(startTime, CUTOFF_TIME_FORMAT).locale('en').format(SWIFT_CUTOFF_TIME_DISPLAY_FORMAT),
  };
};

// To display in the swift bank table
export const getSwiftBanks = (res, onClick) => {
  const swiftBanks = get(res, 'banks', []);
  return swiftBanks.map(item => {
    const bankName = get(item, 'bankName', '');
    const swiftCode = get(item, 'swiftCode', '');
    const firstAddress = get(item, 'address1', '');
    const secondAddress = get(item, 'address2', '');
    const thirdAddress = get(item, 'address3', '');
    return {
      bankName,
      firstAddress,
      secondAddress,
      thirdAddress,
      swiftCode: <Link onClick={() => getSelectedBank(swiftBanks, swiftCode, onClick)} label={swiftCode} className="swift-label" />,
    };
  });
};

// populate bank beneficiary address
export const getBeneficiaryBankDetail = detail => ({
  beneficiaryBankName: get(detail, 'toForeignBankName', ''),
  beneficiaryBankOID: get(detail, 'toForeignBankOID', ''),
  beneficiaryBankSwiftCode: get(detail, 'toForeignBankCode', ''),
  beneficiaryBankAddress1: get(detail, 'toForeignBankAddress1', ''),
  beneficiaryBankAddress2: get(detail, 'toForeignBankAddress2', ''),
  beneficiaryBankCountry: get(detail, 'toForeignBankCountry', ''),
});

export const getLldDynamicFields = (purpose = {}) => {
  const category = get(purpose, 'key', DEFAULT_LLD_CATEGORY);
  const descriptionKey = LLD_DESCRIPTION_MAP.get(category);
  return [{ name: 'lldDescription', options: LLD_INFO.description[descriptionKey] ?? [] }];
};

// for dynamic dropdown from api
export const getSwiftDynamicFields = detail => {
  const currencies = get(detail, 'currencies', []);
  const transactionCharges = get(detail, 'transactionCharges', []);
  const currency = get(detail, 'currency', '');

  const beforeBirthday = getMinDate(BENEFICIARY_MAX_AGE, 'years');
  const afterBirthday = getMinDate(BENEFICIARY_MIN_AGE, 'years');
  const currentBirthdayMonth = getMedianDate(beforeBirthday, afterBirthday);

  const isJPYCurrency = currency === CURRENCY_JPY;
  const isCHFCurrency = currency === CURRENCY_CHF;
  const bottomLabel = isJPYCurrency ? 'transaction.transfer.swift.modal.jpyBottomLabel' : '';

  return [
    {
      name: 'transferAmount',
      hasOption: true,
      bottomLabel,
      allowDecimal: !isJPYCurrency,
      optionField: {
        options: currencies,
        name: 'currency',
        validationRules: [{ type: 'required', isValidateRequired: true }],
      },
    },
    { name: 'transactionCharges', options: transactionCharges },
    {
      name: 'beneficiaryInfo',
      fields: [
        {
          name: 'beneficiaryName',
          label: 'transaction.transfer.beneficiary.name',
          type: FIELD_TYPE_TEXT,
          format: FORMAT_BENEFICIARY_NAME,
          maxLength: BENEFICIARY_NAME_MAX_CHARS,
          validationRules: [{ type: 'required', isValidateRequired: true }],
        },
        {
          name: 'beneficiaryID',
          label: 'transaction.transfer.swift.modal.idNumber',
          type: FIELD_TYPE_TEXT,
          isDisplay: isCHFCurrency,
          format: FORMAT_ALPHANUMERIC_WITHOUT_SPACE,
          validationRules: [{ type: 'required', isValidateRequired: isCHFCurrency }],
        },
        {
          name: 'beneficiaryDateOfBirth',
          label: 'transaction.transfer.swift.modal.dateOfBirth',
          type: FIELD_TYPE_DATE,
          hasYearList: true,
          hasLeftLabel: false,
          disabledBeforeDate: beforeBirthday,
          disabledAfterDate: afterBirthday,
          currentMonth: currentBirthdayMonth,
          isDisplay: isCHFCurrency,
          validationRules: [{ type: 'required', isValidateRequired: isCHFCurrency }],
        },
      ],
    },
  ];
};

export const getSwiftBeneficiaries = ({ confirmationDetail, referenceNumber, isResultSuccess }) => {
  const dateLabel = getOnetimeLabel(confirmationDetail);
  const dateBirth = get(confirmationDetail, 'dateBirth', '');
  const identityNumber = get(confirmationDetail, 'identityNo', '');

  const receiverInfos = [
    { title: <FormattedMessage id="transaction.transfer.swift.modal.dateOfBirth" />, info: dateBirth },
    { title: <FormattedMessage id="transaction.transfer.identityNumber" />, info: identityNumber },
  ];

  const firstBeneficiaries = [
    { title: <FormattedMessage id="transaction.transfer.transactionCharges" />, info: get(confirmationDetail, 'transCharges', '') },
    {
      title: <FormattedMessage id="transaction.transfer.beneficiary.swiftCode" />,
      info: get(confirmationDetail, 'toForeignBankSwiftCode', ''),
    },
    { title: <FormattedMessage id="transaction.transfer.beneficiary.bank" />, info: get(confirmationDetail, 'toForeignBankName', '') },
    {
      title: <FormattedMessage id="transaction.transfer.beneficiary.bankAddress" />,
      info: get(confirmationDetail, 'toForeignBankAddress1', ''),
    },
    { title: '', info: get(confirmationDetail, 'toForeignBankAddress2', '') },
    {
      title: <FormattedMessage id="transaction.transfer.beneficiary.bankCountry" />,
      info: get(confirmationDetail, 'toCountryDisplay', ''),
    },
    { title: <FormattedMessage id="transaction.transfer.beneficiary.name" />, info: get(confirmationDetail, 'toName', '') },
  ];

  const secondBeneficiaries = [
    { title: <FormattedMessage id="transaction.transfer.beneficiary.address" />, info: get(confirmationDetail, 'toAddress1', '') },
    {
      title: <FormattedMessage id="transaction.transfer.effectiveDate" />,
      info: (
        <span>
          {dateLabel}
          <span className="gray pl1">{get(confirmationDetail, 'effectiveDateDisplay', '')}</span>
        </span>
      ),
    },
    { title: <FormattedMessage id="transaction.transfer.message" />, info: get(confirmationDetail, 'message', '') },
    { title: <FormattedMessage id="transaction.transfer.beneficiary.email" />, info: get(confirmationDetail, 'toEmailAddress', '') },
  ];

  const defaultDetails = firstBeneficiaries.concat(secondBeneficiaries);
  const chfDetails = firstBeneficiaries.concat(receiverInfos).concat(secondBeneficiaries);
  const details = isEmpty(dateBirth) && isEmpty(identityNumber) ? defaultDetails : chfDetails;

  return isResultSuccess
    ? [...details, { title: <FormattedMessage id="transaction.transfer.referenceNumber" />, info: referenceNumber }]
    : details;
};

export const getSwiftMonetaries = detail => {
  const exchangeRateDisplay = getExchangeRatesDisplay(get(detail, 'exchangeRate', []), 'transaction.transfer.exchangeRate');
  return [
    { title: <FormattedMessage id="transaction.transfer.transactionAmount" />, info: get(detail, 'toAmountDis', '') },
    { title: <FormattedMessage id="transaction.transfer.transactionFee" />, info: get(detail, 'chargeAmountDis', '') },
    { title: <FormattedMessage id="transaction.transfer.totalDebit" />, info: get(detail, 'debitAmountDis', '') },
    { title: <FormattedMessage id="transaction.transfer.localDebitedAmount" />, info: get(detail, 'localAmountDis', '') },
  ].concat(exchangeRateDisplay);
};

export const getSwiftReceiverInfo = detail => {
  return {
    receiverName: get(detail, 'toName', ''),
    transactionAmount: get(detail, 'toAmountDis'),
    receiverAccount: get(detail, 'toAccount', ''),
    transactionType: get(detail, 'serviceName', ''),
  };
};

const getLldLabel = (key, name) => {
  const lldDetail = findArrayEntry(get(LLD_INFO, name, []), 'key', key) ?? {};
  return get(lldDetail, 'label', '');
};

export const getSwiftLLDs = detail => {
  const transDescription = get(detail, 'transactionDescription', '-');
  const identicalStatus = get(detail, 'identicalStatus', '-');
  const citizenship = get(detail, 'beneCitizenship', '-');
  const beneficiary = get(detail, 'beneCategory', '-');
  const relationship = get(detail, 'transactorRelation', '-');

  const purpose = get(detail, 'transactionPurpose', '-');
  const description = get(detail, 'description', '-');

  return [
    { title: <FormattedMessage id="transaction.transfer.swift.lld.card.identicalStatus" />, info: identicalStatus },
    { title: <FormattedMessage id="transaction.transfer.beneficiary.citizenship" />, info: citizenship },
    { title: <FormattedMessage id="transaction.transfer.beneficiary.category" />, info: beneficiary },
    { title: <FormattedMessage id="transaction.transfer.swift.lld.card.remitterRelationship" />, info: relationship },
    { title: <FormattedMessage id="transaction.transfer.swift.lld.purpose.label" />, info: purpose },
    { title: <FormattedMessage id="transaction.transfer.swift.lld.card.description" />, info: description },
    { title: <FormattedMessage id="transaction.transfer.swift.lld.card.transDescription" />, info: transDescription },
  ];
};
