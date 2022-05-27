import PropTypes from 'prop-types';
import React from 'react';
// Tab and TabPanel are used in couple
export const TabPanel = ({ children, className, name, value, index }) => {
  const isVisible = value === index;

  return (
    <div
      role="tabpanel"
      className={className}
      id={`${name}-tabpanel-${index}`}
      aria-labelledby={`${name}-tab-${index}`}
      hidden={!isVisible}
    >
      {isVisible && children}
    </div>
  );
};

TabPanel.defaultProps = { className: '', name: 'basic-tab' };

TabPanel.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

