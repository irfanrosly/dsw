// Created for renaming API keys before sending request to API, because BE receives different key format

export const KEYMAP = {
  username: 'userAlias',
  tacToken: 'vToken',
  tacDetail: 'tacBean',
  pin: 'registrationPIN',
  userInfo: 'encUserData',
  expiryMonth: 'ccExpiryDateMM',
  expiryYear: 'ccExpiryDateYY',
  accountType: 'registrationType',
  registerNumber: 'registrationNo',
  registerInfo: 'encRegistrationData',
  productAccountNumber: 'productAccNo',
  restSmsService: 'restSMSService',
  selectedImage: 'securityImage',
  encryptedUserInfo: 'encUserData',
  referralNumber: 'regRefNo',
  mobileNumbers: 'mobileNoMap',
  SMSServiceResponse: 'restSMSService',
  tacMobileNumber: 'tacMobileNo',
};

export const STOP_ARO_KEYMAP = {
  restSmsService: 'restSMSService',
  timeDepositAccountBean: 'ibTDAccountSummaryBean',
  transactionId: 'transactionID',
};

export const SELF_UNLOCK_KEYMAP = {
  pin: 'pinNumber',
  expiryYear: 'ccExpiryDateYY',
  expiryMonth: 'ccExpiryDateMM',
  creditCardNumber: 'cardNumber',
  selectedAccountNumber: 'accountOrCCNumber',
  accountBody: 'encAccountData',
  selectedCurrency: 'currencyCode',
};

export const TRANSFER_KEYMAP = {
  allBank: 'bankMap',
  senderCurrency: 'fromCurrency',
  senderAccountNumber: 'fromAccountNumber',
  receiverEmail: 'toAccountEmailAddress',
  receiveAmount: 'toAmount',
  receiveMessage: 'beneReferenceNo',
  receiverAccountNumber: 'toAccountNumber',
  receiverCurrency: 'toCurrency',
  transferAmount: 'toAmount',
  transferMode: 'payMode',
  transferFrequency: 'paymentFrequencyCode',
  senderCurrencyCode: 'fromCurrencyCode',
};

export const RECEIPT_KEYMAP = {
  transactionId: 'transactionID',
};
