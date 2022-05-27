import isEmpty from 'lodash/isEmpty';

import { FormattedMessage } from 'react-intl';

import { get } from 'utils/lodash';
import { encrypt } from 'utils/crypto';
import { getExchangeRatesDisplay, getReferenceNumberDetail } from 'utils/transaction';
import { handleOtherCcFields, handleOwnCcFields } from 'utils/payment/credit-card';

import { CURRENCY_IDR } from 'settings/constants/common';
import {
  OTHER_BANK_CC,
  OWN_MAYBANK_CC,
  CC_OTHER_AMOUNT,
  OTHER_MAYBANK_CC,
  CC_MINIMUM_PAYMENT,
  CC_OUTSTANDING_BALANCE,
} from 'settings/constants/transaction';

export const getCcOwnDynamicFields = ({ formDetail, creditCardType, ccPaymentModes, senderAccount }) => {
  const paymentOption = get(formDetail, 'paymentOption', '');
  const paymentAmount = get(formDetail, 'paymentAmount', '');
  const currentBalance = get(senderAccount, 'plainBalance', '');
  const currency = get(senderAccount, 'currency', CURRENCY_IDR);

  if (creditCardType === OWN_MAYBANK_CC) {
    return handleOwnCcFields({ ccPaymentModes, paymentOption, currentBalance, currency, paymentAmount });
  }
  return handleOtherCcFields({ currentBalance, currency });
};

export const getCcConfirmationPayload = ({ senderAccount, formDetail, userId, ccPaymentModes }) => {
  const paymentAmount = get(formDetail, 'paymentAmount', '');
  const paymentOption = get(formDetail, 'paymentOption', '');
  const creditCardType = get(formDetail, 'creditCardType', '');
  const encryptedCcNumber = encrypt(get(formDetail, 'creditCardNumber', ''));

  const findMinimumAmount = ccPaymentModes.find(mode => mode.value === CC_MINIMUM_PAYMENT);
  const findOutStandingAmount = ccPaymentModes.find(mode => mode.value === CC_OUTSTANDING_BALANCE);

  const minimumAmount = get(findMinimumAmount, 'amount', '');
  const outStandingAmount = get(findOutStandingAmount, 'amount', '');

  const payload = {
    userId,
    fromAccountNumber: get(senderAccount, 'accountNumber', ''),
    fromCurrencyCodeIso: get(senderAccount, 'currency', CURRENCY_IDR),
  };

  // creditCardName,creditCardHolderName came from handleOwnCardClick (container\payment\index)
  const ownCardPayload = {
    minimumAmount,
    outStandingAmount,
    paymentMode: paymentOption,
    creditCardNo: encryptedCcNumber,
    fromCurrency: get(senderAccount, 'currencyCode', ''),
    cardProductName: get(formDetail, 'creditCardName', ''),
    expireDate: get(formDetail, 'creditCardExpiredDate', ''),
    creditCardHolderName: get(formDetail, 'creditCardHolderName', ''),
    paymentAmount: paymentOption === CC_OTHER_AMOUNT ? paymentAmount : '', // only when paymentMode 3
  };

  const otherMaybankCardPayload = {
    paymentAmount,
    creditCardNo: encryptedCcNumber,
    fromCurrency: get(senderAccount, 'currencyCode', ''),
  };

  const otherBankCardPayload = {
    toAmount: paymentAmount,
    creditCardNumber: encryptedCcNumber,
    applCode: get(senderAccount, 'applCode', ''),
    productCode: get(senderAccount, 'productCode', ''),
  };

  const handler = {
    [OWN_MAYBANK_CC]: () => ({ ...payload, ...ownCardPayload }),
    [OTHER_MAYBANK_CC]: () => ({ ...payload, ...otherMaybankCardPayload }),
    [OTHER_BANK_CC]: () => ({ ...payload, ...otherBankCardPayload }),
    default: () => ({}),
  };
  return (handler[creditCardType] || handler.default)();
};

export const getCcReceiverDetail = detail => {
  const transactionAmount = get(detail, 'toAmountDisp', ''); // for own card and other maybank card
  const paymentAmount = get(detail, 'paymentAmountDisplay', ''); // for other bank

  const creditCardHolderName = get(detail, 'creditCardHolderName', '');
  const issuingBank = get(detail, 'issuingBank', '');

  return {
    receiverName: creditCardHolderName || issuingBank,
    receiverAccount: get(detail, 'creditCardNo', ''),
    transactionType: get(detail, 'serviceName', ''),
    transactionAmount: transactionAmount || paymentAmount,
  };
};

export const getCcMonetaryDetails = detail => {
  const exchangeRates = get(detail, 'exchangeRate', []);
  const exchangeRateDisplay = getExchangeRatesDisplay(exchangeRates, 'transaction.payment.foreignExchange');
  const transactionAmount = get(detail, 'toAmountDisp', ''); // for own card and other maybank card
  const paymentAmount = get(detail, 'paymentAmountDisplay', ''); // for other bank

  const foreignTrxnDetails = [
    {
      title: <FormattedMessage id="transaction.transfer.totalDebit" />,
      info: get(detail, 'debitAmountDisp', ''),
    },
    {
      title: <FormattedMessage id="transaction.transfer.localDebitedAmount" />,
      info: get(detail, 'equDefaultAmountDisp', ''),
    },
  ];

  const details = [
    {
      title: <FormattedMessage id="transaction.transfer.transactionAmount" />,
      info: transactionAmount || paymentAmount,
    },
    { title: <FormattedMessage id="transaction.transfer.transactionFee" />, info: get(detail, 'chargeAmountDisp', '') },
  ];

  return !isEmpty(exchangeRates) ? details.concat(foreignTrxnDetails, exchangeRateDisplay) : details;
};

export const getCcPaymentOptionDetail = (paymentOption, referenceNumber, creditCardType) => {
  const referenceNumberDetail = getReferenceNumberDetail(referenceNumber);

  if (creditCardType !== OWN_MAYBANK_CC) return referenceNumberDetail;

  const paymentOptionDetail = [{ title: <FormattedMessage id="transaction.payment.modal.paymentOption" />, info: paymentOption }];
  return !isEmpty(referenceNumberDetail) ? paymentOptionDetail.concat(referenceNumberDetail) : paymentOptionDetail;
};

export const getCcResultPayload = (detail, creditCardType) => {
  const creditCardNumber = get(detail, 'confirmationDetail.creditCardNo', '');
  const encryptedCcNumber = encrypt(creditCardNumber);

  const payload = {
    userId: get(detail, 'userId', ''),
    tacValue: get(detail, 'tacValue', ''),
    fromAccountNumber: get(detail, 'senderAccount.accountNumber', ''),
    fromCurrencyCodeIso: get(detail, 'senderAccount.currency', ''),
    creditCardNo: encryptedCcNumber,
    fromAmount: get(detail, 'confirmationDetail.fromAmount', ''),
    fromCurrencyRate: get(detail, 'confirmationDetail.fromCurrencyRate', ''),
    restSMSService: get(detail, 'tacDetail.tacViewBean.restSMSService', {}),
  };

  const maybankPayload = {
    fromCurrency: get(detail, 'senderAccount.currencyCode', ''),
    creditCardHolderName: get(detail, 'confirmationDetail.creditCardHolderName', ''),
    additionalData: get(detail, 'confirmationDetail.additionalData', ''),
    toAmount: get(detail, 'confirmationDetail.toAmount', ''),
    billInfoMap: get(detail, 'confirmationDetail.billInfoMap', ''),
    monetaryMap: get(detail, 'confirmationDetail.monetaryMap', ''),
  };

  const otherBankPayload = {
    toCurrencyRate: get(detail, 'confirmationDetail.toCurrencyRate', ''),
    fromAccountHolderName: get(detail, 'senderAccount.fromAccountHolderName', ''),
    productCode: get(detail, 'senderAccount.productCode', ''),
    applCode: get(detail, 'senderAccount.applCode', ''),
    creditCardNoDisplay: creditCardNumber,
    debitAmount: get(detail, 'confirmationDetail.debitAmount', ''),
    paymentAmount: get(detail, 'confirmationDetail.paymentAmount', ''),
    paymentAmountDisplay: get(detail, 'confirmationDetail.paymentAmountDisplay', ''),
    issuingBank: get(detail, 'confirmationDetail.issuingBank', ''),
    chargeAmount: get(detail, 'confirmationDetail.chargeAmount', ''),
    chargeAmount2: get(detail, 'confirmationDetail.chargeAmount2', ''),
    debitAmountWoCharge: get(detail, 'confirmationDetail.debitAmountWoCharge', ''),
    bankName: get(detail, 'confirmationDetail.bankName', ''),
    bankCode: get(detail, 'confirmationDetail.bankCode', ''),
    payeeAccNumber: get(detail, 'confirmationDetail.payeeAccNumber', ''),
    billerKerjasamaIndicator: get(detail, 'confirmationDetail.billerKerjasamaIndicator', ''),
  };

  const handler = {
    [OWN_MAYBANK_CC]: () => ({ ...payload, ...maybankPayload }),
    [OTHER_MAYBANK_CC]: () => ({ ...payload, ...maybankPayload }),
    [OTHER_BANK_CC]: () => ({ ...payload, ...otherBankPayload }),
    default: () => console.error('Payload not found'),
  };
  return (handler[creditCardType] || handler.default)();
};
