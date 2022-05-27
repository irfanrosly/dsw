import { FormattedMessage } from 'react-intl';

import { get } from 'utils/lodash';
import { findArrayEntry } from 'utils/array';
import { getOnetimeLabel, getExchangeRatesDisplay, getDisabledAfterDate, getDisabledBeforeDate } from 'utils/transaction';

import { TODAY } from 'settings/constants/calendar';
import { CURRENCY_IDR, DEFAULT_INT_ZERO } from 'settings/constants/common';
import { DEFAULT_MIN_TRANSFER_AMOUNT, DEFAULT_MAX_TRANSFER_AMOUNT } from 'settings/constants/transaction';

export const getSknDefaultValue = (list, value) => {
  return get(findArrayEntry(list, 'value', value), 'value', '');
};

export const getSknRtgsDynamicFields = (detail, senderAccount) => {
  const isRecurring = get(detail, 'isRecurring', false);
  const isTransferNowBlocked = get(detail, 'isTransferNowBlocked', false);
  const initialDate = get(detail, 'initialTransferDate', TODAY);

  const duplicateDateValue = get(detail, 'transferDate', '');
  const sourceOfFunds = get(detail, 'sourceOfFunds', []);
  const transactionPurposes = get(detail, 'transactionPurposes', []);
  const beneficiaryTypes = get(detail, 'beneficiaryTypes', []);
  const beneficiaryCitizenStatus = get(detail, 'beneficiaryCitizenTypes', []);
  const holidays = get(detail, 'holidays', []);
  const disabledStartDate = isTransferNowBlocked ? initialDate : '';

  const minAmount = get(detail, 'serviceInfoBean.minLimit', DEFAULT_INT_ZERO);
  const maxAmount = get(detail, 'serviceInfoBean.maxLimit', DEFAULT_INT_ZERO);
  const currentBalance = get(senderAccount, 'plainBalance', DEFAULT_INT_ZERO);
  const currency = get(senderAccount, 'currency', CURRENCY_IDR);

  const disabledAfterDate = getDisabledAfterDate(isRecurring);
  const disabledBeforeDate = (isEndDate = true) =>
    getDisabledBeforeDate({ isRecurring, disabledStartDate, isEndDate, duplicateDateValue, initialDate });

  return [
    {
      name: 'transferAmount',
      validationRules: [
        { type: 'required', isValidateRequired: true },
        { type: 'minAmount', value: minAmount > DEFAULT_INT_ZERO ? minAmount : DEFAULT_MIN_TRANSFER_AMOUNT, isValidateRequired: true },
        {
          type: 'maxAmount',
          value: maxAmount > DEFAULT_MIN_TRANSFER_AMOUNT ? maxAmount : DEFAULT_MAX_TRANSFER_AMOUNT,
          isValidateRequired: true,
        },
        {
          type: 'senderBalance',
          value: currentBalance,
          isValidateRequired: currency === CURRENCY_IDR, // is same currency? yes : no;
        },
      ],
    },
    { name: 'sourceOfFund', options: sourceOfFunds },
    { name: 'transactionPurpose', options: transactionPurposes },
    { name: 'beneficiaryType', options: beneficiaryTypes },
    {
      name: 'transferDate',
      blockedDays: holidays,
      initialDate,
      disabledAfterDate,
      disabledBeforeDate: disabledBeforeDate(false),
    },
    {
      name: 'transferEndDate',
      blockedDays: holidays,
      duplicateDateValue,
      disabledAfterDate,
      disabledBeforeDate: disabledBeforeDate(),
    },
    { name: 'beneficiaryCitizenStatus', options: beneficiaryCitizenStatus },
  ];
};

export const getSknRtgsBeneficiaryDetails = ({ confirmationDetail, referenceNumber, isResultSuccess, isRecurring }) => {
  const dateLabel = getOnetimeLabel(confirmationDetail);
  const details = [
    { title: <FormattedMessage id="transaction.transfer.beneficiary.bank" />, info: get(confirmationDetail, 'bankName', '') },
    { title: <FormattedMessage id="transaction.transfer.beneficiary.name" />, info: get(confirmationDetail, 'toAccountHolderName', '') },
    { title: <FormattedMessage id="transaction.transfer.sourceOfFund" />, info: get(confirmationDetail, 'sumberDanaDisplay', '') },
    {
      title: <FormattedMessage id="transaction.transfer.transactionPurpose" />,
      info: get(confirmationDetail, 'tujuanTransaksiDisplay', ''),
    },
    { title: <FormattedMessage id="transaction.transfer.beneficiary.type" />, info: get(confirmationDetail, 'jenisPenerimaDisplay', '') },
    {
      title: <FormattedMessage id="transaction.transfer.beneficiary.citizenStatus" />,
      info: get(confirmationDetail, 'statusKependudukanPenerimaDisplay', ''),
    },
    !isRecurring
      ? {
          title: <FormattedMessage id="transaction.transfer.effectiveDate" />,
          info: (
            <span>
              {dateLabel}
              <span className="gray pl1">{get(confirmationDetail, 'effectiveDateDisplay', '')}</span>
            </span>
          ),
        }
      : {},
    { title: <FormattedMessage id="transaction.transfer.message" />, info: get(confirmationDetail, 'message', '-') },
    {
      title: <FormattedMessage id="transaction.transfer.beneficiary.email" />,
      info: get(confirmationDetail, 'toAccountEmailAddress', ''),
    },
  ].filter(value => Object.keys(value).length);

  if (isResultSuccess)
    return [...details, { title: <FormattedMessage id="transaction.transfer.referenceNumber" />, info: referenceNumber }];
  return details;
};

export const getSknRtgsMonetaryDetails = confirmationDetail => {
  const exchangeRates = get(confirmationDetail, 'exchangeRate', []);
  const exchangeRateDisplay = getExchangeRatesDisplay(exchangeRates, 'transaction.transfer.exchangeRate');

  const details = [
    { title: <FormattedMessage id="transaction.transfer.transactionAmount" />, info: get(confirmationDetail, 'toAmountDis', '') },
    { title: <FormattedMessage id="transaction.transfer.transactionFee" />, info: get(confirmationDetail, 'chargeAmountDis', '') },
    { title: <FormattedMessage id="transaction.transfer.totalDebit" />, info: get(confirmationDetail, 'debitAmountDis', '') },
    { title: <FormattedMessage id="transaction.transfer.localDebitedAmount" />, info: get(confirmationDetail, 'localAmountDis', '') },
  ];

  return details.concat(exchangeRateDisplay);
};
