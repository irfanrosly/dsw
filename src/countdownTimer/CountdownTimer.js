import React,{ useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatDurationDisplay } from '../utils/date-time';

import { COUNTDOWN_TIMER_INTERVAL, TIMER_DURATION_END, TIMER_DURATION_FORMAT } from '../utils/settings/constants/ui-control';

export const CountdownTimer = ({ className, duration, isStart, title, onComplete, format }) => {
  const durationRef = useRef();

  useEffect(() => {
    if (isStart && durationRef) {
      const { current } = durationRef;

      const timerId = setInterval(() => {
        const timerDuration = current.getAttribute('duration');
        const timer = timerDuration - COUNTDOWN_TIMER_INTERVAL;

        if (timer === TIMER_DURATION_END) {
          onComplete();
          clearInterval(timerId);
          return;
        }

        current.innerText = formatDurationDisplay(timer, format);
        // timer will not run anymore if use setState
        current.setAttribute('duration', timer);
      }, COUNTDOWN_TIMER_INTERVAL);
    }
  }, [isStart, durationRef]);

  return (
    <div className={`common timer ${className}`}>
      <p>{title}</p>
      <p ref={durationRef} duration={duration}>
        {formatDurationDisplay(duration, format)}
      </p>
    </div>
  );
};

CountdownTimer.defaultProps = {
  isStart: false,
  onComplete: null,
  className: '',
  title: '',
  format: TIMER_DURATION_FORMAT,
};

CountdownTimer.propTypes = {
  className: PropTypes.string,
  isStart: PropTypes.bool,
  onComplete: PropTypes.func,
  title: PropTypes.string,
  format: PropTypes.string,
  duration: PropTypes.number.isRequired, // in milliseconds
};

