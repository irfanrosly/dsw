import { find, isEmpty, maxBy, minBy, findIndex, toString } from 'lodash';

import { get } from 'utils/lodash';

import {
  ARC_END_ANGLE,
  ARC_START_ANGLE,
  ARC_LINE_WIDTH,
  ARC_SHADOW_STROKE,
  ARC_SHADOW_COLOR,
  ARC_SHADOW_BLUR,
  INNER_ARC_STROKE,
  ARC_SHADOW_OFFSET,
  INNER_ARC_FACTOR,
  OUTER_ARC_FACTOR,
  CANVAS_GRADIENT_START,
  CANVAS_GRADIENT_STOP,
  GRADIENT_END_POINT_Y,
  GRADIENT_START_POINT_X,
  GRADIENT_START_POINT_Y,
  GRADIENT_COLOR_POSITION_START,
  GRADIENT_COLOR_POSITON_END,
  ANNOTATION_TYPE_BOX,
  BOX_ANNOTATION_BACKGROUND,
  BOX_ANNOTATION_BORDER,
  BOX_ANNOTATION_DEFAULT_POSITION,
  ANNOTATION_TYPE_POINT,
  POINT_ANNOTATION_BORDER,
  POINT_ANNOTATION_DEFAULT_IDENFITIER,
  POINT_ANNOTATION_COLOR_CURRENT,
  POINT_ANNOTATION_COLOR_PREVIOUS,
  POINT_ANNOTATION_BORDER_WIDTH,
  POINT_ANNOTATION_DEFAULT_POSITION,
  LINE_CHART_OPTION,
  DEFAULT_DATASET_INDEX,
} from 'settings/constants/chart';

// extract the {x,y} from a list of dataset by the given x value
export const getTargetX = (value, data) => find(data, { x: toString(value) });

// extract the {x,y} from a list of dataset by the given y value
export const getTargetY = (value, data) => find(data, { y: toString(value) });

// returns index of target from the dataset list
// toString because API is returning String
export const getTargetXIndex = (value, data) => findIndex(data, { x: toString(value) });

// get the X coordinate of datapoints
export const getDatapointXPositions = (chart, index) =>
  !isEmpty(chart.data.datasets) && chart.getDatasetMeta(index).data.map(datapoint => datapoint.tooltipPosition().x);

// add dynamic annotation config into existing option
export const addAnnotationOption = (data = {}) => ({
  ...LINE_CHART_OPTION,
  plugins: {
    ...LINE_CHART_OPTION.plugins,
    annotation: { annotations: { ...data } },
  },
});

// to paint the chart's background with gradient colors
export const getCanvasPlugin = () => ({
  id: 'gradient',
  beforeDraw: chart => {
    const context = chart.canvas.getContext('2d');
    const { chartArea } = chart;

    context.save();

    // Create gradient
    const gradient = context.createLinearGradient(GRADIENT_START_POINT_X, GRADIENT_START_POINT_Y, chartArea.right, GRADIENT_END_POINT_Y);
    gradient.addColorStop(GRADIENT_COLOR_POSITION_START, CANVAS_GRADIENT_START);
    gradient.addColorStop(GRADIENT_COLOR_POSITON_END, CANVAS_GRADIENT_STOP);

    // paint the gradient
    context.fillStyle = gradient;
    context.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);

    context.restore();
  },
});

// more details at: https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/types/box.html
// target is {x,y} positions of desired point
export const getBoxAnnotation = (target, dataset = []) => ({
  type: ANNOTATION_TYPE_BOX,
  borderColor: BOX_ANNOTATION_BORDER,
  backgroundColor: BOX_ANNOTATION_BACKGROUND,
  xMin: get(target, 'x', BOX_ANNOTATION_DEFAULT_POSITION),
  xMax: get(maxBy(dataset, 'x'), 'x', BOX_ANNOTATION_DEFAULT_POSITION),
  yMin: get(minBy(dataset, 'y'), 'y', BOX_ANNOTATION_DEFAULT_POSITION),
  yMax: get(maxBy(dataset, 'y'), 'y', BOX_ANNOTATION_DEFAULT_POSITION),
});

// more details at: https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/types/point.html
// target is {x,y} positions of desired point
export const getPointAnnotation = (target, type = POINT_ANNOTATION_DEFAULT_IDENFITIER) => {
  const background = type === POINT_ANNOTATION_DEFAULT_IDENFITIER ? POINT_ANNOTATION_COLOR_CURRENT : POINT_ANNOTATION_COLOR_PREVIOUS;

  return {
    backgroundColor: background,
    type: ANNOTATION_TYPE_POINT,
    borderColor: POINT_ANNOTATION_BORDER,
    borderWidth: POINT_ANNOTATION_BORDER_WIDTH,
    xValue: get(target, 'x', POINT_ANNOTATION_DEFAULT_POSITION),
    yValue: get(target, 'y', POINT_ANNOTATION_DEFAULT_POSITION),
  };
};

export const getTooltipPositions = (chart, tooltipHandler, index = DEFAULT_DATASET_INDEX) =>
  chart && tooltipHandler ? tooltipHandler(getDatapointXPositions(chart, index)) : [];

export const getDropShadowPlugin = () => ({
  id: 'dropShadow',
  afterDraw: chart => {
    const { x, y, outerRadius, innerRadius } = chart.getDatasetMeta(DEFAULT_DATASET_INDEX).data[DEFAULT_DATASET_INDEX];
    const thickness = outerRadius - innerRadius;

    const { ctx } = chart;

    // inner arc
    ctx.beginPath();
    ctx.arc(x, y, INNER_ARC_FACTOR * thickness + innerRadius, ARC_START_ANGLE, ARC_END_ANGLE);
    ctx.lineWidth = ARC_LINE_WIDTH * thickness;
    ctx.strokeStyle = INNER_ARC_STROKE;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // outer arc
    ctx.beginPath();
    ctx.arc(x, y, OUTER_ARC_FACTOR * thickness + outerRadius, ARC_START_ANGLE, ARC_END_ANGLE);
    ctx.lineWidth = ARC_LINE_WIDTH * thickness;

    // add drop shadow
    ctx.strokeStyle = ARC_SHADOW_STROKE;
    ctx.shadowColor = ARC_SHADOW_COLOR;
    ctx.shadowBlur = ARC_SHADOW_BLUR;
    ctx.shadowOffsetX = ARC_SHADOW_OFFSET;
    ctx.shadowOffsetY = ARC_SHADOW_OFFSET;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  },
});
