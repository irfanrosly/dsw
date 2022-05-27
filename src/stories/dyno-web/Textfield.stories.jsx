import React, { useState } from 'react'
import { Textfield } from '../../Text/Textfield'

export default {
  title: 'Dyno Web/Text/Text Field',
  component: Textfield
}
export const Primary = (props) => {
  const [value, setValue] = useState('')
  return (
    <Textfield
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder='Eg. Yang1234'
      className='field--expiry'
      // {...props}
    />
  )
}

// const Template = (args) => <Textfield {...args} />

// export const Primary = Template.bind({})

// Primary.args = {
//   placeholder: 'Eg. Yang1234'
// }
// TODO: export more functions
