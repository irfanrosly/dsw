import { BELOW_TRANSACTION_LIMIT, EXCEEED_TRANSCTION_LIMIT, INVALID_BENEFICIARY_ACCOUNT } from './response-codes';

export const BANCA_TABLE_UNWANTED_KEYS = [
  'actionCode',
  'asOfDate',
  'balanceAmount',
  'errorCode',
  'errorMsg',
  'currencyCode',
  'hostDateTime',
  'hostFrontEndErrorMsg',
  'hostResourceServiceName',
  'index',
  'payorName',
  'receiptNumber',
  'responseCode',
  'responseDescription',
  'policyNumber',
  'productAccountNo',
];

export const INTERBANK_ERROR_CODES = [BELOW_TRANSACTION_LIMIT, EXCEEED_TRANSCTION_LIMIT, INVALID_BENEFICIARY_ACCOUNT];

export const BALANCE_SUMMARY_ORDERS = [{ type: 'CASA' }, { type: 'TD' }, { type: 'CC' }, { type: 'LOAN' }, { type: 'WEALTH' }];
