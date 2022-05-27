import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { Tabs as MaterialTabs, Tab as MaterialTab } from '@mui/material'

import { get } from '../utils/lodash'

// for accessibility
const a11yProps = (name, index) => ({
  id: `${name}-${index}`,
  'aria-controls': `${name}-navlist-${index}`
})

// for navItems that redirects to another websites
const LinkTab = (props) => <MaterialTab component='a' {...props} />

// A list of nav links/buttons with Icon and Labels
export const NavigationList = ({
  centered,
  className,
  indicator,
  value,
  onChange,
  orientation,
  name,
  variant,
  navItems,
  scrollButtons,
  linkTarget,
  isLink
}) => {
  const handleChange = (event, newValue) => {
    if (typeof onChange === 'function') {
      onChange(newValue)
    }
  }

  return (
    <MaterialTabs
      value={value}
      centered={centered}
      variant={variant}
      onChange={handleChange}
      orientation={orientation}
      aria-label={`navlist ${name}`}
      scrollButtons={scrollButtons}
      className={`nav nav--list ${orientation} indicator--${indicator} ${className}`}
    >
      {Children.toArray(
        navItems.map((item, index) => {
          const label = get(item, 'label', '')
          const icon = get(item, 'icon', '')
          const url = get(item, 'url', '')
          const tabValue = get(item, 'value', index)

          return isLink ? (
            <LinkTab
              href={url}
              target={linkTarget}
              className={className}
              label={label}
              icon={icon}
              {...a11yProps(name, index)}
            />
          ) : (
            <MaterialTab
              className={className}
              label={label}
              icon={icon}
              value={tabValue}
              {...a11yProps(name, index)}
            />
          )
        })
      )}
    </MaterialTabs>
  )
}

NavigationList.defaultProps = {
  centered: false,
  className: '',
  name: 'navlist-item',
  orientation: 'horizontal',
  variant: 'standard',
  scrollButtons: 'auto',
  indicator: 'bottom', // position of indicator
  onChange: null,
  linkTarget: '_self',
  isLink: false
}

NavigationList.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
  indicator: PropTypes.string,
  isLink: PropTypes.bool,
  linkTarget: PropTypes.string,
  name: PropTypes.string,
  orientation: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any.isRequired,
  navItems: PropTypes.array.isRequired,
  scrollButtons: PropTypes.oneOf(['auto', 'desktop', 'off', 'on']),
  variant: PropTypes.oneOf(['fullWidth', 'scrollable', 'standard'])
}
