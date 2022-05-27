import React from 'react'
import '../../../src/styles.css'
import { Textlabel, Textfield, Autocomplete } from 'dyno-shared-web'
import { Grid, TextField } from '@mui/material'
import 'dyno-shared-web/dist/index.css'
import { IMAGES, ICONS } from '../../utils/icons'
import { useReducer } from 'react'
const TELCOS = ['Altel', 'Digi', 'Celcom', 'Maxis', 'Yoodo', 'U-mobile']
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
]

export const TextfieldScreen = () => {
  const [state, setState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      username: '',
      password: '',
      loginPassword: '',
      searchValue: '',
      label: '',
      telco: '',
      description: ''
    }
  )

  const {
    username,
    password,
    loginPassword,
    searchValue,
    label,
    telco,
  } = state

  const handleChange = (name, value = '') =>
    setState({ ...state, [name]: value })

  return (
    <>
      <h1>Demo for Autocomplete</h1>

      <h3>variant = normal</h3>
      <h4>options are an array of string</h4>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Autocomplete value={telco} options={top100Films} onChange={value => handleChange('telco', value)} />

     <Autocomplete value={telco} options={top100Films}  />
     <Autocomplete value={telco} options={TELCOS}  />
  </Grid>
</Grid>
      <h2>Demo for Textfields</h2>

      <form className='mt4' autoComplete='off' noValidate>
        <>
          <h2 className='f5 lh-copy mb3'>Common inputs</h2>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Textlabel label='Enter username:' />
              <Textfield
                value={username}
                className='mt3'
                placeholder='Eg. Yang1234'
                onChange={(e) => handleChange('username', e.target.value)}
              />
            </Grid>
          </Grid>
        </>

        <Grid container spacing={3} className='mv3'>
          <Grid item xs={12} sm={6}>
            <Textlabel label='Enter password:' />
            <Textfield
              type='password'
              value={password}
              className='mt3'
              autoComplete='off'
              placeholder='Enter your password'
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </Grid>
        </Grid>

        <div className='mv4'>
          <h2 className='f5 lh-copy mb2'>
            Textfield with inline error message
          </h2>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Textfield
                hasError
                value='Some invalid value'
                errorMessage='Your value is invalid'
              />
            </Grid>
          </Grid>
        </div>

        <div className='mv4'>
          <h2 className='f5 lh-copy mb2'>Disabled/Read-only textfield</h2>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Textfield
                disabled
                readOnly
                value='This field is read only.'
                className='mt3'
              />
            </Grid>
          </Grid>
        </div>

        <>
          <h2 className='f5 lh-copy mb2'>Textfield with end label</h2>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Textfield
                hasRightLabel
                rightLabel='umur'
                value={label}
                placeholder='eg. 18'
                className='mt3 textfield--label'
                onChange={(e) => handleChange('label', e.target.value)}
              />
            </Grid>
          </Grid>
        </>

        <>
          <h2 className='f5 lh-copy mt3'>Textfield with Start label</h2>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Textfield
                hasLeftLabel
                leftLabel='Today'
                value={label}
                placeholder='11 November 2021'
                className='textfield--label'
                onChange={(e) => handleChange('label', e.target.value)}
              />
            </Grid>
          </Grid>
        </>

        <div className='mt4'>
          <h2 className='f5 lh-copy mb2'>Textfields with icons & actions</h2>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Textfield
                isLeftAsset
                hasLeftIcon
                hasRightIcon
                rightIcon={ICONS.get('close')}
                leftIcon={IMAGES.get('userRound')}
                value={loginPassword}
                placeholder='My Password'
                className='mt3 textfield--login'
                onIconClick={() => handleChange('loginPassword', '')}
                onChange={(e) => handleChange('loginPassword', e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Textfield
                hasLeftIcon
                leftIcon={ICONS.get('search')}
                value={searchValue}
                placeholder='Search something...'
                className='mt3 textfield--icon'
                onChange={(e) => handleChange('searchValue', e.target.value)}
              />
            </Grid>
          </Grid>
        </div>
      </form>
    </>
  )
}
