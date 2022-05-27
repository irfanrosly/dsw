import React from 'react'
import '../../src/styles.css'
import {Avatar} from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'

const AvatarScreen = () => {



    return (
        <>
            <div
            style={{
              backgroundColor: 'white',
              border: '1px solid darkgrey',
              display: 'flex',
              justifyContent: 'space-evenly',
              padding: '.5rem'
            }} >
            <Avatar />
            </div>
        </>
    )
}

export default AvatarScreen;