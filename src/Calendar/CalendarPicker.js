import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/id'
import DayPicker from 'react-day-picker'
import { Menu } from '@mui/material'
import {
  getBeforeAfter,
  getDisabledDates,
  getMedianDate,
  getYears
} from '../utils/date-time'

import { calendar as calendarEn } from '../utils/settings/language/en/calendar'
import { calendar as calendarId } from '../utils/settings/language/id/calendar'

import { DEFAULT_LOCALE } from '../utils/settings/constants/language'
import {
  ANCHOR_ORIGIN,
  TRANSFORM_ORIGIN
} from '../utils/settings/constants/ui-control'

import { Textfield } from '../text/Textfield'
import { YearPicker } from './YearPicker'
import { CALENDAR_INPUT_FORMAT } from '../utils/settings/constants/calendar'

import 'react-day-picker/lib/style.css'

import './style.scss'

const label = { en: calendarEn, id: calendarId }

export const CalendarPicker = ({
  className,
  value,
  leftLabel,
  onChange,
  disabledDays,
  disabledDates,
  placeholder,
  disabled,
  currentMonth,
  hasError,
  hasYearList,
  errorMessage,
  locale,
  formatMessage
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [month, setMonth] = useState(currentMonth)
  moment.locale(locale)
  moment.localeData(locale)
  const calendarLabel = label[locale] || label[DEFAULT_LOCALE]

  const { shortDays } = calendarLabel

  const { before, after } = getBeforeAfter(disabledDays)
  const years = getYears(before, after)

  const disabledClass = disabled ? 'disabled' : ''

  const dateValue = value
    ? moment(value).format(CALENDAR_INPUT_FORMAT)
    : placeholder

  const modifier = {
    disabled: [...disabledDays, getDisabledDates(disabledDates)]
  }

  const handleClick = (event) => !disabled && setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const handleCaptionChange = (captionYear, captionMonth) =>
    setMonth(new Date(captionYear, captionMonth))

  const handleDayClick = (date, modifiers) => {
    if (modifiers.disabled) {
      // Day is disabled, do nothing
      return
    }

    onChange(date)
    handleClose()
  }

  useEffect(() => {
    if (currentMonth) setMonth(currentMonth)
  }, [currentMonth])

  return (
    <div className={`common calendar ${className}`}>
      <Textfield
        readOnly
        hasRightIcon
        hasLeftLabel
        hasError={hasError}
        errorMessage={errorMessage}
        leftLabel={leftLabel}
        value={dateValue}
        rightIcon='calendar'
        className={`textfield--label ${disabledClass}`}
        onClick={handleClick}
        onIconClick={handleClick}
      />
      <Menu
        keepMounted
        className='calendar--menu'
        disableScrollLock
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={ANCHOR_ORIGIN}
        transformOrigin={TRANSFORM_ORIGIN}
      >
        <DayPicker
          locale={locale}
          month={month}
          weekdaysShort={shortDays}
          onDayClick={handleDayClick}
          selectedDays={value}
          modifiers={modifier}
          captionElement={({ date }) => (
            <YearPicker
              date={date}
              years={years}
              hasYearList={hasYearList}
              formatMessage={formatMessage}
              onChange={handleCaptionChange}
            />
          )}
        />
      </Menu>
    </div>
  )
}

CalendarPicker.defaultProps = {
  leftLabel: '',
  className: '',
  placeholder: '',
  value: '',
  currentMonth: '',
  disabledDays: [], // days of the week (Sat,Sun)
  disabledDates: [], // specific dates (30th, 31st)
  disabled: false,
  hasError: false,
  hasYearList: false,
  errorMessage: '',
  locale: 'en',
  formatMessage: null
}

CalendarPicker.propTypes = {
  leftLabel: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabledDates: PropTypes.array,
  disabled: PropTypes.bool,
  hasError: PropTypes.bool,
  hasYearList: PropTypes.bool,
  errorMessage: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabledDays: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  currentMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  locale: PropTypes.oneOf(['en', 'id']),
  formatMessage: PropTypes.func
}
