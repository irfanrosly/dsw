import { Children } from 'react';
import React from 'react'
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { get } from './utils/lodash';

import { Select as MaterialSelect } from '@mui/material';
import {MenuItem} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SELECT_PLACEHOLDER_DEFAULT_VALUE } from './settings/constants/common';
import { useSelectStyles } from './Styles/material';

const ANCHOR_ORIGIN_LIGHT = {
  vertical: 'top',
  horizontal: 'left',
};

const ANCHOR_ORIGIN_DARK = {
  vertical: 'bottom',
  horizontal: 'left',
};

const TRANSFORM_ORIGIN = {
  vertical: 'top',
  horizontal: 'left',
};

const NO_ELEVATION = 0;
const SHADOW_ELEVATION = 4;

export const Select = ({
  id,
  name,
  value,
  options,
  readOnly,
  children,
  className,
  disabled,
  onClose,
  onChange,
  onItemClick,
  fullWidth,
  placeholder,
  autoComplete,
  defaultValue,
  renderValue,
  displayEmpty,
  icon,
}) => {
  const classes = useSelectStyles();
  const isLight = className.includes('select-light'); // light theme vs dark (default)
  const extraStyle = isLight ? 'menu-light' : '';

  if (value && defaultValue) {
    // console will not crash the app, using throw error method will crash it
    console.error('Value & default value cannot be present together');
  }

  return (
    <MaterialSelect
      id={id}
      name={name}
      value={value}
      disableUnderline
      disabled={disabled}
      readOnly={readOnly}
      onChange={onChange}
      onClose={onClose}
      fullWidth={fullWidth}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      className={`${className} ${classes.root}`}
      IconComponent={icon}
      renderValue={renderValue}
      displayEmpty={displayEmpty}
      MenuProps={{
        disableScrollLock: true,
        elevation: isLight ? NO_ELEVATION : SHADOW_ELEVATION, // light theme doesnt have box-shadow
        className: `${extraStyle} ${classes.menu}`,
        anchorOrigin: isLight ? ANCHOR_ORIGIN_LIGHT : ANCHOR_ORIGIN_DARK,
        transformOrigin: TRANSFORM_ORIGIN,
        getcontentanchorel: null,
        MenuListProps: { disablePadding: true, className: `${extraStyle} ${className} ${classes.optionContainer}` },
      }}
    >
      {!isEmpty(placeholder) && (
        <MenuItem disabled value={SELECT_PLACEHOLDER_DEFAULT_VALUE} className={`${extraStyle} ${className} ${classes.option}`}>
          {placeholder}
        </MenuItem>
      )}

      {children ||
        Children.toArray(
          options.map(option => {
            const optionLabel = get(option, 'label', '');
            const optionValue = get(option, 'value', '');

            return (
              <MenuItem
                value={optionValue}
                onClick={event => onItemClick && onItemClick(optionValue)}
                className={`${extraStyle} ${className} ${classes.option}`}
              >
                {optionLabel}
              </MenuItem>
            );
          })
        )}
    </MaterialSelect>
  );
};

Select.defaultProps = {
  id: 'select',
  name: '',
  options: [],
  value: '',
  className: '',
  onClose: null,
  onChange: null,
  onItemClick: null,
  children: null,
  disabled: false,
  placeholder: '',
  readOnly: false,
  fullWidth: true,
  defaultValue: '',
  autoComplete: '',
  renderValue: null,
  icon: ExpandMoreIcon,
  displayEmpty: false,
};

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onItemClick: PropTypes.func,
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  renderValue: PropTypes.func,
  icon: PropTypes.elementType,
  displayEmpty: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

