import { get } from 'utils/lodash';

import { CC_MINIMUM_PAYMENT, CC_OUTSTANDING_BALANCE } from 'settings/constants/transaction';

import DynoCardDetail from 'components/dyno-template/CardDetail';

export const formatOwnMaybankCards = cards =>
  Array.isArray(cards) &&
  cards.map(card => ({
    ...card,
    value: card.creditCardNoDisplay,
    label: <DynoCardDetail detail={card} />,
  }));

export const formatCcPaymentModes = detail => {
  const paymentModes = get(detail, 'paymentModeList', []);

  return paymentModes.map(mode => {
    const modeDetail = { label: mode.value, value: mode.key, expiryDate: detail.cardExpiryDate };

    if (mode.key === CC_OUTSTANDING_BALANCE) return { ...modeDetail, amount: detail.outStandingAmount };
    if (mode.key === CC_MINIMUM_PAYMENT) return { ...modeDetail, amount: detail.minimumAmount };
    return modeDetail;
  });
};
