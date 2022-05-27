import React from 'react'
import '../../../src/styles.css'
import { Icon, BasicButton, ActionButton, IconButton } from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'
import { IMAGES, ICONS } from '../../utils/icons'

export const Basic = () => {
  return (
    <>
      <h3>Default Buttons</h3>

      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid darkgrey',
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '.5rem'
        }}
      >
        <BasicButton variant='contained'>Button</BasicButton>
        {/* <BasicButton
              variant='contained'
              style={{ borderRadius: '30px' }}
              sx={[
                {
                  '&:hover': {
                    borderRadius: '30px'
                  }
                }
              ]}
            >
              Round
            </BasicButton> */}
      </div>
      <h3>White Outlined Buttons</h3>
      <div
        style={{
          backgroundColor: '#171717',
          border: '1px solid darkgrey',
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '.5rem'
        }}
      >
        <BasicButton variant='outlined-white'>Button</BasicButton>
      </div>
      <h3>Black Outline Buttons</h3>

      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid darkgrey',
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '.5rem'
        }}
      >
        <BasicButton variant='outlined-black'>Button</BasicButton>
      </div>

      <h3>Legacy Gold Buttons</h3>

      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid darkgrey',
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '.5rem'
        }}
      >
        <BasicButton variant='basic-gold'>Button</BasicButton>
        <BasicButton variant='gold'>Button</BasicButton>
      </div>
    </>
  )
}
