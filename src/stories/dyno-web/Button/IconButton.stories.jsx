import React from 'react'
import { ActionButton } from '../../../Button/ActionButton'
import { IconButton } from '../../../Button/IconButton'
import { ICONS } from '../../utils/icons'
import { Icon } from '../../../Icon'
export default {
  title: 'Dyno Web/Button/Icon Button',
  component: ActionButton,
  argTypes: {
    icon: { control: false }
  }
}

const DownloadIcon = ICONS.get('download')

export const SampleIcon = () => {
  return (
    <IconButton className='drawer-btn-close'>
      <Icon isAssetIcon={false} type={ICONS.get('close')} />
    </IconButton>
  )
}

export const SampleIconWithAlert = () => {
  return (
    <IconButton
      className='drawer-btn-close '
      onClick={() => alert('Download Button clicked')}
    >
      <Icon isAssetIcon={false} type={ICONS.get('download')} />
    </IconButton>
  )
}
// const Template = (args) => <ActionButton {...args}>{args.label}</ActionButton>
// export const Primary = Template.bind({})

// Primary.args = {
//   label: 'Button',
//   icon: DownloadIcon
// }
