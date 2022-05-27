import React from 'react'
import '../../src/styles.css'
import {ProgressBar} from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'



const ProgressBarScreen = () => {
const FIRST_PERCENTAGE = 35
    return (
        <div style={{marginTop:"1rem"}}>
        
        <h1>Demo for ProgressBar</h1>
      <div style={{ marginTop: '1rem' }}>
        <ProgressBar value={FIRST_PERCENTAGE} colour='gold' />
        <span className='fw6'>{FIRST_PERCENTAGE}%</span>
      </div>
            
        </div>
    )
}

export default ProgressBarScreen;