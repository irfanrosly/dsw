import React, { useContext } from 'react'

import PropTypes from 'prop-types'
import { NavigationList } from '../navigation/NavigationList'

export const LanguageBar = ({ className, items, onChange,...props}) => {
  return (
    <NavigationList
      className={`common language-bar ${className}`}
      indicator='top'
      navItems={items}
      onChange={onChange}
      {...props}
    />
  )
}

LanguageBar.defaultProps = { className: '', onChange: null }

LanguageBar.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func
}
