import { Children } from 'react';
import PropTypes from 'prop-types';
import React from 'react'
import { usePagination } from '@mui/material';
import { get } from '../utils/lodash';
import { IconButton } from '../Button/IconButton';
import {Icon} from '../Icon';

import arrowLeftYellow from 'arrow-left-yellow.svg'
import arrowRightYellow from 'arrow-right-yellow.svg'


const DEFAULT_PAGE_COUNT = 1;

// ...item are additional paginationItem props returned by Material-UI usePagination hook
const PaginationItem = ({ page, type, selected, ...item }) => {
  const disabled = get(item, 'disabled', false);

  const paginationButton = {
    previous: (
      <IconButton {...item}>
        <Icon isAssetIcon={true} type={arrowLeftYellow} />
      </IconButton>
    ),
    next: (
      <IconButton className="btn--right" {...item}>
        <Icon isAssetIcon={true} type={arrowRightYellow} />
      </IconButton>
    ),
    default: null,
  };

  return !disabled && (paginationButton[type] || paginationButton.default);
};

PaginationItem.defaultProps = {
  page: '',
  type: '',
  selected: false,
};

PaginationItem.propTypes = {
  page: PropTypes.node,
  type: PropTypes.string,
  selected: PropTypes.bool,
};

export const Pagination = ({ className, count, onChange, page }) => {
  const { items } = usePagination({
    count, // Total number of pages
    onChange,
    page,
  });

  return <nav className={`common pagination ${className}`}>{Children.toArray(items.map(item => <PaginationItem {...item} />))}</nav>;
};

Pagination.defaultProps = {
  count: DEFAULT_PAGE_COUNT,
  className: '',
  onChange: null,
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  className: PropTypes.string,
  count: PropTypes.number,
  onChange: PropTypes.func,
};
