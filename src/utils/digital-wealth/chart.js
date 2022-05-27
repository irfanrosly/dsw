import { head, isEmpty, last } from 'lodash';

import { get } from 'utils/lodash';
import { addAnnotationOption, getBoxAnnotation, getPointAnnotation, getTargetX } from 'utils/chart';

import { INT_ONE } from 'settings/constants/common';
import { DATASET_CONFIG_CURRENT, DATASET_CONFIG_PREVIOUS, POINT_ANNOTATION_PREVIOUS_IDENTIFIER } from 'settings/constants/chart';

// a set can hold a max of two entries at one time
export const updateGraphSet = (prevSet, newData) => {
  const newEntry = { ...DATASET_CONFIG_CURRENT, data: newData };
  const prevEntry = isEmpty(prevSet) ? [] : [{ ...DATASET_CONFIG_PREVIOUS, data: get(last(prevSet), 'data', []) }];

  return isEmpty(newData) ? prevSet : prevEntry.concat(newEntry);
};

// dont update goalResult if there's no data due to API error
export const updateGoalData = (prevData = '', newData = '') => (isEmpty(newData) ? prevData : newData);

const getAnnotation = (datasets, target, oldTarget) => {
  const currentData = get(last(datasets), 'data', []);

  if (datasets.length === INT_ONE) {
    // If there're 2 targets, use oldTarget because the later one has API error
    const targetValue = isEmpty(oldTarget) ? target : oldTarget;
    const currentTarget = getTargetX(targetValue, currentData);

    return { point1: getPointAnnotation(currentTarget) };
  }

  const newTarget = getTargetX(target, currentData);
  const point1 = getPointAnnotation(newTarget);

  const prevData = get(head(datasets), 'data', []);
  const prevTarget = getTargetX(oldTarget, prevData);
  const point2 = getPointAnnotation(prevTarget, POINT_ANNOTATION_PREVIOUS_IDENTIFIER);

  return { point1, point2 };
};

export const getInvestmentOption = (datasets, investmentPeriod, prevTarget = '') => {
  const prevData = get(head(datasets), 'data', []);
  const currentData = get(last(datasets), 'data', []);
  const previousYear = get(last(prevData), 'x', prevTarget);
  const currentYear = get(last(currentData), 'x', investmentPeriod);

  return addAnnotationOption(getAnnotation(datasets, currentYear, previousYear));
};
export const getPensionOption = (datasets, retireAge, prevTarget = '') => {
  const pointAnnotation = getAnnotation(datasets, retireAge, prevTarget);

  const graphData = get(last(datasets), 'data', []);
  const target = getTargetX(retireAge, graphData);
  // TODO: fix box annotation, disable for now
  // const boxAnnotation = getBoxAnnotation(target, graphData);

  return addAnnotationOption(pointAnnotation);
};
