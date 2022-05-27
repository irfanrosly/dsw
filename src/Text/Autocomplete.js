import PropTypes from 'prop-types'
import React from 'react'
import isEmpty from 'lodash/isEmpty'
import _ from 'lodash'
import {
  Paper,
  TextField,
  Autocomplete as MaterialAutocomplete,
  Box
} from '@mui/material'
import { get } from '../utils/lodash'
import { AUTOCOMPLETE_PAPER_STYLE } from '../Styles/index'

import { Icon } from '../Icon'

import '../Styles/index.scss'

export const Autocomplete = ({
  value,
  variant,
  options,
  onChange,
  onInputChange,
  placeholder,
  noOptionsText,
  hasIcon,
  isMultiline
}) => {
  const popupIcon =
    variant === 'dropdown' ? <Icon type='keybaordArrowDown' /> : null
  // if option is an object, returns its {label}, else return the option as a string
  const getOptionLabel = (option) =>
    _.isObject(option) ? get(option, 'label', '') : option

  const renderOption = (props, option) => (
    <Box component='li' {...props}>
      {getOptionLabel(option)}
    </Box>
  )

  // to fix mismatch error when value is empty
  const selectedOption = !isEmpty(value) ? value : null

  return (
    <MaterialAutocomplete
      disableClearable
      value={selectedOption}
      options={options}
      popupIcon={popupIcon}
      noOptionsText={noOptionsText}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      onInputChange={onInputChange}
      onChange={(event, option) => onChange && onChange(option)}
      className={`common autocomplete ${variant}`}
      PaperComponent={({ children }) => (
        <Paper
          style={AUTOCOMPLETE_PAPER_STYLE}
          className='autocomplete-list-wrapper'
        >
          {children}
        </Paper>
      )}
      renderInput={(params) => (
        <div className='wrapper'>
          {hasIcon && <Icon isAssetIcon type='listRound' className='icon' />}
          <TextField
            {...params}
            className='relative'
            multiline={isMultiline}
            placeholder={placeholder}
            InputProps={{ ...params.InputProps }}
          />
        </div>
      )}
    />
  )
}

Autocomplete.defaultProps = {
  value: '',
  hasIcon: true,
  isMultiline: false,
  options: [],
  placeholder: '',
  noOptionsText: 'No option found',
  variant: 'normal',
  onInputChange: null
}

Autocomplete.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array,
  hasIcon: PropTypes.bool,
  isMultiline: PropTypes.bool,
  placeholder: PropTypes.string,
  noOptionsText: PropTypes.string,
  onInputChange: PropTypes.func, // change due to programmatic. ie: hooks
  onChange: PropTypes.func.isRequired, // change due to user's selection
  variant: PropTypes.oneOf(['normal', 'dropdown'])
}
