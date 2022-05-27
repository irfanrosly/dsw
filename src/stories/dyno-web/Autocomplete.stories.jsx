import React, { useReducer } from 'react'
import { Autocomplete } from '../../Text/Autocomplete'
export default {
  title: 'Dyno Web/Text/Autocomplete',
  component: Autocomplete
}

const TELCOS = ['Altel', 'Digi', 'Celcom', 'Maxis', 'Yoodo', 'U-mobile']

export const Primary = (props) => {
  const [state, setState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      telco: ''
    }
  )

  const { telco } = state

  const handleChange = (name, value = '') =>
    setState({ ...state, [name]: value })
  return (
    <Autocomplete
      value={telco}
      options={TELCOS}
      onChange={(value) => handleChange('telco', value)}
    />
  )
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template = (args) => <BasicButton {...args}>{args.label}</BasicButton>

// export const Primary = Template.bind({})

// Primary.args = {
//   label: 'Button'
// }

// TODO: Fix error suggestions not showing
