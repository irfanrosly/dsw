import PropTypes from 'prop-types';
import React from 'react';
import { Switch as MaterialSwitch, FormControlLabel, FormGroup } from '@mui/material';

export const Switch = ({ name, label, isChecked, onChange, className }) => {
  return (
    <FormGroup className={`${className} common switch`}>
      <FormControlLabel label={label} control={<MaterialSwitch name={name} checked={isChecked} onChange={onChange} disableRipple />} />
    </FormGroup>
  );
};

Switch.defaultProps = {
  name: '',
  label: '',
  className: '',
  isChecked: false,
};

Switch.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func, //PropTypes.func.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

