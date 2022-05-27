import React from 'react'

import { Radio } from '../../Radio/Radio'

export default {
  title: 'Dyno Web/Radio',
  component: Radio
}
const Template = (args) => <Radio {...args} />

export const Primary = Template.bind({})
Primary.args = {
  options: [
    { name: 'register', id: 'an', value: 'an', label: 'Account Number' },
    { name: 'register', id: 'cc', value: 'cc', label: 'Credit Card' },
    { name: 'register', id: 'id', value: 'id', label: 'Registration ID' }
  ]
}
