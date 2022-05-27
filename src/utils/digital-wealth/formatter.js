import { get } from 'utils/lodash';
import { formatArrayKeys } from 'utils/formatter';

import { SUCCESS_RESPONSE_CODE, UNRESPONSIVE_HOST } from 'settings/constants/response-codes';
import {
  EMPTY_CHART_DATA,
  EMPTY_CHART_BACKGROUND,
  CHART_PERCENTAGE_ZERO,
  DEFAULT_ASSET_BACKGROUND,
  DEFAULT_BORROWING_BACKGROUND,
} from 'settings/constants/digital-wealth/portfolio';

export const formatGraphData = data => formatArrayKeys(data, 'x', 'y');

export const formatGoalResponse = detail => {
  const responseCode = get(detail, 'responseCode', UNRESPONSIVE_HOST);

  return {
    responseCode,
    isSuccess: responseCode === SUCCESS_RESPONSE_CODE,
    responseMessage: get(detail, 'responseMessage', ''),
    targetFund: get(detail, 'responseData.totalFvFundTargetDisp', ''),
    monthlyInvestment: get(detail, 'responseData.totalMonthlyAllocationDisp', ''),
    graphData: formatGraphData(get(detail, 'responseData.graphData', [])),
  };
};

export const formatPortfolioResponse = detail => {
  const data = get(detail, 'responseData', {});
  const responseCode = get(detail, 'responseCode', UNRESPONSIVE_HOST);

  // parseFloat because API returns as String
  const percentages = [
    parseFloat(get(data, 'borrowingPieChartPercentage', CHART_PERCENTAGE_ZERO)),
    parseFloat(get(data, 'assetsPieChartPercentage', CHART_PERCENTAGE_ZERO)),
  ];

  const noDataset = percentages.every(value => value === CHART_PERCENTAGE_ZERO);

  return {
    responseCode,
    isSuccess: responseCode === SUCCESS_RESPONSE_CODE,
    assetAccounts: get(data, 'assetList', []),
    borrowingAccounts: get(data, 'borrowingList', []),
    exchangeRates: get(data, 'exchangeRateList', []),
    totalAsset: get(data, 'totalAssetDisp', ''),
    totalBorrowing: get(data, 'totalBorrowingDisp', ''),
    assetColor: get(data, 'assetsPieChartColor', DEFAULT_ASSET_BACKGROUND),
    borrowingColor: get(data, 'borrowingPieChartColor', DEFAULT_BORROWING_BACKGROUND),
    chartData: {
      datasets: [
        {
          data: noDataset ? EMPTY_CHART_DATA : percentages,
          backgroundColor: [
            get(data, 'borrowingPieChartColor', EMPTY_CHART_BACKGROUND),
            get(data, 'assetsPieChartColor', EMPTY_CHART_BACKGROUND),
          ],
        },
      ],
    },
  };
};
