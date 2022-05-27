import { Children } from 'react';

import moment from 'moment-timezone';

import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { get } from 'utils/lodash';
import { isPositive } from 'utils/validation';
import { formatArrayItems } from 'utils/array';
import { removeStringComma } from 'utils/formatter';
import { checkIsToday, dateFormatter, getNextDay, isHoliday, isWeekend } from 'utils/date-time';

import { TODAY } from 'settings/constants/calendar';
import { SUCCESS_RESPONSE_CODE, NON_ESB_STATUSCODE } from 'settings/constants/response-codes';
import {
  E_WALLET,
  INTERBANK,
  TRANSFER_NOW,
  SKN_TRANSFER,
  RTGS_TRANSFER,
  OFFLINE_VALUE,
  SWIFT_TRANSFER,
  TRANSFER_FUTURE,
  CUTOFF_TIME_FORMAT,
  TRANSFER_RECURRING,
  HOLIDAY_DATE_FORMAT,
  CUTOFF_COUNTDOWN_TIMER,
  SKN_RTGS_DEFAULT_ADDRESS,
  TRANSFER_RECURRING_MONTHLY,
  DEFAULT_OPERATION_END_TIME,
  CUTOFF_TIME_DISPLAY_FORMAT,
  TRANSFER_RECURRING_MAX_DAY,
  TRANSFER_RECURRING_MAX_YEAR,
  DEFAULT_OPERATION_START_TIME,
  TRANSFER_RECURRING_MAX_MONTH,
  TRANSACTION_PAYMENT_TAB_VALUE,
  DEFAULT_CURRENCY_EXCHANGE_RATE,
  TRANSFER_ONE_TIME_MAX_DURATION,
  TRANSACTION_TRANSFER_TAB_VALUE,
  CONFIRMATION_DETAIL_DATE_FORMAT,
  TRANSACTION_PURCHASE_TAB_VALUE,
} from 'settings/constants/transaction';

// Block dates after 1 month from Today. Convert it to Date object before passing to props
export const getDisabledDateOnetime = () => moment(TODAY).add(TRANSFER_ONE_TIME_MAX_DURATION, 'months').toDate();

// Block dates after two years from Today (ends on 31st Dec)
export const getDisabledDateRecurring = () => {
  const maxYear = moment(TODAY).add(TRANSFER_RECURRING_MAX_YEAR, 'years').year();
  return moment(`${maxYear}-${TRANSFER_RECURRING_MAX_MONTH}-${TRANSFER_RECURRING_MAX_DAY}`).toDate();
};

export const getDisabledAfterDate = isRecurring => (isRecurring ? getDisabledDateRecurring() : getDisabledDateOnetime());

export const getDisabledBeforeDate = ({ isRecurring, disabledStartDate, isEndDate, duplicateDateValue, initialDate }) => {
  const disabledBeforeDateOneTime = disabledStartDate || TODAY;
  // NOTE: startDate for recurring cannot be TODAY
  const recurringInitialDate = checkIsToday(initialDate) ? getNextDay(initialDate) : initialDate;
  const disabledBeforeDateRecurring = isEndDate ? getNextDay(duplicateDateValue) : recurringInitialDate;
  return isRecurring ? disabledBeforeDateRecurring : disabledBeforeDateOneTime;
};

export const isOperationHour = (serviceInfo, holidays) => {
  const currentTime = moment();

  if (isWeekend(currentTime)) return false;

  const formattedHolidays = formatArrayItems(holidays, dateFormatter, HOLIDAY_DATE_FORMAT);
  if (isHoliday(currentTime, formattedHolidays)) return false;

  const startTime = get(serviceInfo, 'operationStartTime', DEFAULT_OPERATION_START_TIME);
  const endTime = get(serviceInfo, 'operationEndTime', DEFAULT_OPERATION_END_TIME);

  if (currentTime.isBefore(moment(endTime, CUTOFF_TIME_FORMAT)) && currentTime.isAfter(moment(startTime, CUTOFF_TIME_FORMAT))) {
    return true;
  }

  return false;
};

// show Cutoff Time notice (within 10 minutes) for TransferNow mode and for SKN,RTGS,SWIFT only
export const isCutoffCountdownDisplay = (transferType, transferMode, duration) =>
  isPositive(duration) &&
  transferMode === TRANSFER_NOW &&
  duration <= CUTOFF_COUNTDOWN_TIMER &&
  [SKN_TRANSFER, RTGS_TRANSFER, SWIFT_TRANSFER].includes(transferType);

export const getOperationHour = serviceInfo => {
  const startTime = get(serviceInfo, 'operationStartTime', DEFAULT_OPERATION_START_TIME);
  const endTime = get(serviceInfo, 'operationEndTime', DEFAULT_OPERATION_END_TIME);

  return {
    startTime: moment(startTime, CUTOFF_TIME_FORMAT).format(CUTOFF_TIME_DISPLAY_FORMAT),
    endTime: moment(endTime, CUTOFF_TIME_FORMAT).format(CUTOFF_TIME_DISPLAY_FORMAT),
  };
};

export const getRecurringLabel = frequency =>
  frequency === TRANSFER_RECURRING_MONTHLY ? 'transaction.transfer.recurringMonthly' : 'transaction.transfer.recurringWeekly';

// if not ESB statusCode, consume statusMessage from API directly
export const getStatusMessage = ({ statusCode, statusMessage, formatMessage }) => {
  if (isEmpty(statusCode) || statusCode === SUCCESS_RESPONSE_CODE) return '';

  return statusCode !== NON_ESB_STATUSCODE ? formatMessage({ id: `errorMessages.ERR_ESB_${statusCode}` }) : statusMessage;
};

// get date label. Returns 'Today' or 'Later'
export const getOnetimeLabel = detail => {
  const transferDate = get(detail, 'effectiveDate', '');
  if (transferDate) {
    const date = moment(transferDate, CONFIRMATION_DETAIL_DATE_FORMAT);
    return checkIsToday(date) ? <FormattedMessage id="calendar.today" /> : <FormattedMessage id="calendar.later" />;
  }
  // if no date found return empty string
  return '';
};

export const getTransactionDetails = ({ confirmationDetail, referenceNumber, isResultSuccess, isRecurring }) => {
  const transferDate = <span className="silver">{get(confirmationDetail, 'effectiveDateDisplay', '')}</span>;
  const dateLabel = getOnetimeLabel(confirmationDetail);

  const details = !isRecurring
    ? [
        {
          title: <FormattedMessage id="transaction.transfer.effectiveDate" />,
          info: (
            <span>
              {dateLabel} {transferDate}
            </span>
          ),
        },
      ]
    : [];

  const successfulDetails = details.concat({
    title: <FormattedMessage id="transaction.transfer.referenceNumber" />,
    info: referenceNumber,
  });

  return isResultSuccess ? successfulDetails : details;
};

export const formatTransactionResultBody = ({
  userId,
  tacValue,
  confirmationDetail,
  transferType,
  transferTacDetail,
  transferMode,
  transferFrequency,
  beneficiaryType,
  beneficiaryCitizenStatus,
}) => {
  const tacViewBean = get(transferTacDetail, 'tacViewBean', {});
  const effectiveDate = get(confirmationDetail, 'effectiveDate', '');
  const terminationDate = get(confirmationDetail, 'terminationDate', '');
  const sknFee = get(confirmationDetail, 'sknFee', '');
  const rtgsFee = get(confirmationDetail, 'rtgsFee', '');
  const transferFee = transferType === RTGS_TRANSFER ? { rtgsFee } : { sknFee };

  const body = {
    ...transferFee,
    userId,
    tacValue,
    restSMSService: get(tacViewBean, 'restSMSService', {}),
    bankCode: get(confirmationDetail, 'bankCode', ''),
    bankName: get(confirmationDetail, 'bankName', ''),
    chargeAmount: get(confirmationDetail, 'chargeAmount', ''),
    debitAmountWoCharge: get(confirmationDetail, 'debitAmountWoCharge', ''),
    fromAccApplCode: get(confirmationDetail, 'fromAccApplCode', ''),
    fromAccProductType: get(confirmationDetail, 'fromAccProductType', ''),
    fromAccountHolderName: get(confirmationDetail, 'fromAccountHolderName', ''),
    fromAccountNumber: get(confirmationDetail, 'fromAccountNumber', ''),
    fromCurrency: get(confirmationDetail, 'fromCurrency', ''),
    fromCurrencyRate: get(confirmationDetail, 'fromCurrencyRate', DEFAULT_CURRENCY_EXCHANGE_RATE),
    toAccountEmailAddress: get(confirmationDetail, 'toAccountEmailAddress', ''),
    toAccountHolderName: get(confirmationDetail, 'toAccountHolderName', ''),
    toAccountNumber: get(confirmationDetail, 'toAccountNumber', ''),
    toAmount: get(confirmationDetail, 'toAmount', ''),
    toAmountDis: get(confirmationDetail, 'toAmountDis', ''),
    toCurrency: get(confirmationDetail, 'toCurrency', ''),
    toCurrencyRate: get(confirmationDetail, 'toCurrencyRate', ''),
    jenisPenerimaKey: beneficiaryType,
    jenisPenerimaDisplay: get(confirmationDetail, 'jenisPenerimaDisplay', ''),
    statusKependudukanPenerimaKey: beneficiaryCitizenStatus,
    statusKependudukanPenerimaDisplay: get(confirmationDetail, 'statusKependudukanPenerimaDisplay', ''),
    sumberDanaDisplay: get(confirmationDetail, 'sumberDanaDisplay', ''),
    tujuanTransaksiDisplay: get(confirmationDetail, 'tujuanTransaksiDisplay', ''),
    message: get(confirmationDetail, 'message', ''),
    payMode: transferMode,
    alamat1: SKN_RTGS_DEFAULT_ADDRESS,
    alamat2: SKN_RTGS_DEFAULT_ADDRESS,
  };

  if (transferMode === TRANSFER_FUTURE) return { effectiveDate, ...body };
  if (transferMode === TRANSFER_RECURRING) return { effectiveDate, terminationDate, paymentFrequencyCode: transferFrequency, ...body };

  return body;
};

const formatTransferOnetimeBody = (body, transferDate) => ({
  ...body,
  selectedDate: transferDate && moment(transferDate).format('DD'),
  selectedMonth: transferDate && moment(transferDate).format('MM'),
  selectedYear: transferDate && moment(transferDate).format('YYYY'),
});

const formatTransferRecurringBody = (body, transferFrequency, transferDate, transferEndDate) => ({
  ...formatTransferOnetimeBody(body, transferDate),
  paymentFrequencyCode: transferFrequency,
  selectedDateTermination: transferEndDate && moment(transferEndDate).format('DD'),
  selectedMonthTermination: transferEndDate && moment(transferEndDate).format('MM'),
  selectedYearTermination: transferEndDate && moment(transferEndDate).format('YYYY'),
});

export const formatTransferConfirmationBody = data => {
  const userId = get(data, 'userId', '');
  const transferMode = get(data, 'transferMode', '');
  const transferDate = get(data, 'transferDate', '');
  const terminateDate = get(data, 'transferEndDate', '');
  const transferFrequency = get(data, 'transferFrequency', '');

  const body = {
    userId,
    bankCode: get(data, 'bankCode', ''),
    fromAccountNumber: get(data, 'senderAccount.accountNumber', ''),
    fromCurrency: get(data, 'senderAccount.currency', ''),
    fromAccountHolderName: get(data, 'senderAccount.fromAccountHolderName', ''),
    applCode: get(data, 'senderAccount.applCode', ''),
    productCode: get(data, 'senderAccount.productCode', ''),
    toAccountNumber: get(data, 'accountNumber', ''),
    toAccountEmailAddress: get(data, 'beneficiaryEmail', ''),
    toAccountHolderName: get(data, 'beneficiaryName', ''),
    toAmount: removeStringComma(get(data, 'transferAmount', '')),
    jenisPenerimaKey: get(data, 'beneficiaryType', ''),
    statusKependudukanPenerimaKey: get(data, 'beneficiaryCitizenStatus', ''),
    sumberDanaKey: get(data, 'sourceOfFund', ''),
    tujuanTransaksi: get(data, 'transactionPurpose', ''),
    jenisPenerimaMap: get(data, 'dataMappings.jenisPenerimaMap', {}),
    statusKependudukanPenerimaMap: get(data, 'dataMappings.statusKependudukanPenerimaMap', {}),
    sumberDanaMap: get(data, 'dataMappings.sumberDanaMap', {}),
    tujuanTransaksiMap: get(data, 'dataMappings.tujuanTransaksiMap', {}),
    telegraphicTransferBankMap: get(data, 'dataMappings.telegraphicTransferBankMap', {}),
    message: get(data, 'message', ''),
    payMode: transferMode,
    alamat1: SKN_RTGS_DEFAULT_ADDRESS,
    alamat2: SKN_RTGS_DEFAULT_ADDRESS,
  };

  if (transferMode === TRANSFER_FUTURE) return formatTransferOnetimeBody(body, transferDate);
  if (transferMode === TRANSFER_RECURRING) return formatTransferRecurringBody(body, transferFrequency, transferDate, terminateDate);
  return body;
};

export const getTotalDisplayAmount = ({ confirmationDetail, transferType }) => {
  const totalAmountHandler = {
    [INTERBANK]: get(confirmationDetail, 'toAmountDis', ''),
    [E_WALLET]: get(confirmationDetail, 'totalPaymentDisplay', ''),
    default: get(confirmationDetail, 'debitAmountDis', ''),
  };
  return totalAmountHandler[transferType] || totalAmountHandler.default;
};

export const getExchangeRatesDisplay = (exchangeRates, labelId = 'transaction.transfer.exchangeRate') => {
  if (!Array.isArray(exchangeRates) || isEmpty(exchangeRates)) {
    return {};
  }

  const exchangeRateDisplay = Children.toArray(
    exchangeRates.map(rate => (
      <>
        {rate}
        <br />
      </>
    ))
  );

  return { title: <FormattedMessage id={labelId} />, info: exchangeRateDisplay };
};

// Additional detail below 'Payment to' section
export const getReferenceNumberDetail = referenceNumber =>
  !isEmpty(referenceNumber) && [{ title: <FormattedMessage id="transaction.transfer.referenceNumber" />, info: referenceNumber }];

export const resultDrawerButtonHandler = ({ transactionType, formatMessage, isTransactionSuccess }) => {
  if (!isTransactionSuccess) return formatMessage({ id: 'buttonText.done' });
  const handler = {
    [TRANSACTION_PAYMENT_TAB_VALUE]: formatMessage({ id: 'buttonText.newPayment' }),
    [TRANSACTION_TRANSFER_TAB_VALUE]: formatMessage({ id: 'buttonText.newTransfer' }),
    [TRANSACTION_PURCHASE_TAB_VALUE]: formatMessage({ id: 'buttonText.newPurchase' }),
    default: formatMessage({ id: 'buttonText.done' }),
  };
  return handler[transactionType] || handler.default;
};

export const getSenderAccountDetails = (accountNumber, senderAccount, labelId) => {
  const accountName = get(senderAccount, 'dropdownLabel', '');
  const accountBalance = get(senderAccount, 'balance', '');

  return [
    {
      title: (
        <>
          <FormattedMessage id={labelId} />
          <strong className="ml1">{accountName}</strong>
        </>
      ),
      info: (
        <>
          <FormattedMessage id="transaction.transfer.availableBalance" />
          <span className="ml1 green">{accountBalance}</span>
        </>
      ),
    },
    { title: accountNumber, info: '' },
  ];
};

export const getTacRequestDetail = detail => ({
  tacTimestamp: get(detail, 'tacSentDateTime', ''),
  isTacRequestSuccess: get(detail, 'isSuccess', false),
  tacRequestError: get(detail, 'errorCode', ''),
});

export const getIsOffline = detail => detail.includes(OFFLINE_VALUE);
