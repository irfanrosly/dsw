import React from 'react'
import '../src/styles.css'
import 'dyno-shared-web/dist/index.css'
import { Outlet, Link } from 'react-router-dom'
const items = [
  { id: 1, link: '/radio', name: 'Radio' },
  { id: 2, link: '/avatar', name: 'Avatar' },
  { id: 3, link: '/icon', name: 'Icon' },
  { id: 4, link: '/checkbox', name: 'Checkbox' },
  { id: 5, link: '/tooltip', name: 'Tooltip' },
  { id: 6, link: '/switch', name: 'Switch' },
  { id: 7, link: '/select', name: 'Select' },
  { id: 8, link: '/button', name: 'Button' },
  { id: 9, link: '/textField', name: 'Text Field' },
  { id: 10, link: '/stepper', name: 'Stepper' },
  { id: 11, link: '/link', name: 'Link' },
  { id: 12, link: '/pagination', name: 'Pagination' },
  { id: 13, link: '/captchaImages', name: 'Captcha Images' },
  { id: 14, link: '/progressBar', name: 'Progress Bar' },
  { id: 15, link: '/loader', name: 'Loader' },
  { id: 16, link: '/accordion', name: 'Accordion' },
  { id: 17, link: '/calendar', name: 'Calendar' },
  { id: 18, link: '/table', name: 'Table' },
  { id: 19, link: '/countdownTimer', name: 'Timer' },
  { id: 20, link: '/menu', name: 'Menu' },
  { id: 21, link: '/tab', name: 'Tab' },
  { id: 22, link: '/language', name: 'Language Bar' },
  { id: 23, link: '/pdfviewer', name: 'PDF Viewer' },

]
const App = () => {
  return (
    <div style={{ padding: '4rem', width: '600px' }}>
      <h1>M2U Components</h1>
      <nav className='routeContainer'>
        {items.map((item) => (
          <Link className='route' key={item.id} to={item.link}>
            {item.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  )
}

export default App
