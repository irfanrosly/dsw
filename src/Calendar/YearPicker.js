import React, { Children, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import { Grid, Collapse } from '@mui/material'

import {Icon} from '../Icon'

export const YearPicker = ({ date, years, onChange, hasYearList, formatMessage = null }) => {
  const [isOpen, setOpen] = useState(false)

  const currentYear = moment(date).year()
  const currentMonth = moment(date).month()
  const monthName = formatMessage ? formatMessage({ id: `calendar.months.${currentMonth}` }) : moment(date).format('MMMM');

  const icon = isOpen ? 'expandLess' : 'expandMore'

  const className = isOpen ? 'opened' : ''

  const toggleMonth = () => {
    if (!hasYearList) return
    setOpen(!isOpen)
  }

  return (
    <div className={`DayPicker-Caption ${className}`}>
      <button type='button' className='btn-picker' onClick={toggleMonth}>
        <span>{monthName}</span>
        <span>{currentYear}</span>
        {hasYearList && <Icon isAssetIcon={false} type={icon} />}
      </button>

      <Collapse in={isOpen}>
        <Grid container className='year-picker'>
          {hasYearList &&
            Children.toArray(
              years.map((year) => {
                const selected = year === currentYear ? 'selected' : ''
                return (
                  <Grid item xs={4} className={`tc year ${selected}`}>
                    <button
                      type='button'
                      onClick={() => onChange(year, currentMonth)}
                    >
                      {year}
                    </button>
                  </Grid>
                )
              })
            )}
        </Grid>
      </Collapse>
    </div>
  )
}

YearPicker.propTypes = {
  years: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  hasYearList: PropTypes.bool.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
}
