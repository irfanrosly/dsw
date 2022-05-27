// NOTE: Migrates the handlers from component to here
import { compact } from 'lodash';

import { store } from 'providers/store';

import { get } from 'utils/lodash';
import { formatTransferConfirmationBody } from 'utils/transaction';
import { formatSwiftLLDBody } from 'utils/transfer/swift/formatter';
import { getSwiftDynamicFields } from 'utils/transfer/swift/getter';
import { getSknRtgsDynamicFields } from 'utils/transfer/sknRtgs/getter';
import { getEWalletDynamicFields } from 'utils/transfer/e-wallet/getter';
import { formatIntrabankDetailBody } from 'utils/transfer/intrabank/formatter';
import { formatEWalletConfirmationBody } from 'utils/transfer/e-wallet/formatter';
import { formatOwnTransferConfirmBody } from 'utils/transfer/own-account/formatter';
import { getIntrabankDynamicFields, getIntrabankNote } from 'utils/transfer/intrabank/getter';
import { getOwnAccountDynamicFields, getOwnAccountTransferNote } from 'utils/transfer/own-account/getter';
import { getInterbankDynamicFields, getInterbankConfirmationBody } from 'utils/transfer/interbank/getter';
import { getVirtualAccountDynamicFields, getVirtualConfirmationBody } from 'utils/transfer/virtual-account/getter';

import {
  getSwiftLldDetail,
  getRtgsConfirmation,
  getEWalletConfirmation,
  getIntrabankConfirmation,
  getSknTransferConfirmation,
  getOwnTransferConfirmation,
  getVirtualAccountConfirmation,
  getInterbankTransferConfirmation,
} from 'middleware/actions/transfer';

import {
  E_WALLET,
  INTERBANK,
  INTRABANK,
  OWN_ACCOUNT,
  SKN_TRANSFER,
  TRANSFER_NOW,
  RTGS_TRANSFER,
  SWIFT_TRANSFER,
  VIRTUAL_ACCOUNT,
} from 'settings/constants/transaction';
import { SKN_FIELDS } from 'settings/constants/transfer/skn/form';
import { RTGS_FIELDS } from 'settings/constants/transfer/rtgs/form';
import { SWIFT_FORM_FIELDS } from 'settings/constants/transfer/swift/form';
import { E_WALLET_FIELDS } from 'settings/constants/transfer/e-wallet/form';
import { INTRABANK_FIELDS } from 'settings/constants/transfer/intrabank/form';
import { INTERBANK_FIELDS } from 'settings/constants/transfer/interbank/form';
import { OWN_ACCOUNT_FIELDS } from 'settings/constants/transfer/own-account/form';
import { VIRTUAL_ACCOUNT_FIELDS } from 'settings/constants/transfer/virtual-account/form';

export const dynamicFieldHandler = ({
  transferType,
  senderAccount,
  formDetail,
  transferDetail,
  swiftBankDetail,
  isTransferNowBlocked,
  initialTransferDate,
}) => {
  const handler = {
    [OWN_ACCOUNT]: getOwnAccountDynamicFields({ ...transferDetail, ...formDetail }, senderAccount),
    [INTRABANK]: getIntrabankDynamicFields({ ...transferDetail, ...formDetail }, senderAccount),
    [INTERBANK]: getInterbankDynamicFields({ ...transferDetail, senderAccount }),
    [VIRTUAL_ACCOUNT]: getVirtualAccountDynamicFields(senderAccount),
    [E_WALLET]: getEWalletDynamicFields({ ...transferDetail, ...formDetail }, senderAccount),
    [SWIFT_TRANSFER]: getSwiftDynamicFields({ ...formDetail, ...swiftBankDetail }),
    [SKN_TRANSFER]: getSknRtgsDynamicFields({ ...transferDetail, ...formDetail, isTransferNowBlocked, initialTransferDate }, senderAccount),
    [RTGS_TRANSFER]: getSknRtgsDynamicFields(
      { ...transferDetail, ...formDetail, isTransferNowBlocked, initialTransferDate },
      senderAccount
    ),
    default: [],
  };

  return handler[transferType] || handler.default;
};

export const transferConfirmationBodyHandler = (transferType, data) => {
  const handler = {
    [OWN_ACCOUNT]: formatOwnTransferConfirmBody(data),
    [INTRABANK]: formatIntrabankDetailBody(data),
    [INTERBANK]: getInterbankConfirmationBody(data),
    [SKN_TRANSFER]: formatTransferConfirmationBody(data),
    [RTGS_TRANSFER]: formatTransferConfirmationBody(data),
    [VIRTUAL_ACCOUNT]: getVirtualConfirmationBody(data),
    [E_WALLET]: formatEWalletConfirmationBody(data),
    // NOTE: for SWIFT fetch LLD Detail before go to Confirmation
    [SWIFT_TRANSFER]: formatSwiftLLDBody(data),
    default: {},
  };

  return handler[transferType] || handler.default;
};

export const handleFormSubmit = (transferType, data) => {
  const payload = transferConfirmationBodyHandler(transferType, data);

  const handler = {
    [OWN_ACCOUNT]: () => store.dispatch(getOwnTransferConfirmation(payload)),
    [INTRABANK]: () => store.dispatch(getIntrabankConfirmation(payload)),
    [INTERBANK]: () => store.dispatch(getInterbankTransferConfirmation(payload)),
    [SKN_TRANSFER]: () => store.dispatch(getSknTransferConfirmation(payload)),
    [RTGS_TRANSFER]: () => store.dispatch(getRtgsConfirmation(payload)),
    [VIRTUAL_ACCOUNT]: () => store.dispatch(getVirtualAccountConfirmation(payload)),
    [E_WALLET]: () => store.dispatch(getEWalletConfirmation(payload)),
    // NOTE: check LLD detail before go to Confirmation
    [SWIFT_TRANSFER]: () => store.dispatch(getSwiftLldDetail(payload)),
    default: () => alert('No such request found!'),
  };

  return (handler[transferType] || handler.default)();
};

export const notesHandler = (serviceInfo, transferType, transferMode = TRANSFER_NOW) => {
  const { mainNote1, mainNote2, mainNote3, mainNote4, mainNote5, mainNote6 } = serviceInfo;
  const compactedNotes = compact([mainNote1, mainNote2, mainNote3, mainNote4, mainNote5, mainNote6]);

  const noteHandler = {
    [OWN_ACCOUNT]: getOwnAccountTransferNote(serviceInfo)[transferMode],
    [SKN_TRANSFER]: compactedNotes,
    [RTGS_TRANSFER]: compactedNotes,
    [SWIFT_TRANSFER]: compactedNotes,
    [INTRABANK]: getIntrabankNote(serviceInfo)[transferMode],
    [INTERBANK]: compactedNotes,
    [E_WALLET]: compactedNotes[0],
    [VIRTUAL_ACCOUNT]: compactedNotes[0],
    default: [],
  };
  const noteHandlerDefault = get(noteHandler, 'default', []);

  return noteHandler[transferType] || noteHandlerDefault;
};

export const formTitleHandler = transferType => {
  const handler = {
    [INTRABANK]: 'transaction.transfer.intrabank.title',
    [INTERBANK]: 'transaction.transfer.interbank.title',
    [E_WALLET]: 'transaction.transfer.eWallet.title',
    [RTGS_TRANSFER]: 'transaction.transfer.rtgs.name',
    [SWIFT_TRANSFER]: 'transaction.transfer.swift.modal.name',
    [VIRTUAL_ACCOUNT]: 'transaction.transfer.virtualAccount.title',
    [SKN_TRANSFER]: 'transaction.transfer.sknTransfer.label.transferToSkn',
    default: '',
  };

  return handler[transferType] || handler.default;
};

export const formFieldHandler = transferType => {
  const handler = {
    [OWN_ACCOUNT]: OWN_ACCOUNT_FIELDS,
    [INTRABANK]: INTRABANK_FIELDS,
    [INTERBANK]: INTERBANK_FIELDS,
    [RTGS_TRANSFER]: RTGS_FIELDS,
    [E_WALLET]: E_WALLET_FIELDS,
    [SWIFT_TRANSFER]: SWIFT_FORM_FIELDS,
    [VIRTUAL_ACCOUNT]: VIRTUAL_ACCOUNT_FIELDS,
    [SKN_TRANSFER]: SKN_FIELDS,
    default: [],
  };

  return handler[transferType] || handler.default;
};

export const autocompletePlaceholderHandler = transferType => {
  const placeholderHandler = {
    [E_WALLET]: 'transaction.transfer.eWallet.selectEWallet',
    default: 'transaction.transfer.selectBank',
  };
  return placeholderHandler[transferType] || placeholderHandler.default;
};
