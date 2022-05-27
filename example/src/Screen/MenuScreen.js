import React from 'react'
import '../styles.scss'
import { Menu } from 'dyno-shared-web'

const MENU_ITEMS = [
  { label: 'View Statement', option: 'statement' },
  { label: 'Pay Card', option: 'pay card' }
]

const ACCOUNT_ITEMS = [
  { label: 'View Details', option: 'details' },
  { label: 'Pay Bills', option: 'bills' },
  { label: 'Transfer Funds', option: 'transfer' },
  { label: 'View Statements', option: 'statement' },
  { label: 'Make FD Placement', option: 'FD' },
  { label: 'Edit Account Name', option: 'Edit account' },
  { label: 'Conversion to Maybank One Solution', option: 'conversion' }
]

export const MenuScreen = () => {
  // Parent function, label is your callback value from children
  const handleClick = (option) => {
    // example on handling different use-case
    switch (option) {
      case 'details':
      case 'statement':
        alert(option)
        break
      default:
        console.log(`Go to ${option}....`)
    }
  }

  return (
    <>
      <h1>Demo for Menu</h1>
      <p className='mt5'>
        <i>
          Menu items are passed as props, together with its label and onClick
          handler
        </i>
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            width: '50px',
            backgroundColor: '#202124',
            borderRadius: '10px'
          }}
        >
          <Menu menuItems={MENU_ITEMS} onItemClick={handleClick} />
        </div>
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            width: '50px',
            backgroundColor: '#202124',
            borderRadius: '10px'
          }}
        >
          <Menu menuItems={ACCOUNT_ITEMS} onItemClick={handleClick} />
        </div>
      </div>
    </>
  )
}
