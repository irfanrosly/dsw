import { translate } from 'utils/i18n';

import { COUNTRIES } from 'settings/constants/country';

import { GOODS } from './goods';
import { MODALS } from './modal';
import { SERVICES } from './service';
import { PRODUCTIONS } from './production';
import { UNREQUITTEDS } from './unrequitted';

export const SWIFT_CODE_MAX_LENGTH = 11;
export const SWIFT_MESSAGE_INPUT_MAX_CHARS = 120;

export const SWIFT_TABLE_HEADERS = [
  { field: 'swiftCode', headerName: translate('transaction.transfer.swift.table.swiftCode') },
  { field: 'bankName', headerName: translate('transaction.transfer.swift.table.bankName') },
  { field: 'firstAddress', headerName: translate('transaction.transfer.swift.table.firstAddress') },
  { field: 'secondAddress', headerName: translate('transaction.transfer.swift.table.secondAddress') },
  { field: 'thirdAddress', headerName: translate('transaction.transfer.swift.table.thirdAddress') },
];

export const DEFAULT_LLD_CATEGORY = 'default';
export const LLD_DESCRIPTION_MAP = new Map([
  ['1', 'productions'],
  ['2', 'goods'],
  ['3', 'services'],
  ['4', 'modals'],
  ['5', 'unrequitteds'],
  [DEFAULT_LLD_CATEGORY, ''],
]);

// this LLD info will be used instead of fetching from API, to conserve bandwidth
export const LLD_INFO = {
  countries: COUNTRIES,
  description: {
    productions: PRODUCTIONS,
    goods: GOODS,
    services: SERVICES,
    modals: MODALS,
    unrequitteds: UNREQUITTEDS,
  },
  identityStatuses: [
    {
      key: 'N',
      label: translate('transaction.transfer.swift.lld.identityStatus.no'),
    },
    {
      key: 'Y',
      label: translate('transaction.transfer.swift.lld.identityStatus.yes'),
    },
  ],
  beneficiaries: [
    {
      key: 'A0',
      label: translate('transaction.transfer.swift.lld.beneficiary.individual'),
    },
    {
      key: 'D0',
      label: translate('transaction.transfer.swift.lld.beneficiary.financial'),
    },
    {
      key: 'E0',
      label: translate('transaction.transfer.swift.lld.beneficiary.company'),
    },
  ],
  relationships: [
    {
      key: 'N',
      label: translate('transaction.transfer.swift.lld.relationship.nonAffiliate'),
    },
    {
      key: 'P',
      label: translate('transaction.transfer.swift.lld.relationship.shareHolders'),
    },
    {
      key: 'T',
      label: translate('transaction.transfer.swift.lld.relationship.subsidiary'),
    },
    {
      key: 'G',
      label: translate('transaction.transfer.swift.lld.relationship.group'),
    },
  ],
  purposes: [
    {
      key: '1',
      label: translate('transaction.transfer.swift.lld.purpose.production'),
    },
    {
      key: '2',
      label: translate('transaction.transfer.swift.lld.purpose.goods'),
    },
    {
      key: '3',
      label: translate('transaction.transfer.swift.lld.purpose.services'),
    },
    {
      key: '4',
      label: translate('transaction.transfer.swift.lld.purpose.modal'),
    },
    {
      key: '5',
      label: translate('transaction.transfer.swift.lld.purpose.unrequitted'),
    },
  ],
};
