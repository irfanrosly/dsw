import PropTypes from 'prop-types'
import React from 'react'
import { Grid, InputLabel } from '@mui/material'
import { Icon } from '../Icon'
import '../Styles/index.scss'

export const Textlabel = ({
  id,
  label,
  className,
  hasIcon,
  children,
  isAssetIcon,
  tooltipTitle
}) => {
  return (
    <Grid item container xs={12} alignItems='center' className={className}>
      <InputLabel className='common textlabel' htmlFor={id}>
        {label || children}
      </InputLabel>
      {hasIcon && (
        <div className={className}>
          <Icon hasTooltip isAssetIcon={isAssetIcon} title={tooltipTitle} />
        </div>
      )}
    </Grid>
  )
}

Textlabel.defaultProps = {
  id: '',
  className: '',
  hasIcon: false,
  isAssetIcon: true,
  tooltipTitle: ''
}

Textlabel.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  hasIcon: PropTypes.bool,
  isAssetIcon: PropTypes.bool,
  tooltipTitle: PropTypes.string,
  label: PropTypes.string
}
