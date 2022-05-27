import React from 'react'
import '../../../src/styles.css'
import { ActionButton } from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'
import { IMAGES, ICONS } from '../../utils/icons'

export const Action = () => {
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
        <ActionButton
          isAssetIcon={false}
          icon={ICONS.get('arrowRightAlt')}
          className='hover--default'
        >
          Button
        </ActionButton>
      </div>
      <h3>White Outline Button</h3>
      <div
        style={{
          backgroundColor: '#171717',
          border: '1px solid darkgrey',
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '.5rem'
        }}
      >
        <ActionButton
          isAssetIcon
          icon={IMAGES.get('registerAvatar')}
          className='transparent-bw'
        >
          register now
        </ActionButton>
      </div>
      <h3>Black Outline Button</h3>

      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid darkgrey',
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '.5rem'
        }}
      >
        <ActionButton
          isAssetIcon={false}
          title='view attachment'
          icon={ICONS.get('download')}
          className='transparent-bb db'
        />
      </div>
    </>
  )
}
