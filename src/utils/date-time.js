import moment from 'moment-timezone'
import 'moment-duration-format'
// this plugin is required to make .format() works
import { isEmpty, has } from 'lodash'
import {
  CALENDAR_YEAR_PICKER_FORMAT,
  MEDIAN_YEAR_FACTOR,
  TODAY,
  TOMORROW,
  TOMORROW_DURATION,
  WEEKENDS,
  YEARS_GAP,
  YEARS_INCREMENT_FACTOR
} from './settings/constants/calendar'
import { HOLIDAY_DATE_FORMAT } from './settings/constants/transaction'

import { get } from './lodash'
import { formatArrayItems } from './array'

// display duration in milliseconds as mm:ss or by given format
export const formatDurationDisplay = (duration, format) => {
  // moment.duration(duration).format('HH:mm', {
  //   // if false,force to display according format length. ie: 0 is 00
  //   trim: isTrimmed,
  // }
  return moment.duration(duration).format(format);
}

// time is a moment or Date object
export const getTimeByFormat = (time, format) =>
  moment(time.format(format), format)

// startTime and endTime must be a moment or Date Object
export const getRemainingDuration = ({ startTime, endTime, unit }) =>
  endTime.diff(startTime, unit)

// returns CalendarPicker disabled dates modifiers
export const getDisabledDates = (dates) => (day) =>
  !isEmpty(dates) && dates.includes(day.getDate())

// returns past Date from x duration from today. ie: 10 years ago
// duration=10, quantifier=years
export const getMinDate = (duration, quantifier) =>
  moment().subtract(duration, quantifier).toDate()

// returns future Date from x duration from today. ie: 10 years from today
// duration=10, quantifier=years
export const getMaxDate = (duration, quantifier) =>
  moment().add(duration, quantifier).toDate()

export const getMedianDate = (startDate, endDate) => {
  const midYear =
    moment(endDate).diff(moment(startDate), 'years') / MEDIAN_YEAR_FACTOR

  return moment(startDate).add(midYear, 'years').toDate()
}

export const getAgeFromDate = (date) => moment().diff(moment(date), 'years')

// destruct Calendar modifier object to return {before,after} dates
export const getBeforeAfter = (modifier) => {
  const result = modifier.find((day) => has(day, 'before'))
  const before = get(result, 'before', TODAY)
  const after = get(result, 'after', TOMORROW)

  return { before, after }
}

// returns an array of years from startDate until endDate
export const getYears = (startDate, endDate) => {
  const dateStart = moment(startDate)
  const dateEnd = moment(endDate)
  const years = [dateStart.format(CALENDAR_YEAR_PICKER_FORMAT)]

  while (dateEnd.diff(dateStart, 'years') > YEARS_GAP) {
    dateStart.add(YEARS_INCREMENT_FACTOR, 'years')
    years.push(dateStart.format(CALENDAR_YEAR_PICKER_FORMAT))
  }
  return years
}

// check if date passed is Today
export const checkIsToday = (date) => moment(date).isSame(TODAY, 'day')

export const dateFormatter = (date, format) => moment(date).format(format)

export const isWeekend = (date) => WEEKENDS.includes(moment(date).weekday())

export const isHoliday = (date, holidays) =>
  holidays.includes(dateFormatter(date, HOLIDAY_DATE_FORMAT))

// returns a Date object
export const getNextDay = (date) =>
  moment(date).add(TOMORROW_DURATION, 'day').toDate()

// get next business day after given date (excluding Saturdays, Sundays & holidays)
export const getNextBusinessDay = (
  date,
  holidays = [],
  format = HOLIDAY_DATE_FORMAT
) => {
  let nextDate = getNextDay(date)
  const formattedHolidays = formatArrayItems(holidays, dateFormatter, format)

  // check if it's not a holiday & weekends. Else, keep adding 1 more day
  while (isHoliday(nextDate, formattedHolidays) || isWeekend(nextDate)) {
    nextDate = getNextDay(nextDate)
  }

  return nextDate
}
