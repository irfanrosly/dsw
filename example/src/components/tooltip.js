import React from 'react'
import '../../src/styles.css'
import {Tooltip,} from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'


const ToolTipScreen = () => {
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
                <Tooltip title='Hello'>
                    <h1>hello</h1>
                </Tooltip>
            </div>
        </>
    )
}

export default ToolTipScreen;