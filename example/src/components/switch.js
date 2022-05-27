import React, { useState } from 'react'
import '../../src/styles.css'
import {Switch,} from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'



const SwitchScreen = () => {
    const [state, setState] = useState({
        firstSwitch: true,
        secondSwitch: false,
      });
    
      const { firstSwitch, secondSwitch } = state;
    
      const handleChange = event => setState({ ...state, [event.target.name]: event.target.checked });
    
      return (
        <>
          <h1>Demo for Switch</h1>
    
          <p>
            <i>NOTE: The label of the switch could be change by passing different label</i>
          </p>
    
          <Switch label="Set Recurring" name="firstSwitch" isChecked={firstSwitch} onChange={handleChange} className="mv4" />
          <Switch label="Toggle Switch" name="secondSwitch" isChecked={secondSwitch} onChange={handleChange} />
        </>
      );
}

export default SwitchScreen;