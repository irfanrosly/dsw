import React from 'react'
import { BasicButton } from '../../Button/BasicButton'

export default {
  title: 'Dyno Web/Button/Basic Button',
  component: BasicButton,
  argTypes: {
    variant: {
      options: [
        'outlined-black',
        'outlined-white',
        'contained',
        'dash',
        'basic-gold',
        'gold'
      ],
      control: { type: 'select' }
    },
    title: { control: false }
  }
}

const Template = (args) => <BasicButton {...args}>{args.label}</BasicButton>
export const Primary = Template.bind({})

export const BaseButton = Template.bind({})

Primary.args = {
  label: 'Button',
  size: 'large'
}

BaseButton.args = {
  label: 'Base Button',
  variant: 'outlined-black',
  size: 'small'
}
