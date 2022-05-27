import React from 'react';
import PropTypes from 'prop-types';
// import './link.css';

/**
 * Primary UI component for user interaction
 */
 export const Link = ({ primary, label, href, onClick, ...props }) => {
    const mode = primary ? 'storybook-link--primary' : 'storybook-link--secondary';
    return (
      <link
        href="#"
        className={['storybook-link', `storybook-link--${href}`, mode].join(' ')}
        style={label && { label }}
        {...props}
      >
        {label}
      </link>
    );
  };
