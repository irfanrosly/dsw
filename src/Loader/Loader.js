import PropTypes from 'prop-types'
import React from 'react'
import { Backdrop } from '@mui/material'

import LoadingIcon from 'loading.gif'

export const Loader = ({ className, isOpen }) => {
  return (
    <Backdrop className={`common loader ${className}`} open={isOpen}>
      <img src={LoadingIcon} alt='Loading...' />
    </Backdrop>
  )
}

Loader.defaultProps = { className: '', isOpen: false }

Loader.propTypes = { className: PropTypes.string, isOpen: PropTypes.bool }
