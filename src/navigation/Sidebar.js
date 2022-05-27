import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Drawer as MaterialDrawer } from '@mui/material'
import { createContext } from 'react'
import { SIDEBAR_VARIANT } from '../utils/settings/constants/ui-control'
import { Icon } from '../Icon'
import { IconButton } from '../Button/IconButton'
import './style.scss'

const SidebarContext = createContext({})

// Sidebar is just a placeholder. Content are populated by children and props
export const Sidebar = ({ className, children, position, menuIcon }) => {
  // Context API usage for dashboard component
  // No breaking change on the context addition. can still use props to trigger open/close.
  const { TEMPORARY } = SIDEBAR_VARIANT
  const {
    toggleSidebar,
    setToggleSidebar,
    sidebarVariant = TEMPORARY
  } = useContext(SidebarContext)
  // Initialize the local state with context for other drawer components, if context is undefined, default to false
  // This will allow usage with context API or local state
  const [isOpen, setIsOpen] = useState(!!toggleSidebar)

  const handleSidebarToggle = () => {
    // Check if sidebarContext is exist or not
    if (typeof toggleSidebar !== 'undefined') {
      setToggleSidebar(!isOpen)
    }
    setIsOpen(!isOpen)
  }

  return (
    <div className={`nav sidebar ${className}`}>
      <div className='sidebar--btn'>
        <IconButton onClick={handleSidebarToggle}>
          {menuIcon || <Icon isAssetIcon type='sidebarMenu' />}
        </IconButton>
      </div>

      <MaterialDrawer
        className={`nav sidebar--drawer ${className}`}
        anchor={position}
        open={isOpen}
        onClose={handleSidebarToggle}
        variant={sidebarVariant}
      >
        {children}
      </MaterialDrawer>
    </div>
  )
}

Sidebar.defaultProps = {
  className: '',
  children: '',
  position: 'right',
  menuIcon: ''
}

Sidebar.propTypes = {
  className: PropTypes.string,
  menuIcon: PropTypes.node,
  position: PropTypes.string,
  children: PropTypes.node
}
