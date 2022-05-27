import React,{ Children, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Button, Collapse, Paper, Tabs as MaterialTabs, Tab as MaterialTab, Typography } from '@mui/material';

import isEmpty from 'lodash/isEmpty';

import { get } from '../utils/lodash';
import { findArrayEntry } from '../utils/array';

import { TAB_INDICATOR_DELAY } from '../utils/settings/constants/ui-control';

import {Select} from '../Select';
import {Switch} from '../Switch';
import {TabLabel} from './TabLabel';

import './style.scss';

// for accessibility
const a11yProps = (name, index) => ({
  id: `${name}-tab-${index}`,
  'aria-controls': `${name}-tabpanel-${index}`,
});

// format label for Mobile view
const formatMobileOptions = (options, isVisible) =>
  options.map(option => ({ ...option, label: <TabLabel item={option} isVisible={isVisible} /> }));

// Specific tab for pages navigation with Switch
export const NavigationTab = ({ className, elevation, name, value, onChange, options, hasLink, hasSwitch, hasCollapse, collapse }) => {
  const [isVisible, setVisibility] = useState(true);
  const [isExpanded, setExpanded] = useState(false);
  const [menu, setMenu] = useState([]);
  const [position, setPosition] = useState({});
  const tabsRef = useRef(null);

  const mobileOptions = formatMobileOptions(options, isVisible);

  // NOTE: when `value`(slug) not exists in options it will throw error, thus the reason of this logic were implemented
  const isSlugExists = findArrayEntry(mobileOptions, 'value', value);

  const toggleSwitch = event => setVisibility(event.target.checked);

  const handleChange = (event, newValue) => onChange(newValue);

  // NOTE: onClose were used since pressing on same option will not trigger this function when using onChange
  const handleSelect = event => {
    const selectedValue = event.currentTarget.getAttribute('data-value');
    return selectedValue && onChange(selectedValue);
  };

  const handleExpanded = type => {
    setMenu(collapse[type]);
    setExpanded(!isExpanded);
  };

  // dropdown position relative to its tab
  const setDropdownPosition = ({ left }) => setPosition({ left });

  // to fix Indicator not displaying when navigation has changed
  useEffect(() => {
    setTimeout(() => {
      if (tabsRef.current) {
        tabsRef.current.updateIndicator();
      }
    }, TAB_INDICATOR_DELAY);
  }, [value]);

  return (
    <div className={`tabs dashboard ${className}`}>
      <Paper elevation={elevation}>
        {isSlugExists && (
          <Select
            value={value}
            options={mobileOptions}
            name={name}
            onChange={handleSelect}
            onClose={handleSelect}
            className="tabs--mobile dashboard"
          />
        )}
        <MaterialTabs action={tabsRef} value={value} onChange={handleChange} aria-label={`${name} tabs`}>
          {Children.toArray(
            options.map((option, index) => {
              const tabValue = get(option, 'value', index);
              const accountType = get(option, 'type', '');
              const link = get(option, 'link', '');
              const currencies = get(collapse, accountType, []);
              const hasDropdown = !isEmpty(currencies);
              const component = hasLink ? Link : Button;

              return (
                <MaterialTab
                  component={component}
                  to={link}
                  value={tabValue}
                  label={
                    <TabLabel
                      id={accountType}
                      hasDropdown={hasDropdown}
                      item={option}
                      isVisible={isVisible}
                      onExpanded={handleExpanded}
                      setDropdownPosition={setDropdownPosition}
                    />
                  }
                  {...a11yProps(name, index)}
                />
              );
            })
          )}
        </MaterialTabs>
        {hasSwitch && <Switch name="dashboardSwitch" isChecked={isVisible} onChange={toggleSwitch} />}
      </Paper>

      {hasCollapse && (
        <Collapse className="tab--collapse" in={isExpanded}>
          <Paper elevation={elevation}>
            <div style={position} className="tab--collapse-item">
              {Children.toArray(
                menu.map(menuItem => {
                  const balanceDisplay = get(menuItem, 'balanceDisplay', '');

                  return <Typography>{balanceDisplay}</Typography>;
                })
              )}
            </div>
          </Paper>
        </Collapse>
      )}
    </div>
  );
};

NavigationTab.defaultProps = {
  className: '',
  elevation: 1,
  name: 'dashboard',
  value: 0,
  hasSwitch: false,
  hasLink: false,
  hasCollapse: false,
  collapse: null,
};

NavigationTab.propTypes = {
  collapse: PropTypes.any,
  className: PropTypes.string,
  elevation: PropTypes.number,
  hasLink: PropTypes.bool,
  hasSwitch: PropTypes.bool,
  hasCollapse: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

