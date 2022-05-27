import { useState } from 'react';

import moment from 'moment-timezone';

import { getMedianDate, getMinDate } from 'utils/date-time';

import CalendarPicker from 'components/common/calendar';

import { CALENDAR_MODIFIER_WEEKEND } from 'settings/constants/calendar';
// For demo purpose only. Actual holiday list comes from API
import { PUBLIC_HOLIDAYS } from 'settings/constants/demo';
import { BENEFICIARY_MAX_AGE, BENEFICIARY_MIN_AGE, RECURRING_DISABLED_DATES } from 'settings/constants/transaction';

const CalendarPickerDemo = () => {
  const today = new Date();
  const [calendarDate, setDate] = useState(today);
  const [birthday, setBirthday] = useState('');
  const [label, setLabel] = useState('Today');

  const handleChange = value => {
    // Only call once onChange here to avoid datePicker misbehaviour
    setDate(value);

    // If selected day is not Today
    if (!moment(value).isSame(today, 'day')) {
      setLabel('Later');
      return;
    }

    setLabel('Today');
  };

  // Block dates after 1 month from Today. Convert it to Date object before passing to props
  const blockedFutureDate = moment(today).add(1, 'months').toDate();

  // note that this modifier are past dates
  const beforeBirthday = getMinDate(BENEFICIARY_MAX_AGE, 'years');
  const afterBirthday = getMinDate(BENEFICIARY_MIN_AGE, 'years');
  const birthdayDisabledDays = [
    {
      before: beforeBirthday,
      after: afterBirthday,
    },
  ];

  const currentBirthdayMonth = getMedianDate(beforeBirthday, afterBirthday);

  return (
    <>
      <h1>Demo for CalendarPicker</h1>

      <h3 className="mt4 mb3">
        Default date is Today. If change to other day, update leftLabel to Later or someting else.
        <br />
        Backdates and dates 1 month from Today are disabled.
      </h3>
      <div className="w-100 w-100-m w-50-l">
        <CalendarPicker
          leftLabel={label}
          value={calendarDate}
          onChange={handleChange}
          disabledDays={[{ before: today, after: blockedFutureDate }]}
        />
      </div>

      <h3 className="mt4 mb3">Calendar with the weekends disabled</h3>
      <div className="w-100 w-100-m w-50-l">
        <CalendarPicker leftLabel={label} value={calendarDate} onChange={handleChange} disabledDays={[CALENDAR_MODIFIER_WEEKEND]} />
      </div>

      <h3 className="mt4 mb3">
        Calendar with the Public Holiday, end of the months & Weekends disabled
        <br />
        Example: 22 Dec 2021 and 19 Jan 2022
      </h3>
      <div className="w-100 w-100-m w-50-l">
        <CalendarPicker
          leftLabel={label}
          value={calendarDate}
          onChange={handleChange}
          disabledDays={[CALENDAR_MODIFIER_WEEKEND, ...PUBLIC_HOLIDAYS]}
          disabledDates={RECURRING_DISABLED_DATES}
        />
      </div>

      <h3 className="mt4 mb3">Date of Birth calendar (limit from 18 y.o until 90 y.o)</h3>
      <div className="w-100 w-100-m w-50-l">
        <CalendarPicker
          hasYearList
          value={birthday}
          onChange={value => setBirthday(value)}
          disabledDays={birthdayDisabledDays}
          currentMonth={currentBirthdayMonth}
          placeholder="Select date"
        />
      </div>
    </>
  );
};

export default CalendarPickerDemo;
