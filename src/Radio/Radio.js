import React, { useState, Children } from 'react'
import PropTypes from 'prop-types'
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio as MaterialRadio
} from '@mui/material'
import { Icon } from '../Icon'
import { useRadioStyle } from '../Styles/material'

import radioSelectedDark from './radio-selected-dark.svg'
import radioSelectedLight from './radio-selected-light.svg'
import radioSelectedTickLight from './radio-selected-tick-light.svg'
import radioSelectedTick from './radio-selected-tick.svg'
import radioUnselectedDark from './radio-unselected-dark.svg'
import radioUnselectedLight from './radio-unselected-light.svg'
import radioUnselectedTickLight from './radio-unselected-tick-light.svg'
import radioUnselectedTick from './radio-unselected-tick.svg'

// Radio is used for multiple choices. It will return the currently selected choice
export const Radio = ({
  row,
  name,
  value,
  options,
  onChange,
  preserveValue,
  variant,
  className,
  fullWidth
}) => {
  const classes = useRadioStyle()
  const iconMode = className.includes('radio-light') ? 'Light' : '' // light theme vs dark (default)

  const [selected, setSelected] = useState(value)

  const handleAction = (e) => {
    const currentChoice = e.target.value
    // to allow multiple click on radio and trigger onChange callback
    if (preserveValue) setSelected(currentChoice)
    return onChange(currentChoice)
  }

  const icon =
    variant === 'tick' ? radioUnselectedTick : radioUnselectedTickLight
  const checkedIcon =
    variant === 'tick' ? radioSelectedTick : radioSelectedTickLight

  const StyledRadio = (props) => (
    <MaterialRadio
      icon={<Icon isAssetIcon={true} type={`${icon}${iconMode}`} />}
      checkedIcon={
        <Icon isAssetIcon={true} type={`${checkedIcon}${iconMode}`} />
      }
      {...props}
    />
  )

  return (
    <FormControl fullWidth={fullWidth} className={classes.root}>
      <RadioGroup
        className={className}
        row={row}
        name={name}
        value={selected}
        onChange={handleAction}
      >
        {Children.toArray(
          options.map((option) => (
            <FormControlLabel
              value={option.value}
              disabled={option.disabled}
              control={<StyledRadio />}
              label={option.label}
            />
          ))
        )}
      </RadioGroup>
    </FormControl>
  )
}

Radio.defaultProps = {
  variant: 'round', // or tick
  className: '',
  value: '',
  name: '',
  preserveValue: true,
  onChange: null,
  row: false,
  fullWidth: false
}

Radio.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  row: PropTypes.bool,
  fullWidth: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  preserveValue: PropTypes.bool,
  variant: PropTypes.oneOf(['round', 'tick']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
