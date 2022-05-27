import React from 'react'
import '../../../src/styles.css'
import { Icon, IconButton } from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'
import { ICONS } from '../../utils/icons'

export const IconBtn = () => {
  return (
    <>
      <h3>Default</h3>
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid darkgrey',
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '.5rem'
        }}
      >
        <IconButton className='drawer-btn-close'>
          <Icon isAssetIcon={false} type={ICONS.get('close')} />
        </IconButton>
      </div>

      <h3>Icon Button With Alert</h3>
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid darkgrey',
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '.5rem'
        }}
      >
        <IconButton onClick={() => alert('work in progress')}>
          <Icon isAssetIcon={false} type={ICONS.get('download')} />
        </IconButton>
      </div>
    </>
  )
}
