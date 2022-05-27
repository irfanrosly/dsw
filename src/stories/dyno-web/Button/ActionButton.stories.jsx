import React from 'react'
import { ActionButton } from '../../../Button/ActionButton'
import { ICONS } from '../../utils/icons'

export default {
  title: 'Dyno Web/Button/Action Button',
  component: ActionButton,
  argTypes: {
    icon: { control: false }
  }
}

const ArrowIcon = ICONS.get('arrowRightAlt')

const Template = (args) => <ActionButton {...args}>{args.label}</ActionButton>
export const Primary = Template.bind({})

Primary.args = {
  label: 'Button',
  icon: ArrowIcon
}
