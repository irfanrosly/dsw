import PropTypes from 'prop-types'
import React from 'react'
import { LinearProgress } from '@mui/material'
import { useProgressBarStyle } from '../Styles/material'

export const ProgressBar = ({ value, colour }) => {
  const classes = useProgressBarStyle()

  return (
    <LinearProgress
      classes={classes}
      variant='determinate'
      value={value}
      className={`common progress-bar ${colour}`}
    />
  )
}

ProgressBar.defaultProps = { value: 0, colour: '' }

ProgressBar.propTypes = { value: PropTypes.number, colour: PropTypes.string }
