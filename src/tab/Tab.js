import React,{ Children, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import {Paper,Tabs as MaterialTabs, Tab as MaterialTab} from '@mui/material';

import { get } from '../utils/lodash';

import { TAB_INDICATOR_DELAY } from '../utils/settings/constants/ui-control';

// dropdown for mobile view
import {Select} from '../Select';

import './style.scss';

// for accessibility
const a11yProps = (name, index) => ({
  id: `${name}-tab-${index}`,
  'aria-controls': `${name}-tabpanel-${index}`,
});

// Tab and TabPanel are used in couple
export const Tab = ({ centered, className, elevation, name, value, onChange, options, orientation }) => {
  const tabsRef = useRef(null);

  const handleChange = (event, newValue) => onChange(newValue);

  const handleSelect = event => onChange(event.target.value);

  // to fix Indicator not displaying when navigation has changed
  useEffect(() => {
    setTimeout(() => {
      if (tabsRef.current) {
        tabsRef.current.updateIndicator();
      }
    }, TAB_INDICATOR_DELAY);
  }, [value]);

  return (
    <div className={`tabs ${orientation} ${className}`}>
      <Select value={value} options={options} name={name} onChange={handleSelect} className=" tabs--mobile" />

      <Paper elevation={elevation}>
        <MaterialTabs
          action={tabsRef}
          orientation={orientation}
          centered={centered}
          value={value}
          onChange={handleChange}
          aria-label={`${name} tabs`}
        >
          {Children.toArray(
            options.map((option, index) => {
              const label = get(option, 'label', '');

              return <MaterialTab label={label} {...a11yProps(name, index)} />;
            })
          )}
        </MaterialTabs>
      </Paper>
    </div>
  );
};

Tab.defaultProps = {
  centered: false,
  className: '',
  elevation: 0,
  name: 'basic-tab',
  value: 0,
  orientation: 'horizontal',
};

Tab.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
  elevation: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.any,
  orientation: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

