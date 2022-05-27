import React from 'react'

import PropTypes from 'prop-types'

import { FormControlLabel, Checkbox as MaterialCheckbox } from '@mui/material'

import { Icon } from '../Icon'

import { useCheckboxStyle } from '../Styles/material'

import CheckboxRoundChecked from './checkbox-round-checked.svg'
import CheckboxSquareChecked from './checkbox-square-checked.svg'
import CheckboxRound from './checkbox-round.svg'
import CheckboxSquare from './checkbox-square.svg'
// this component accepts one option at a time. If you have a list of options, push them into an array
export const Checkbox = ({
  isChecked,
  id,
  name,
  value,
  required,
  disabled,
  label,
  onChange,
  variant,
  className
}) => {
  const classes = useCheckboxStyle()

  // Return different icon according to variant type
  const variantIcon = variant === 'square' ? CheckboxSquare : CheckboxRound
  const variantCheckedIcon =
    variant === 'square' ? CheckboxSquareChecked : CheckboxRoundChecked

  return (
    <FormControlLabel
      className={`${className} ${classes.root}`}
      disabled={disabled}
      control={
        <MaterialCheckbox
          id={id}
          name={name}
          value={value}
          required={required}
          checked={isChecked}
          onChange={onChange}
          //original have problem
          icon={<Icon isAssetIcon={true} type={variantIcon} />}
          checkedIcon={<Icon isAssetIcon={true} type={variantCheckedIcon} />}
        />
      }
      label={label}
    />
  )
}

Checkbox.defaultProps = {
  variant: 'square', // or round
  className: '',
  isChecked: false,
  disabled: false,
  required: false,
  id: '',
  value: '',
  name: '',
  label: ''
}

Checkbox.propTypes = {
  className: PropTypes.string,
  isChecked: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['round', 'square']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
