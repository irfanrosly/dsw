import * as React from 'react';
import {CheckboxScreen} from '../../src/Screen/Checkbox/CheckboxScreen'


const CheckBoxScreen = () => {
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
            <CheckboxScreen />
        </div>
        </>
    )
}
export default CheckBoxScreen;