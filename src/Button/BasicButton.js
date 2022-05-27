import PropTypes from 'prop-types'
import React from 'react'
import { Button } from '@mui/material'
import './styles.scss'

export const BasicButton = ({
  title,
  onClick,
  variant,
  disabled,
  size,
  fullWidth,
  children,
  className,
  disableRipple,
  disabledElevation,
  ...props
}) => {
  if (variant === 'outlined-black') className = 'transparent-bb'
  else if (variant === 'contained') className = 'btn-basic'
  else if (variant === 'outlined-white') className = 'transparent-bw'
  else if (variant === 'dash') className = 'dash-bb'
  else if (variant === 'basic-gold') className = 'basic-gold'
  else if (variant === 'gold') className = 'gold'

  return (
    <Button
      size={size}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      disableRipple={disableRipple}
      disableElevation={disabledElevation}
      className={variant ? `btn btn-basic ${className}` : `btn ${className}`}
      {...props}
    >
      {title || children}
    </Button>
  )
}
BasicButton.defaultProps = {
  title: '',
  className: '',
  size: 'medium',
  onClick: null,
  children: null,
  disabled: false,
  fullWidth: false,
  variant: null,
  disableRipple: false,
  disabledElevation: true
}

BasicButton.propTypes = {
  title: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  size: PropTypes.string,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string,
  className: PropTypes.string,
  disableRipple: PropTypes.bool,
  disabledElevation: PropTypes.bool
}
