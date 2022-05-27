import { useState } from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import { Select } from 'components/common';
import { get } from 'utils/lodash';

import { CREDIT_ACCOUNTS, MONTHS, PHONES } from 'settings/constants/demo';

// Example on how to customize option label with multiple items
const OptionLabel = ({ option }) => {
  const longName = get(option, 'longName', '');
  const displayNumber = get(option, 'displayNumber', '');

  return (
    <Grid container>
      <Grid item xs={6}>
        {longName}
      </Grid>
      <Grid item xs={6} container justify="flex-end" className="pr3">
        {displayNumber}
      </Grid>
    </Grid>
  );
};

OptionLabel.propTypes = { option: PropTypes.object.isRequired };

// Example on how to customize label for selected option
const SelectedLabel = ({ option }) => {
  const longName = get(option, 'longName', '');
  const balance = get(option, 'balance', '');

  return (
    <Grid container>
      <Grid item xs={6}>
        {longName}
      </Grid>
      {balance && (
        <Grid item xs={6} container justify="flex-end" className="pr4">
          Balance:&nbsp;
          <span className="green">
            MYR&nbsp;
            {balance}
          </span>
        </Grid>
      )}
    </Grid>
  );
};

SelectedLabel.propTypes = { option: PropTypes.object.isRequired };

// Example on how to reformat raw data for <Select> consumption
const newAccounts = CREDIT_ACCOUNTS.map(account => ({ ...account, label: <OptionLabel option={account} /> }));

const SelectDemo = () => {
  const [state, setState] = useState({
    firstSelect: PHONES[0].value,
    secondSelect: MONTHS[1].value,
    thirdSelect: newAccounts[0].value,
  });

  const { firstSelect, secondSelect, thirdSelect } = state;

  const handleChange = (name, value) => setState({ ...state, [name]: value });

  return (
    <>
      <h1>Demo for Select</h1>

      <p>
        <i>Dark Theme</i>
      </p>
      <div className="w-40 mb4">
        <Select value={firstSelect} options={PHONES} name="firstSelect" onChange={e => handleChange('firstSelect', e.target.value)} />
      </div>

      <p>
        <i>Light Theme</i>
      </p>
      <div className="w-30 mb4">
        <Select
          value={secondSelect}
          options={MONTHS}
          name="secondSelect"
          onChange={e => handleChange('secondSelect', e.target.value)}
          className="select-light"
        />
      </div>

      <p>
        <i>
          Select with dynamic labels. You can literally pass anything as labels, including a DOM
          <br />
          <b>renderValue</b>
          &nbsp; prop is used when you want to display other label instead of the one from dropdown list
        </i>
      </p>
      <div className="w-70 mb4">
        <Select
          value={thirdSelect}
          options={newAccounts}
          renderValue={() => <SelectedLabel option={newAccounts[thirdSelect]} />}
          name="thirdSelect"
          onChange={e => handleChange('thirdSelect', e.target.value)}
        />
      </div>

      <p>
        <em>Select with text displayed even if no items are selected.</em>
        <br />
        <em>The text not a placeholder and it is not included in option array.</em>
      </p>
      <div className="w-70">
        <Select
          value={thirdSelect}
          options={newAccounts}
          displayEmpty
          renderValue={() => <div className="black tc">You do not have an account eligible to perform this transaction</div>}
        />
      </div>
    </>
  );
};

export default SelectDemo;
