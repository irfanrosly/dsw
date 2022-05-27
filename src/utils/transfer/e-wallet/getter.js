import { FormattedMessage } from 'react-intl';

import { get } from 'utils/lodash';
import { getOnetimeLabel } from 'utils/transaction';

import { CURRENCY_IDR, DEFAULT_INT_ZERO } from 'settings/constants/common';
import { DEFAULT_MIN_TRANSFER_AMOUNT, DEFAULT_MAX_TRANSFER_AMOUNT } from 'settings/constants/transaction';

export const getEWalletBeneficiaryDetails = ({ confirmationDetail, referenceNumber, isResultSuccess }) => {
  const dateLabel = getOnetimeLabel(confirmationDetail);
  const details = [
    {
      title: <FormattedMessage id="transaction.transfer.eWallet.eWalletName" />,
      info: get(confirmationDetail, 'payeeName', ''),
    },
    {
      title: <FormattedMessage id="transaction.transfer.effectiveDate" />,
      info: (
        <span>
          {dateLabel}
          <span className="gray pl1">{get(confirmationDetail, 'effectiveDateDisplay', '')}</span>
        </span>
      ),
    },
  ];

  return isResultSuccess
    ? details.concat({ title: <FormattedMessage id="transaction.transfer.referenceNumber" />, info: referenceNumber })
    : details;
};

export const getEWalletMonetaryDetails = confirmationDetail => [
  {
    title: <FormattedMessage id="transaction.transfer.transactionAmount" />,
    info: get(confirmationDetail, 'toAmountDisplay', ''),
  },
  {
    title: <FormattedMessage id="transaction.transfer.transactionFee" />,
    info: get(confirmationDetail, 'adminFeeDisplay', ''),
  },
  {
    title: <FormattedMessage id="transaction.transfer.totalDebit" />,
    info: get(confirmationDetail, 'totalPaymentDisplay', ''),
  },
  {
    title: <FormattedMessage id="transaction.transfer.localDebitedAmount" />,
    info: get(confirmationDetail, 'equivalentIdrAmountDisplay', ''),
  },
];
export const getEWalletDynamicFields = (detail, senderAccount) => {
  const minAmount = get(detail, 'beneficiaryBank.minLimit', DEFAULT_INT_ZERO);
  const maxAmount = get(detail, 'beneficiaryBank.maxLimit', DEFAULT_INT_ZERO);
  const currentBalance = get(senderAccount, 'plainBalance', DEFAULT_INT_ZERO);
  const currency = get(senderAccount, 'currency', CURRENCY_IDR);

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
  ];
};
