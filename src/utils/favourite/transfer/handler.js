import isEmpty from 'lodash/isEmpty';
import { get } from 'utils/lodash';
import { store } from 'providers/store';
import { addIntrabankDetail, getVirtualAccountDetail } from 'middleware/actions/favourite/transfer';

import {
  MAINTENANCE_SKN,
  MAINTENANCE_RTGS,
  MAINTENANCE_SWIFT,
  MAINTENANCE_EWALLET,
  MAINTENANCE_INTRABANK,
  MAINTENANCE_INTERBANK,
  MAINTENANCE_VIRTUAL_ACCOUNT,
} from 'settings/constants/transaction';
import { FAVOURITE_TRANSFER_TYPES } from 'settings/constants/transfer/favourite/form';
import { INTRABANK_NEW_FAVOURITE } from 'settings/constants/transfer/intrabank/form';
import { VIRTUAL_ACCOUNT_NEW_FAVOURITE } from 'settings/constants/transfer/virtual-account/form';

// TODO: Add title into translation file
export const formTitleHandler = ({ isDetailSuccess, favouriteTransferType }) => {
  const handler = {
    [MAINTENANCE_SKN]: '',
    [MAINTENANCE_RTGS]: '',
    [MAINTENANCE_SWIFT]: '',
    [MAINTENANCE_EWALLET]: '',
    [MAINTENANCE_INTRABANK]: 'Add New Favourite to Within Maybank Transfer',
    [MAINTENANCE_INTERBANK]: '',
    [MAINTENANCE_VIRTUAL_ACCOUNT]: 'transaction.favourite.form.title.virtualAccount',
    default: 'transaction.favourite.form.title.initial',
  };
  return (isDetailSuccess && handler[favouriteTransferType]) || handler.default;
};

// TODO: Add API call before open form modal
export const favouriteFormDetailHandler = (type, userId) => {
  const handler = {
    [MAINTENANCE_SKN]: () => {},
    [MAINTENANCE_RTGS]: () => {},
    [MAINTENANCE_SWIFT]: () => {},
    [MAINTENANCE_EWALLET]: () => {},
    [MAINTENANCE_INTRABANK]: () => store.dispatch(addIntrabankDetail({ userId })),
    [MAINTENANCE_INTERBANK]: () => {},
    [MAINTENANCE_VIRTUAL_ACCOUNT]: () => store.dispatch(getVirtualAccountDetail({ userId })),
    default: () => {},
  };
  return (handler[type] || handler.default)();
};

export const formFieldHandler = ({ isDetailSuccess, favouriteTransferType, maintenanceTransfers }) => {
  const handler = {
    [MAINTENANCE_SKN]: [],
    [MAINTENANCE_RTGS]: [],
    [MAINTENANCE_SWIFT]: [],
    [MAINTENANCE_EWALLET]: [],
    [MAINTENANCE_INTRABANK]: INTRABANK_NEW_FAVOURITE,
    [MAINTENANCE_INTERBANK]: [],
    [MAINTENANCE_VIRTUAL_ACCOUNT]: VIRTUAL_ACCOUNT_NEW_FAVOURITE,
    default: (!isEmpty(maintenanceTransfers) && FAVOURITE_TRANSFER_TYPES(maintenanceTransfers)) || [],
  };

  return (isDetailSuccess && handler[favouriteTransferType]) || handler.default;
};

// TODO: Retrieve detail isSuccess status
export const detailStatusHandler = (type, { addIntrabankFormDetail, virtualAccountDetail }) => {
  const handler = {
    [MAINTENANCE_SKN]: () => false,
    [MAINTENANCE_RTGS]: () => false,
    [MAINTENANCE_SWIFT]: () => false,
    [MAINTENANCE_EWALLET]: () => false,
    [MAINTENANCE_INTRABANK]: () => get(addIntrabankFormDetail, 'isSuccess', false),
    [MAINTENANCE_INTERBANK]: () => false,
    [MAINTENANCE_VIRTUAL_ACCOUNT]: () => get(virtualAccountDetail, 'isSuccess', false),
    default: false,
  };
  return handler[type] || handler.default;
};
