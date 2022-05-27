import PropTypes from 'prop-types'
import React from 'react'
import { Drawer as MaterialDrawer } from '@mui/material'

// Sticky is just a placeholder for sticky nav (top/bottom). Content are passed as Children or via Content props
export const Sticky = ({
  className,
  children,
  elevation,
  position,
  isOpen,
  onClose
}) => {
  return (
    <MaterialDrawer
      className={`nav sticky--drawer ${className}`}
      variant='persistent'
      anchor={position}
      open={isOpen}
      onClose={onClose}
      ModalProps={{ hideBackdrop: true }}
      PaperProps={{ elevation }}
    >
      {children}
    </MaterialDrawer>
  )
}

Sticky.defaultProps = {
  className: '',
  elevation: 3,
  position: 'bottom',
  isOpen: true, // just in case in future, we wanna toggle it but for now it's always visible
  children: '',
  onClose: null
}

Sticky.propTypes = {
  className: PropTypes.string,
  elevation: PropTypes.number,
  isOpen: PropTypes.bool,
  position: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func
}

