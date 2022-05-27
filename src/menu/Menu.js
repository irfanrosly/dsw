import React, { useState, Children } from 'react'
import PropTypes from 'prop-types'

import { Menu as MaterialMenu, MenuItem } from '@mui/material'

import { Icon } from '../Icon'
import { IconButton } from '../Button/IconButton'

import { get } from '../utils/lodash'

import {
  ANCHOR_ORIGIN,
  TRANSFORM_ORIGIN,
  MENU_SHADOW_ELEVATION
} from '../utils/settings/constants/ui-control'

import { useMenuStyle } from '../styles/material'
import menu from "sidebar-menu.svg"
export const Menu = ({ menuItems, className, menuClassname, onItemClick }) => {
  const classes = useMenuStyle()
  const menuStyle = menuClassname.root || classes.root

  const [anchorEl, setAnchorEl] = useState(null)

  // open the Menu. This function is exlusive to Menu so we cannot use outside handler to set the anchorElement
  const handleClick = (event) => {
    // prevent navigation for IE
    window.event.cancelBubble = true
    // prevent navigation for other browsers
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  // close the Menu
  const handleClose = (event) => {
    window.event.cancelBubble = true
    event.stopPropagation()
    setAnchorEl(null)
  }

  const handleItemClick = (event, option) => {
    window.event.cancelBubble = true
    event.stopPropagation()
    handleClose(event)
    onItemClick(option)
  }

  return (
    <div className={`${className} common menu`}>
      <IconButton onClick={handleClick}>
        <Icon isAssetIcon={true} type={menu} />
      </IconButton>
      <MaterialMenu
        keepMounted
        disableScrollLock
        className={menuStyle}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        elevation={MENU_SHADOW_ELEVATION}
        anchorOrigin={ANCHOR_ORIGIN}
        transformOrigin={TRANSFORM_ORIGIN}
        MenuListProps={{ disablePadding: true }}
      >
        {Children.toArray(
          menuItems.map((item) => {
            const label = get(item, 'label', '')
            const option = get(item, 'option', '')
            return (
              <MenuItem onClick={(event) => handleItemClick(event, option)}>
                {label}
              </MenuItem>
            )
          })
        )}
      </MaterialMenu>
    </div>
  )
}

Menu.defaultProps = { className: '', menuClassname: {} }

Menu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
  menuClassname: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

