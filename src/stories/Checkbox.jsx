import React from 'react';
import PropTypes from 'prop-types';

/**
 * Primary UI component for user interaction
 */

 export const Link = ({ primary, id, name, value, ...props }) => {
    const mode = primary ? 'storybook-checkbox--primary' : 'storybook-checkbox--secondary';
    return (
      <checkbox
        type="checkbox"
        className={['storybook-checkbox', `storybook-checkbox--${id}`, mode].join(' ')}
        style={label && { label }}
        {...props}
      >
        {label}
      </checkbox>
    );
  };