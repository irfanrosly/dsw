import React, { useState, useEffect } from 'react'
import '../styles.scss'
import { CountdownTimer } from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'

const RESEND_TAC_TIMER = 12000
const MAX_RESEND_COUNT = 3
export const CountdownTimerScreen = () => {
  return (
    <>
      <CountdownTimer
        isStart={true}
        onComplete={()=>alert('Boom!')}
        duration={RESEND_TAC_TIMER}
        title='To resend'
        format={'HH:mm:ss'}
      />
    </>
  )
}
