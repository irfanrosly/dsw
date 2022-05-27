import React, { Children, useReducer } from 'react'
import '../styles.scss'
import { Tab, TabPanel,NavigationTab } from 'dyno-shared-web'
import { Typography } from '@mui/material'

import 'dyno-shared-web/dist/index.css'
const WEALTH_MENU = [
  { value: 0, label: 'My Wealth', content: 'My Assets' },
  { value: 1, label: 'My Financial Goals', content: 'Create Goals' }
]
const ASSET_MENU = [
  { value: 0, label: 'Overview', content: 'Overview' },
  { value: 1, label: 'Asset classification', content: 'Asset classification' },
  { value: 2, label: 'Borrowing classification', content: 'Borrowing classification' },
];

const SETTINGS = [
  { value: 0, label: 'Personal Info', content: 'Show email and mobile number' },
  { value: 1, label: 'Theme', content: 'Set your desired theme' },
  { value: 2, label: 'Language', content: 'Preferred language' },
];

const DASHBOARD = [
  { value: 0, label: 'Account', expandLabel: 'IDR 50,000,000', labelClass: 'green', content: 'Show account' },
  { value: 1, label: 'Fixed deposit', expandLabel: 'IDR 60,000,000', labelClass: 'green', content: 'Show Fixed deposit' },
  { value: 2, label: 'Credit card', expandLabel: 'IDR 25,000,000', labelClass: 'red', content: 'Show Credit card' },
  { value: 3, label: 'Loan', expandLabel: 'IDR 15,000,000', labelClass: 'red', content: 'Show Loan' },
  { value: 4, label: 'Investment', expandLabel: 'IDR 150,000,000', labelClass: 'green', content: 'Show Investment' },
];

export const TabScreen = () => {
  const [state, setState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      firstTabValue: 0,
      secondTabValue: 0,
      thirdTabValue: 1,
      fourthTabValue: 0
    }
  )

  const { firstTabValue, secondTabValue, thirdTabValue, fourthTabValue } = state

  const handleClick = (name, value) => setState({ [name]: value })

  return (

    <>
      <h1>Demo for Tabs</h1>
      <p className="mt4">
        <i>
          Tab items are passed as props, together with its label and onClick handler. Resize browser to see the tabs turned into dropdown on
          mobile view
        </i>
      </p>

        <h2>Navigation tabs with specific styling and Switch button</h2>
      <div className="bg-near-white pa2">
        <NavigationTab
          hasSwitch
          name="dashboard"
          options={DASHBOARD}
          value={firstTabValue}
          onChange={value => handleClick('firstTabValue', value)}
        />
        {Children.toArray(
          DASHBOARD.map((menu, index) => (
            <TabPanel name="dashboard" value={firstTabValue} index={index} className="tc pv4 ph2">
              <Typography>{menu.content}</Typography>
            </TabPanel>
          ))
        )}
      </div>

        <h2>Basic Tab</h2>
      <div className="ba pa2">
        <Tab name="wealth" options={WEALTH_MENU} value={secondTabValue} onChange={value => handleClick('secondTabValue', value)} />
        {Children.toArray(
          WEALTH_MENU.map((menu, index) => (
            <TabPanel name="wealth" value={secondTabValue} index={index} className="tc pv4 ph2">
              <Typography>{menu.content}</Typography>
            </TabPanel>
          ))
        )}
      </div>

        <h2>Tabs with underline border bottom</h2>
      <div className="bg-near-white pa2">
        <Tab
          name="assets"
          className="underlined"
          options={ASSET_MENU}
          value={thirdTabValue}
          onChange={value => handleClick('thirdTabValue', value)}
        />
        {Children.toArray(
          ASSET_MENU.map((menu, index) => (
            <TabPanel name="assets" value={thirdTabValue} index={index} className="tc pv4 ph2">
              <Typography>{menu.content}</Typography>
            </TabPanel>
          ))
        )}
      </div>

        <h2>Vertical tabs</h2>
      
      <div className="cf pv4-ns ph4-ns bg-near-white">
        <div className="fl w-100 w-40-ns pa2">
          <Tab
            elevation={1}
            name="assets"
            orientation="vertical"
            options={SETTINGS}
            value={fourthTabValue}
            onChange={value => handleClick('fourthTabValue', value)}
          />
        </div>
        <div className="fl w-100 w-60-ns pa2">
          {Children.toArray(
            SETTINGS.map((menu, index) => (
              <TabPanel name="assets" value={fourthTabValue} index={index} className="tc pa4">
                <Typography>{menu.content}</Typography>
              </TabPanel>
            ))
          )}
        </div>
      </div>
    </>
  )
}
