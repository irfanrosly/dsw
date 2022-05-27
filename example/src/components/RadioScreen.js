import { Typography, Box } from '@mui/material';
import React from 'react'
import { Radio } from 'dyno-shared-web'



const renderLabel = (line1, line2 = '') => (
  <Typography variant="caption">
    <Box lineHeight="normal">{line1}</Box>
    <Box className="silver">{line2}</Box>
  </Typography>
);
export const RadioScreen = () => {
return (
  <>

    {/* <p>
      <i>Vertical align, variant = round, light theme</i>
    </p>
    <div className="db pa3 bg-black mv4 moon-gray">
      <Radio
        value="pink"
        className="radio-light"
        options={[
          { name: 'color', id: 'pink', value: 'pink', label: renderLabel('DIGI Reload', '016899123827') },
          { name: 'color', id: 'green', value: 'green', label: renderLabel('Indah Water', '8912398712331213') },
          { name: 'color', id: 'blue', value: 'blue', label: renderLabel('TNB', '1231239123019283') },
        ]}
        onChange={value => console.log(`value= ${value}`)}
      />
    </div> */}

   
    {/* <div className="ph4">
      <Radio
        className="flex flex-row justify-between radio-light outlined"
        variant="tick"
        value="visa"
        options={[
          { name: 'card', id: 'ikhwan', value: 'ikhwan', label: 'VISA Ikhwan Gold' },
          { name: 'card', id: 'visa', value: 'visa', label: 'Maybankard 2 VISA Gold' },
          { name: 'card', id: 'amex', value: 'amex', label: 'Maybankard 2 AMEX Gold' },
        ]}
        onChange={value => console.log(`value= ${value}`)}
      />
    </div> */}

    <div
            className="ph4"
            style={{
              backgroundColor: 'white',
              border: '1px solid darkgrey',
              display: 'flex',
              justifyContent: 'space-evenly',
              padding: '.5rem'
            }} >
      <Radio
        className="flex flex-row justify-between radio-dark"
        fullWidth
        row
        variant="tick"
        value="cc"
        options={[
          { name: 'register', id: 'an', value: 'an', label: 'Account Number' },
          { name: 'register', id: 'cc', value: 'cc', label: 'Credit Card' },
          { name: 'register', id: 'id', value: 'id', label: 'Registration ID' },
        ]}
        onChange={value => console.log(`value= ${value}`)}
      />
    </div>
  </>
);
    }
