import toString from 'lodash/toString';

import { formatAsCurrency, formatCurrencyCompact } from 'utils/formatter';

import { CURRENCY_IDR, DEFAULT_INT_ZERO } from './common';

// For doughnut chart
export const ARC_LINE_WIDTH = 0.2;
export const ARC_START_ANGLE = 0;
export const ARC_END_ANGLE = 2 * Math.PI;

export const OUTER_ARC_FACTOR = 0.05;
export const INNER_ARC_FACTOR = 0.1;
export const INNER_ARC_STROKE = 'rgba(255,255,255,0.2)';

export const ARC_SHADOW_BLUR = 15;
export const ARC_SHADOW_OFFSET = 0;
export const ARC_SHADOW_STROKE = '#efefef';
export const ARC_SHADOW_COLOR = 'rgba(0, 0, 0, .3)';

export const GRADIENT_COLOR_POSITON_END = 1;
export const GRADIENT_COLOR_POSITION_START = 0;

export const GRADIENT_END_POINT_Y = 0;
export const GRADIENT_START_POINT_X = 0;
export const GRADIENT_START_POINT_Y = 0;

export const CANVAS_GRADIENT_START = '#0f6c8a';
export const CANVAS_GRADIENT_STOP = '#0298f7';

export const ANNOTATION_TYPE_BOX = 'box';
export const ANNOTATION_TYPE_POINT = 'point';

export const POINT_ANNOTATION_BORDER = '#fff';
export const POINT_ANNOTATION_BORDER_WIDTH = 3;
export const POINT_ANNOTATION_COLOR_CURRENT = '#389a6e';
export const POINT_ANNOTATION_COLOR_PREVIOUS = '#ffc83d';
export const POINT_ANNOTATION_DEFAULT_IDENFITIER = 'current';
export const POINT_ANNOTATION_PREVIOUS_IDENTIFIER = 'previous';
export const POINT_ANNOTATION_DEFAULT_POSITION = 0;

export const BOX_ANNOTATION_DEFAULT_POSITION = 0;
export const BOX_ANNOTATION_BORDER = 'rgb(255, 255, 255, 0)';
export const BOX_ANNOTATION_BACKGROUND = 'rgba(0, 0, 0, 0.1)';

export const MAX_DATASET_COUNT = 2;
export const DEFAULT_DATASET_INDEX = 0;
export const DATASET_CONFIG_CURRENT = {
  lineTension: 0.1,
  borderWidth: 2,
  borderColor: 'rgb(255, 255, 255)',
  backgroundColor: 'rgb(255, 0, 0)',
};

export const DATASET_CONFIG_PREVIOUS = {
  borderDash: [10, 5],
  lineTension: 0.1,
  borderWidth: 2,
  borderColor: 'rgb(255, 255, 255)',
  backgroundColor: 'rgb(255, 0, 0)',
};

// for more details, go: https://www.chartjs.org/docs/latest/general/options.html
export const LINE_CHART_OPTION = {
  showLine: true,
  pointRadius: 0,
  layout: {
    padding: 0,
  },
  interaction: {
    intersect: true,
    axis: 'xy',
    mode: 'nearest',
  },
  plugins: {
    dropShadow: false,
    datalabels: false,
    autocolors: false,
    legend: { display: false },
    tooltip: {
      yAlign: 'bottom',
      displayColors: false,
      callbacks: {
        title: () => '',
        // toString because y value is a Number
        label: context => `${CURRENCY_IDR} ${formatAsCurrency(toString(context.parsed.y))}`,
      },
    },
  },
  scales: {
    ticks: { display: false },
    x: {
      ticks: { autoSkip: false, maxRotation: 60, minRotation: 60, precision: 0, color: 'rgba(153, 153, 153, 1)', callback: value => value },
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      ticks: {
        callback: value => formatCurrencyCompact(value),
      },
      grid: { color: 'rgba(255, 255, 255, 0.3)' },
    },
  },
};

export const DOUGHNUT_CHART_OPTION = {
  cutout: '40%',
  borderWidth: 0,
  events: [],
  layout: {
    padding: 40,
  },
  plugins: {
    gradient: false,
    tooltip: false,
    datalabels: {
      color: '#fff',
      font: {
        size: 12,
      },
      formatter: value => (value > DEFAULT_INT_ZERO ? `${value}%` : ''),
    },
  },
};
