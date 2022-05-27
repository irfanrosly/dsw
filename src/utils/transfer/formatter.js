import { Children } from 'react';
import size from 'lodash/size';
import moment from 'moment-timezone';

import { get } from 'utils/lodash';
import { formatArrayKeys } from 'utils/formatter';
import { getAccountsByKeyword } from 'utils/transfer/getter';

import { SUCCESS_RESPONSE_CODE } from 'settings/constants/response-codes';
import { OWN_ACCOUNT, MINIMUM_ACCOUNT_OWNED, DEFAULT_CURRENCY_EXCHANGE_RATE, FAVOURITE_MENU_ITEMS } from 'settings/constants/transaction';

import Menu from 'components/common/Menu';
import DynoDropdownLabel from 'components/dyno-template/DropdownLabel';

// if senderAccounts more than 1 include Own Account transfer types in the return
export const formatTransferTypes = (payload, senderAccounts = []) => {
  const transferTypes = formatArrayKeys(payload);

  // user have more than 1 account, give all `Transfer To`
  if (size(senderAccounts) > MINIMUM_ACCOUNT_OWNED) return transferTypes;
  // remove own account if only have 1 account
  return transferTypes.filter(curr => curr.value !== OWN_ACCOUNT);
};

export const formatSenderAccountPayload = payload =>
  payload.reduce(
    (acc, curr) => [
      ...acc,
      {
        value: curr.accountKey,
        dropdownLabel: curr.productName,
        accountNumber: curr.accountNo,
        balance: curr.balanceDisplay,
        plainBalance: curr.balance,
        currency: curr.currencyCodeIso,
        currencyCode: curr.currencyCode,
        applCode: curr.applCode,
        productCode: curr.productCode,
        fromAccountHolderName: curr.fromAccountHolderName,
      },
    ],
    []
  );

export const formatSenderAccounts = payload => {
  const senderAccounts = formatSenderAccountPayload(payload);
  return senderAccounts.map(account => ({ ...account, label: <DynoDropdownLabel option={account} /> }));
};

export const formatReceiverAccounts = payload => formatSenderAccounts(payload);

// remove selected senderAccount from receiverAccounts so that it can be used for components\common\Radio.js
export const formatOwnTransferAccounts = (accounts, currentAccount) => {
  const filteredAccounts = accounts.filter(current => current.value !== currentAccount);
  return filteredAccounts.reduce((acc, curr) => {
    const label = (
      <>
        {curr.dropdownLabel}
        <span className="pl2 transfer--account-number">{curr.accountNumber}</span>
      </>
    );
    return [...acc, { id: curr.value, value: curr.value, label }];
  }, []);
};

export const formatFavouriteAccounts = (accounts, keyword) => {
  const filteredAccounts = getAccountsByKeyword(accounts, keyword);

  return filteredAccounts.map(item => {
    const bankName = get(item, 'bankName', '');
    const beneficiary = get(item, 'beneficiary', '');
    const transferDesc = get(item, 'transferDesc', '');
    const accountNumber = get(item, 'accountNumber', '');

    const spanLabel = (
      <>
        {beneficiary}
        <span className="pl2 transfer--account-number">{bankName}</span>
        <span className="pl2 transfer--account-number">{accountNumber}</span>
        <span className="pl2 transfer--account-number">{transferDesc}</span>
        <Menu className="favourite-list--menu-btn" menuItems={FAVOURITE_MENU_ITEMS} onItemClick={() => {}} />
      </>
    );
    return { id: accountNumber, value: accountNumber, label: spanLabel };
  });
};

// notes can be a list or just one paragraph
export const formatTransferNote = notes =>
  Array.isArray(notes) ? <ol>{Children.toArray(notes.map(note => <li>{note}</li>))}</ol> : <p>{notes}</p>;

export const formatTransferOnetimeBody = (body, transferDate) => ({
  ...body,
  selectedDate: transferDate && moment(transferDate).format('DD'),
  selectedMonth: transferDate && moment(transferDate).format('MM'),
  selectedYear: transferDate && moment(transferDate).format('YYYY'),
});

export const formatTransferRecurringBody = (body, transferFrequency, transferDate, transferEndDate) => ({
  ...formatTransferOnetimeBody(body, transferDate),
  paymentFrequencyCode: transferFrequency,
  selectedDateTermination: transferEndDate && moment(transferEndDate).format('DD'),
  selectedMonthTermination: transferEndDate && moment(transferEndDate).format('MM'),
  selectedYearTermination: transferEndDate && moment(transferEndDate).format('YYYY'),
});

export const formatTransferConfirmation = data => {
  const responseCode = get(data, 'responseCode', '');
  const isSuccess = responseCode === SUCCESS_RESPONSE_CODE;
  const errorCode = !isSuccess && responseCode;

  return { ...data, isSuccess, errorCode };
};

export const formatCommonResultBody = (userId, tacValue, transferConfirmation, transferTac, transferMode, transferFrequency) => {
  const tacViewBean = get(transferTac, 'tacViewBean', {});

  return {
    userId,
    tacValue,
    restSMSService: get(tacViewBean, 'restSMSService', {}),
    fromAccountNumber: get(transferConfirmation, 'fromAccountNumber', ''),
    fromCurrency: get(transferConfirmation, 'fromCurrency', ''),
    fromCurrencyCode: get(transferConfirmation, 'fromCurrencyCode', ''),
    debitAmount: get(transferConfirmation, 'debitAmount', ''),
    fromCurrencyRate: get(transferConfirmation, 'fromCurrencyRate', DEFAULT_CURRENCY_EXCHANGE_RATE),
    localAmount: get(transferConfirmation, 'localAmount', ''),
    toAccountNumber: get(transferConfirmation, 'toAccountNumber', ''),
    toAmount: get(transferConfirmation, 'toAmount', ''),
    toCurrency: get(transferConfirmation, 'toCurrency', ''),
    toCurrencyCode: get(transferConfirmation, 'toCurrencyCode', ''),
    toCurrencyRate: get(transferConfirmation, 'toCurrencyRate', DEFAULT_CURRENCY_EXCHANGE_RATE),
    effectiveDate: get(transferConfirmation, 'effectiveDate', ''),
    terminationDate: get(transferConfirmation, 'terminationDate', ''),
    payMode: transferMode,
    paymentFrequencyCode: transferFrequency,
  };
};
