import { Children } from 'react';
import { FormattedMessage } from 'react-intl';

import isEmpty from 'lodash/isEmpty';
import Grid from '@material-ui/core/Grid';

import { get } from 'utils/lodash';

import {
  ACCOUNT_TYPE_ASSET,
  ACCOUNT_TYPE_BORROWING,
  ACCOUNT_TYPE_EMPTY,
  CHART_PERCENTAGE_ZERO,
} from 'settings/constants/digital-wealth/portfolio';

export const getPortfolioClassifications = portfolio => {
  const { assetColor, borrowingColor, totalAsset, totalBorrowing } = portfolio;

  return [
    {
      leftCircleColour: assetColor,
      caption: <FormattedMessage id="digitalWealth.menu.assetCaption" />,
      title: isEmpty(totalAsset) ? (
        <FormattedMessage id="digitalWealth.menu.noAsset" />
      ) : (
        <FormattedMessage id="digitalWealth.menu.assets" values={{ totalAsset }} />
      ),
    },
    {
      leftCircleColour: borrowingColor,
      caption: <FormattedMessage id="digitalWealth.menu.loanCaption" />,
      title: isEmpty(totalBorrowing) ? (
        <FormattedMessage id="digitalWealth.menu.noLoan" />
      ) : (
        <FormattedMessage id="digitalWealth.menu.loans" values={{ totalBorrowing }} />
      ),
    },
  ];
};

export const hasAccountSelection = portfolio => {
  const hasAsset = !isEmpty(get(portfolio, 'assetAccounts', []));
  const hasBorrowing = !isEmpty(get(portfolio, 'borrowingAccounts', []));

  return hasAsset || hasBorrowing;
};

export const getAccountSelections = portfolio => [
  { type: ACCOUNT_TYPE_ASSET, accounts: get(portfolio, 'assetAccounts', []) },
  { type: ACCOUNT_TYPE_BORROWING, accounts: get(portfolio, 'borrowingAccounts', []) },
];

export const getProductBreakdowns = account => {
  const products = get(account, 'productList', '');

  return (
    <ul className="breakdown list pl0 ma0">
      {Children.toArray(products.map(product => <li className="mb2">{get(product, 'percentage', '')} </li>))}
    </ul>
  );
};

export const getProducts = (account, onClick) => {
  const products = get(account, 'productList', '');

  return Children.toArray(
    products.map(product => {
      const id = get(product, 'id', '');
      const name = get(product, 'productName', '');
      const amount = get(product, 'amountDisp', '');
      const accountNumber = get(product, 'accNo', '');
      const equivalentAmount = get(product, 'equivalentAmountDisp', '');

      return (
        <Grid container justify="space-between" className="product" onClick={() => onClick(id)}>
          <span>{`${name} ${accountNumber} >`}</span>
          <span className="tr">
            {amount}
            <br />
            {!isEmpty(equivalentAmount) && (
              <span>
                <FormattedMessage id="digitalWealth.portfolio.equivalent" values={{ equivalentAmount }} />
              </span>
            )}
          </span>
        </Grid>
      );
    })
  );
};

export const getAccountDetail = (account, onClick) => ({
  color: get(account, 'colorCircle', ''),
  leftTitle: get(account, 'name', ''),
  rightTitle: get(account, 'amountDisp', ''),
  rightDropdown: getProducts(account, onClick),
  leftDropdown: getProductBreakdowns(account),
  percentage: parseFloat(get(account, 'percentageValue', CHART_PERCENTAGE_ZERO)),
});

export const getDownloadContent = type => {
  const handler = {
    [ACCOUNT_TYPE_BORROWING]: {
      title: 'digitalWealth.portfolio.noLoan',
      description: 'digitalWealth.portfolio.loanLink',
    },
    [ACCOUNT_TYPE_ASSET]: {
      title: 'digitalWealth.portfolio.noAsset',
      description: 'digitalWealth.portfolio.assetLink',
    },
    [ACCOUNT_TYPE_EMPTY]: {
      title: 'digitalWealth.portfolio.noHolding',
      description: 'digitalWealth.portfolio.portfolioLink',
    },
    default: { title: '', description: '' },
  };

  return handler[type] || handler.default;
};
