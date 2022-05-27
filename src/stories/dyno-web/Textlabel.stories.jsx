import React, { useState } from 'react'
import { Textlabel } from '../../Text/Textlabel'

export default {
  title: 'Dyno Web/Text/Text Label',
  component: Textlabel,
  argTypes: {
    hasIcon: { control: false }
  }
}

const Template = (args) => <Textlabel {...args} />
export const Primary = Template.bind({})

Primary.args = {
  label: 'This is a label'
}

// TODO: Implement story with icon
