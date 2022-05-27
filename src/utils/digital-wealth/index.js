import { Children } from 'react';

import browserHistory from 'router/history';

import { last, map, uniq } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { get } from 'utils/lodash';
import { getTargetXIndex } from 'utils/chart';
import { formatCurrencyCompact } from 'utils/formatter';

export const getRetirementTooltips =
  ({ data, currentAge, targetAge, lastAge }) =>
  positions =>
    [
      {
        label: <FormattedMessage id="digitalWealth.gbi.pensionFund.now" />,
        value: currentAge,
        left: positions[getTargetXIndex(currentAge, data)],
      },
      {
        value: targetAge,
        style: 'target',
        label: <FormattedMessage id="digitalWealth.gbi.pensionFund.retireAt" values={{ targetAge }} />,
        left: positions[getTargetXIndex(targetAge, data)],
      },
      {
        label: <FormattedMessage id="digitalWealth.gbi.pensionFund.lastExpense" />,
        value: lastAge,
        left: positions[getTargetXIndex(lastAge, data)],
      },
    ];

export const getInvestmentTooltips =
  ({ data, currentAge, targetAge }) =>
  positions =>
    [
      {
        label: <FormattedMessage id="digitalWealth.gbi.maxInvestment.now" />,
        value: currentAge,
        left: positions[getTargetXIndex(currentAge, data)],
      },
      {
        value: targetAge,
        style: 'target',
        label: <FormattedMessage id="digitalWealth.gbi.maxInvestment.targetAchieve" values={{ targetAge }} />,
        left: positions[getTargetXIndex(targetAge, data)],
      },
    ];

// NOTE: this HOC are used to check that component condition for when user type in /wealth/detail
// it will redirect back to /wealth
export const withRedirect = Component => {
  // NOTE: get current path and remove detail to go back to wealth dashboard
  const digitalWealthPath = browserHistory.location.pathname.replace('/detail', '');

  browserHistory.replace(digitalWealthPath);

  return Component;
};

export const getChartLegend = datasets => {
  const data = get(last(datasets), 'data', []);
  const yValues = map(data, 'y');

  // extract the short notation
  const notations = uniq(yValues.map(value => formatCurrencyCompact(value).replace(/[\d.]*/g, '')));

  return (
    <ul className="list ma0 pl0 w-auto">
      {Children.toArray(
        notations.map(
          notation =>
            notation && (
              <li className="fl pl2">
                <FormattedMessage id={`digitalWealth.gbi.chart.notation.${notation}`} />
              </li>
            )
        )
      )}
    </ul>
  );
};
