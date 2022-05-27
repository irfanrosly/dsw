import React, { useState } from 'react'
import {
  Select
} from 'dyno-shared-web'
import '../../src/styles.css'
import 'dyno-shared-web/dist/index.css'
import FormControl from '@mui/material/FormControl'



const SelectScreen = () => {
  const PHONES = [
    { value: 1, label: '******** 5678' },
    { value: 2, label: '******** 8900' },
  ];

  const [state, setState] = useState({
    firstSelect: PHONES[0].value
  });

  const { firstSelect, secondSelect, thirdSelect } = state;

  const handleChange = (name, value) => setState({ ...state, [name]: value });


    return (
        <>
            <div
            style={{
              backgroundColor: 'white',
              border: '1px solid darkgrey',
              display: 'flex',
              justifyContent: 'space-evenly',
              padding: '.5rem'
            }} >
                <FormControl fullWidth>
                    <Select value={firstSelect} options={PHONES} name="firstSelect" 
                    onChange={e => handleChange('firstSelect', e.target.value)} />    
                </FormControl>
            </div>
        </>
    )
}

export default SelectScreen;