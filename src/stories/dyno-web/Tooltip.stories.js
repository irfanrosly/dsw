import React from 'react'
import { Tooltip } from '../../Tooltip'

export default {
  title: 'Dyno Web/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      options: [
        'bottom-end',
        'bottom-start',
        'bottom',
        'left-end',
        'left-start',
        'left',
        'right-end',
        'right-start',
        'right',
        'top-end',
        'top-start',
        'top'
      ],
      control: 'select'
    },
    children: { control: false }
  }
}

export const Example = () => {
  return (
    <Tooltip title='Hello'>
      <h1>Tooltip</h1>
    </Tooltip>
  )
}

const Template = (args) => <Tooltip {...args}>{args.children}</Tooltip>

export const Primary = Template.bind({})

Primary.args = {
  title: 'Tooltip',
  children: <h1>Tooltip</h1>,
  placement: 'right'
}

// TODO: Enable stepIcon Control
// TODO: Create a new stories to show how Stepper with icon
