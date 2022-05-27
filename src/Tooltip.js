import PropTypes from 'prop-types'
import React from 'react'
import { Tooltip as MaterialTooltip } from '@mui/material'

import { useTooltipStyle } from './Styles/material'

export const Tooltip = ({ className, title, placement, children }) => {
  const classes = useTooltipStyle()

  return (
    <MaterialTooltip
      className={className}
      title={title}
      placement={placement}
      classes={classes}
      arrow
    >
      {children}
    </MaterialTooltip>
  )
}

Tooltip.defaultProps = { className: '', placement: 'top' }

Tooltip.propTypes = {
  className: PropTypes.string,
  placement: PropTypes.string,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
}
