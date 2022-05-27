import 'dyno-shared-web/dist/index.css'
import './index.css'
import './styles.scss'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import * as React from 'react'
import App from './App'
import { RadioScreen } from './components/RadioScreen'
import AvatarScreen from './components/avatar'
import ButtonScreen from './components/Button/buttonScreen'
import SelectScreen from './components/select'
import IconScreen from './components/icon'
import SwitchScreen from './components/switch'
import ToolTipScreen from './components/tooltip'
import CheckBoxScreen from './components/checkBox'
import TextFieldScreen from './components/textField'
import LinkScreen from './components/link'
import StepperScreen from './components/stepper'
import PaginationScreen from './components/pagination'
import CaptchaScreen from './components/captchaImages'
import ProgressBarScreen from './components/ProgressBar'
import LoaderScreen from './components/Loader'
import AccordionScreen from './components/Accordion'
import { CalendarScreen } from './Screen/CalendarScreen'
import { TableScreen } from './Screen/TableScreen'
import { CountdownTimerScreen } from './Screen/CountdownTimerScreen'
import { MenuScreen } from './Screen/MenuScreen'
import { TabScreen } from './Screen/TabScreen'
import { LanguageBarScreen } from './Screen/LanguageBarScreen'
import { PDFScreen } from './Screen/PDFScreen'
const rootElement = document.getElementById('root')
render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='radio' element={<RadioScreen />} />
        <Route path='avatar' element={<AvatarScreen />} />
        <Route path='button' element={<ButtonScreen />} />
        <Route path='select' element={<SelectScreen />} />
        <Route path='icon' element={<IconScreen />} />
        <Route path='switch' element={<SwitchScreen />} />
        <Route path='tooltip' element={<ToolTipScreen />} />
        <Route path='checkbox' element={<CheckBoxScreen />} />
        <Route path='textField' element={<TextFieldScreen />} />
        <Route path='link' element={<LinkScreen />} />
        <Route path='stepper' element={<StepperScreen />} />
        <Route path='pagination' element={<PaginationScreen />} />
        <Route path='captchaImages' element={<CaptchaScreen />} />
        <Route path='progressBar' element={<ProgressBarScreen />} />
        <Route path='loader' element={<LoaderScreen />} />
        <Route path='accordion' element={<AccordionScreen />} />
        <Route path='calendar' element={<CalendarScreen />} />
        <Route path='table' element={<TableScreen />} />
        <Route path='countdownTimer' element={<CountdownTimerScreen />} />
        <Route path='menu' element={<MenuScreen />} />
        <Route path='tab' element={<TabScreen />} />
        <Route path='language' element={<LanguageBarScreen />} />
        <Route path='pdfViewer' element={<PDFScreen />} />

      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
)
