import PropTypes from 'prop-types'
import React from 'react'
import { TextField as MaterialTextfield } from '@mui/material'

import { Icon } from '../Icon'
import { IconButton } from '../Button/IconButton'
import { useTextfieldStyles } from '../Styles/material'

import '../Styles/index.scss'

export const Textfield = ({
  id,
  type,
  name,
  value,
  disabled,
  className,
  fullWidth,
  readOnly,
  autoFocus,
  onChange,
  onClick,
  onBlur,
  onPaste,
  leftIcon,
  rightIcon,
  rightLabel,
  leftLabel,
  isLeftAsset,
  isRightAsset,
  placeholder,
  defaultValue,
  hasLeftLabel,
  hasLeftIcon,
  hasRightIcon,
  autoComplete,
  onIconClick,
  hasRightLabel,
  maxLength,
  hasError,
  errorMessage,
  isLeftLabelNoSpace
}) => {
  const classes = useTextfieldStyles()

  if (value && defaultValue) {
    // console.error will not crash the app, using throw error method will crash it
    console.error('Value & default value cannot present together')
  }

  const borderSyle = hasError ? 'error' : ''
  const leftLabelStyle = isLeftLabelNoSpace ? 'left--label' : 'left--label pr1'

  return (
    <div className='common textfield--container'>
      <div className={`common textfield ${className} ${borderSyle}`}>
        <React.Fragment>
          {hasLeftIcon && <Icon isAssetIcon={isLeftAsset} type={leftIcon} />}
          {hasLeftLabel && <span className={leftLabelStyle}>{leftLabel}</span>}
          <MaterialTextfield
            id={id}
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            onChange={onChange}
            onClick={onClick}
            fullWidth={fullWidth}
            autoFocus={autoFocus}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={classes.root}
            onBlur={onBlur}
            onPaste={onPaste}
            InputProps={{
              disableUnderline: true,
              autoComplete,
              autoFocus,
              readOnly,
              inputProps: { maxLength }
            }}
          />
        </React.Fragment>
        {hasRightIcon && (
          <IconButton onClick={onIconClick}>
            <Icon isAssetIcon={isRightAsset} type={rightIcon} />
          </IconButton>
        )}
        {hasRightLabel && <span className='right--label'>{rightLabel}</span>}
      </div>

      {hasError && <p className='inline--error'>{errorMessage}</p>}
    </div>
  )
}

Textfield.defaultProps = {
  id: '',
  name: '',
  value: '',
  leftIcon: '',
  rightIcon: '',
  leftLabel: '',
  rightLabel: '',
  className: '',
  placeholder: '',
  errorMessage: '',
  type: 'text',
  autoComplete: 'off',
  hasError: false,
  readOnly: false,
  fullWidth: true,
  disabled: false,
  defaultValue: undefined,
  autoFocus: false,
  onChange: null,
  onClick: null,
  onBlur: null,
  onPaste: null,
  hasLeftLabel: false,
  hasLeftIcon: false,
  hasRightIcon: false,
  isLeftAsset: false,
  isRightAsset: false,
  onIconClick: null,
  hasRightLabel: false,
  maxLength: null,
  isLeftLabelNoSpace: false
}

Textfield.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onPaste: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  fullWidth: PropTypes.bool,
  autoFocus: PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  rightLabel: PropTypes.string,
  leftLabel: PropTypes.string,
  onIconClick: PropTypes.func,
  isLeftAsset: PropTypes.bool,
  isRightAsset: PropTypes.bool,
  hasLeftIcon: PropTypes.bool,
  hasRightIcon: PropTypes.bool,
  hasLeftLabel: PropTypes.bool,
  hasRightLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.node,
  isLeftLabelNoSpace: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
