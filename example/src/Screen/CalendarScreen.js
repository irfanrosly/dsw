import React, { useState, useEffect } from 'react'
import '../styles.scss'
import {
  CalendarPicker,
} from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'
import moment from 'moment-timezone'


export const CalendarScreen = () => {
  //For calendar start
  const today = new Date()
  const [calendarDate, setDate] = useState(today)
  const [birthday, setBirthday] = useState('')
  const [label, setLabel] = useState('Today')

  const blockedFutureDate = moment(today).add(1, 'months').toDate()
  const blockedFutureDate1 = moment(today).add(-2, 'years').toDate()

  const handleChange1 = (value) => {
    // Only call once onChange here to avoid datePicker misbehaviour
    setDate(value)

    // If selected day is not Today
    if (!moment(value).isSame(today, 'day')) {
      setLabel('Later')
      return
    }

    setLabel('Today')
  }
  //For calendar End

  return (
    <>
      <h1>Demo for Calendar</h1>
      <p className='mt4 mb3'>
        Default date is Today. If change to other day, update leftLabel to Later
        or someting else.
        <br />
        Backdates and dates 1 month from Today are disabled.
      </p>
      <div className='w-100 w-100-m w-50-l'>
        <CalendarPicker
          leftLabel={label}
          value={calendarDate}
          onChange={handleChange1}
          hasYearList={true}
          disabledDays={[
            { before: blockedFutureDate1, after: blockedFutureDate }
          ]}
        />
      </div>
    </>
  )
}
