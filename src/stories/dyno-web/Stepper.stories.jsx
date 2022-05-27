import React from 'react'
import Stepper from '../../Stepper/Stepper'

export default {
  title: 'Dyno Web/Stepper',
  component: Stepper,
  argTypes: { stepIcon: { control: false } }
}

const GBI_STEP_CHOOSE_PLAN = 0
const GBI_STEP_PLANNING = 1
const GBI_STEP_RESULT = 2
const GOAL_SIMULATION_STEPS = [
  { step: GBI_STEP_CHOOSE_PLAN, label: 'Step 1' },
  { step: GBI_STEP_PLANNING, label: 'Step 2' },
  { step: GBI_STEP_RESULT, label: 'Step 3' }
]

const Template = (args) => <Stepper {...args} />

export const Primary = Template.bind({})

Primary.args = {
  steps: GOAL_SIMULATION_STEPS,
  activeStep: 0
}

// TODO: Enable stepIcon Control
// TODO: Create a new stories to show how Stepper with icon
