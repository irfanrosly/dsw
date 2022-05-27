import { Suspense, lazy } from 'react'
import React from 'react'
import PropTypes from 'prop-types'
import { IconButton as MaterialIconButton } from '@mui/material'
import './styles.scss'

const Tooltip = lazy(() => import('../Tooltip'))

export const IconButton = ({
  name,
  isDisabled,
  placement,
  hasTooltip,
  title,
  onClick,
  className,
  edge,
  isPopUp,
  children
}) => {
  return (
    <Suspense fallback={null}>
      {hasTooltip ? (
        <Tooltip title={title} placement={placement}>
          <MaterialIconButton
            aria-label={name}
            inputProps={{ 'aria-label': name }}
            name={name}
            edge={edge}
            disableRipple
            disabled={isDisabled}
            onClick={onClick}
            aria-haspopup={isPopUp}
            className={`${className} btn btn-icon`}
          >
            {children}
          </MaterialIconButton>
        </Tooltip>
      ) : (
        <MaterialIconButton
          aria-label={name}
          name={name}
          edge={edge}
          disableRipple
          disabled={isDisabled}
          onClick={onClick}
          aria-haspopup={isPopUp}
          className={`${className} btn btn-icon`}
        >
          {children}
        </MaterialIconButton>
      )}
    </Suspense>
  )
}

IconButton.defaultProps = {
  name: '',
  title: null,
  className: '',
  edge: false,
  isPopUp: false,
  onClick: null,
  isDisabled: false,
  hasTooltip: false,
  placement: 'top'
}

IconButton.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  isPopUp: PropTypes.bool,
  onClick: PropTypes.func,
  hasTooltip: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placement: PropTypes.string,
  children: PropTypes.node.isRequired,
  edge: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}
