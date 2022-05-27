/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types'
import React from 'react'
import { Link as MaterialLink, Typography } from '@mui/material'

import { Icon } from '../Icon'

export const Link = ({
  label,
  href,
  onClick,
  className,
  isAssetIcon,
  hasRightIcon,
  hasLeftIcon,
  icon
}) => {
  const handleClick = (event) => {
    // If callback is provided then use it
    if (typeof onClick === 'function') {
      onClick()
      return
    }
    // Default behaviour is to prevent default
    event.preventDefault()
  }

  return (
    <Typography className='common link'>
      <MaterialLink
        underline='hover'
        className={`${className}`}
        href={href}
        onClick={handleClick}
      >
        {hasLeftIcon && <Icon type={icon} />}
        {label}
        {hasRightIcon && <Icon  type={icon} />}
      </MaterialLink>
    </Typography>
  )
}

Link.defaultProps = {
  label: '',
  className: '',
  icon: '',
  href: '#',
  onClick: null,
  hasRightIcon: false,
  hasLeftIcon: false
}

Link.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  hasLeftIcon: PropTypes.bool,
  hasRightIcon: PropTypes.bool,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}
