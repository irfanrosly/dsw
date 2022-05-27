import { Children } from 'react';
import { size, isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';

import moment from 'moment-timezone';

import { get } from 'utils/lodash';

import {
  E_WALLET,
  INTERBANK,
  SKN_TRANSFER,
  RTGS_TRANSFER,
  SWIFT_TRANSFER,
  VIRTUAL_ACCOUNT,
  TRANSFER_RECURRING_MONTHLY,
  CONFIRMATION_DETAIL_DATE_FORMAT,
} from 'settings/constants/transaction';
import { TODAY } from 'settings/constants/calendar';
import { TAC_EXCEED_MAX_TRIES, SWIFT_EXCEED_CUTOFF_TIME } from 'settings/constants/response-codes';

export const getDebitDate = date => {
  const day = moment(date).day();
  const dayDate = moment(date).format('D');
  const dayName = { id: `calendar.longDays.${day}` };
  return { dayName, dayDate };
};

// below functions can be re-used for other transfer types
export const getConfirmationDetail = (detail, transferType) => {
  const errorCode = get(detail, 'errorCode', '');
  const isSwiftCutOffError = transferType === SWIFT_TRANSFER && errorCode === SWIFT_EXCEED_CUTOFF_TIME;
  // swift transfer display a different message for cutoff time error
  const confirmError = isSwiftCutOffError ? `${errorCode}_${SWIFT_TRANSFER}` : errorCode;

  return {
    confirmError,
    isSwiftCutOffError,
    isConfirmSuccess: get(detail, 'isSuccess', false),
    tacBean: get(detail, 'tacBean', ''),
  };
};

export const getResultDetail = (detail, transferType) => {
  const errorCode = get(detail, 'errorCode', '');
  const isSwiftCutOffError = transferType === SWIFT_TRANSFER && errorCode === SWIFT_EXCEED_CUTOFF_TIME;
  // swift transfer display a different message for cutoff time error
  const resultError = isSwiftCutOffError ? `${errorCode}_${SWIFT_TRANSFER}` : errorCode;

  return {
    resultError,
    isSwiftCutOffError,
    isTacLocked: resultError === TAC_EXCEED_MAX_TRIES,
    statusCode: get(detail, 'statusCode', ''),
    statusMessage: get(detail, 'statusMessage', ''),
    transactionId: get(detail, 'transactionID', ''),
    isResultSuccess: get(detail, 'isSuccess', false),
    isTransactionSuccess: get(detail, 'isTransactionSuccessful', false),
    referenceNumber: get(detail, 'referenceNumber', ''),
  };
};

export const getMonetaryDetails = detail => {
  const exchangeRates = get(detail, 'exchangeRate', []);

  const details = [
    { title: <FormattedMessage id="transaction.transfer.totalDebit" />, info: get(detail, 'debitAmountDis', '') },
    { title: <FormattedMessage id="transaction.transfer.equivalentDebit" />, info: get(detail, 'localAmountDis', '') },
  ];

  if (Array.isArray(exchangeRates) && !isEmpty(exchangeRates)) {
    const exchangeRateDisplay = Children.toArray(
      exchangeRates.map(rate => (
        <>
          {rate}
          <br />
        </>
      ))
    );

    return details.concat({ title: <FormattedMessage id="transaction.transfer.exchangeRate" />, info: exchangeRateDisplay });
  }

  return details;
};

export const getReceiverDetail = (detail, transferType) => {
  const amountHandler = {
    [E_WALLET]: get(detail, 'toAmountDisplay', ''),
    [INTERBANK]: get(detail, 'fromAmountDis', ''),
    default: get(detail, 'toAmountDis', ''),
  };
  const defaultAmountHandler = get(amountHandler, 'default', '');

  const transactionAmount = amountHandler[transferType] || defaultAmountHandler;
  const receiverName = transferType === E_WALLET ? get(detail, 'name', '') : get(detail, 'toAccountHolderName', '');

  return {
    transactionAmount,
    receiverName,
    receiverAccount: get(detail, 'toAccountNumber', ''),
    transactionType: get(detail, 'serviceName', ''),
  };
};

export const getRecurringDetails = ({ confirmationDetail, transferFrequency }) => {
  const transferDate = get(confirmationDetail, 'effectiveDate', TODAY);
  const isMonthly = transferFrequency === TRANSFER_RECURRING_MONTHLY;

  // If weekly, get the day's name
  const day = moment(transferDate, CONFIRMATION_DETAIL_DATE_FORMAT).day();
  const debitDate = isMonthly ? (
    moment(transferDate, CONFIRMATION_DETAIL_DATE_FORMAT).format('DD')
  ) : (
    <FormattedMessage id={`calendar.longDays.${day}`} />
  );

  const debitLabel = isMonthly ? (
    <FormattedMessage id="transaction.transfer.debitDate" />
  ) : (
    <FormattedMessage id="transaction.transfer.debitDay" />
  );

  return [
    { title: debitLabel, info: debitDate },
    { title: <FormattedMessage id="transaction.transfer.startDate" />, info: get(confirmationDetail, 'effectiveDateDisplay', '') },
    { title: <FormattedMessage id="transaction.transfer.endDate" />, info: get(confirmationDetail, 'terminationDateDisplay', '') },
  ];
};

export const getAlertTransferName = (transferType, formatMessage) => {
  const label = {
    [SKN_TRANSFER]: formatMessage({ id: 'transaction.transfer.sknTransfer.name' }),
    [RTGS_TRANSFER]: formatMessage({ id: 'transaction.transfer.rtgs.name' }),
    [VIRTUAL_ACCOUNT]: formatMessage({ id: 'transaction.transfer.virtualAccount.name' }),
    [E_WALLET]: formatMessage({ id: 'transaction.transfer.eWallet.name' }),
    default: '',
  };
  return label[transferType] || label.default;
};

export const getBeneficiaryBankLabels = banks => (Array.isArray(banks) ? banks.map(bank => bank.label) : []);

// add searchableString property for string keywords that are searchable in fav accounts
export const getSearchableFavouriteAccounts = accounts =>
  accounts.map(account => {
    const accountNumber = get(account, 'accountNumber', '');
    const transferDesc = get(account, 'transferDesc', '');
    const beneficiary = get(account, 'beneficiary', '');
    const beneficiaryEmail = get(account, 'beneficiaryEmail', '');
    const bankName = get(account, 'bankName', '');
    const searchableString = `${accountNumber} ${transferDesc} ${beneficiary} ${beneficiaryEmail} ${bankName}`;

    return { ...account, searchableString };
  });

// filter using RegExp().match() for wildcard search
export const getAccountsByKeyword = (arr, str) => {
  const reg = new RegExp(str, 'i');

  return arr.filter(item => item.searchableString.match(reg));
};
