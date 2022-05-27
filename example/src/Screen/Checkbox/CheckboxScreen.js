import { Children, useState } from 'react'
import React from 'react'
import '../../../src/styles.css'
import { Checkbox } from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'
import { FormGroup } from '@mui/material';
import { ANIMALS } from './Demo'
export const CheckboxScreen = () => {
  const [state, setState] = useState({
    registrationTNC: false,
    referral: false,
    animalChecks: ANIMALS.map((animal) => false)
  })
  const { registrationTNC, referral, animalChecks } = state
  const handleChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.checked })
  const handleAnimalChange = (event, position) => {
    // update checked state for animal at index given by position
    const newAnimals = animalChecks.map((isChecked, index) =>
      index === position ? !isChecked : isChecked
    )

    setState({ ...state, animalChecks: newAnimals })
  }

  return (
    <>
      <div className='mt5'>
        <p>
          <i>Checkbox with multiple items</i>
        </p>
        <p>Select your animals</p>

        <FormGroup>
          {Children.toArray(
            ANIMALS.map((animal, index) => (
              <Checkbox
                variant='square'
                isChecked={animalChecks[index]}
                name={animal.name}
                value={animal.value}
                label={animal.label}
                onChange={(event) => handleAnimalChange(event, index)}
              />
            ))
          )}
        </FormGroup>
      </div>
      <Checkbox
        isChecked={registrationTNC}
        className='ttu'
        variant='round'
        onChange={handleChange}
        value='Agree'
        name='registrationTNC'
        label={
          <span>
            I agree with the&nbsp;
            <b>Terms & Conditions</b>
          </span>
        }
      />
    </>
  )
}
