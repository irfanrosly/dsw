import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { Step, StepLabel, Stepper as MaterialStepper } from '@mui/material'
import { get } from '../utils/lodash'

export const DEFAULT_STEPPER_POSITION = 0

export const Stepper = ({ steps, activeStep, stepIcon, className }) => {
  return (
    <div className={`common stepper ${className}`}>
      <MaterialStepper activeStep={activeStep}>
        {Array.isArray(steps) &&
          Children.toArray(
            steps.map((step) => {
              const label = get(step, 'label', '')
              return (
                <Step>
                  <StepLabel icon={stepIcon}>{label}</StepLabel>
                </Step>
              )
            })
          )}
      </MaterialStepper>
    </div>
  )
}

Stepper.defaultProps = {
  steps: [],
  stepIcon: null,
  className: '',
  activeStep: DEFAULT_STEPPER_POSITION
}

Stepper.propTypes = {
  steps: PropTypes.array,
  stepIcon: PropTypes.node,
  activeStep: PropTypes.number,
  className: PropTypes.string
}

export default Stepper
