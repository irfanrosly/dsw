import moment from 'moment-timezone';

export const TODAY = new Date();
// 1 day from Today
export const TOMORROW_DURATION = 1;
export const TOMORROW = moment(TODAY).add(TOMORROW_DURATION, 'day').toDate();

// index of day in the Calendar. 0 = Sunday, 1 = Monday etc
export const SATURDAY = 6;
export const SUNDAY = 0;
export const WEEKENDS = [SATURDAY, SUNDAY];

// CalendarPicker modifiers
export const CALENDAR_MODIFIER_WEEKEND = { daysOfWeek: WEEKENDS };

// For CalendarPicker momentjs format. Ex: 11 November 2021
export const CALENDAR_INPUT_FORMAT = 'D MMMM YYYY';
export const CALENDAR_YEAR_PICKER_FORMAT = 'YYYY';

export const YEARS_GAP = 0;
export const YEARS_INCREMENT_FACTOR = 1;
export const MEDIAN_YEAR_FACTOR = 2;
