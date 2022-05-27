import React, { lazy } from 'react'

import TacTimer from '../assets/icons/tac-timer.svg'
import UserRound from '../assets/icons/user-rounded.svg'
import ListRounded from '../assets/icons/list-rounded.svg'
import CheckboxRound from '../assets/icons/checkbox-round.svg'
import CheckboxSquare from '../assets/icons/checkbox-square.svg'
import SelectDropdown from '../assets/icons/select-dropdown.svg'
import RadioSelectedDark from '../assets/icons/radio-selected-dark.svg'
import RadioSelectedTick from '../assets/icons/radio-selected-tick.svg'
import RegisterUserAvatar from '../assets/icons/register-user-avatar.svg'
import RadioSelectedLight from '../assets/icons/radio-selected-light.svg'
import QuestionMarkRounded from '../assets/icons/question-mark-rounded.svg'
// import RadioUnselectedDark from '../assets/icons/radio-unselected-dark.svg';
// import RadioUnselectedTick from '../assets/icons/radio-unselected-tick.svg';
import RadioUnselectedLight from '../assets/icons/radio-unselected-light.svg'
import CheckboxRoundChecked from '../assets/icons/checkbox-round-checked.svg'
import CheckboxSquareChecked from '../assets/icons/checkbox-square-checked.svg'
import RadioSelectedTickLight from '../assets/icons/radio-selected-tick-light.svg'
import RadioUnselectedTickLight from '../assets/icons/radio-unselected-tick-light.svg'
import SidebarMenu from '../assets/icons/sidebar-menu.svg'
import Logout from '../assets/icons/logout.svg'
import LogoutCircled from '../assets/icons/logout-circled.svg'
import GetLoan from '../assets/icons/get-loan.svg'
import MaybankCards from '../assets/icons/maybank-cards.svg'
import InsureMe from '../assets/icons/insure-me.svg'
import OpenAccount from '../assets/icons/open-account.svg'
import Branches from '../assets/icons/branches.svg'
import Covid19 from '../assets/icons/covid19.svg'
import ClockWhite from '../assets/icons/clock-white.svg'
import LangID from '../assets/icons/id.svg'
import LangEN from '../assets/icons/en.svg'
import Delete from '../assets/icons/delete.svg'
import Lock from '../assets/icons/lock.svg'
import ZoomIn from '../assets/icons/zoom-in.svg'
import ZoomOut from '../assets/icons/zoom-out.svg'
import ProfileWhite from '../assets/icons/profile-white.svg'
import BondsIcon from '../assets/icons/bonds.png'
import InsuranceIcon from '../assets/icons/insurance.png'
import MutualFundsIcon from '../assets/icons/mutual-funds.png'
import ArrowRightYellow from '../assets/icons/arrow-right-yellow.svg'
import ArrowLeftYellow from '../assets/icons/arrow-left-yellow.svg'
import Edit from '../assets/icons/edit.svg'
import Education from '../assets/icons/education.svg'
import Investment from '../assets/icons/max-investment.svg'
import Pension from '../assets/icons/pension.svg'
import OtherGoal from '../assets/icons/other-goal.svg'
import InvestmentProduct from '../assets/icons/investment-product.svg'
import LockLarge from '../assets/icons/lock-large.svg'
import EyeOpen from '../assets/icons/eye-open.svg'
import EyeClose from '../assets/icons/eye-close.svg'

const AddIcon = lazy(() => import('@mui/icons-material/Add'))
const InfoIcon = lazy(() => import('@mui/icons-material/Info'))
const EditIcon = lazy(() => import('@mui/icons-material/Edit'))
const CheckIcon = lazy(() => import('@mui/icons-material/Check'))
const CloseIcon = lazy(() => import('@mui/icons-material/Close'))
const SearchIcon = lazy(() => import('@mui/icons-material/Search'))
const MenuIcon = lazy(() => import('@mui/icons-material/MoreHoriz'))
const SyncAltIcon = lazy(() => import('@mui/icons-material/SyncAlt'))
const BusinessIcon = lazy(() => import('@mui/icons-material/Business'))
const ArrowForwardIcon = lazy(() => import('@mui/icons-material/ArrowForward'))
const ArrowRightAltIcon = lazy(() =>
  import('@mui/icons-material/ArrowRightAlt')
)
const SystemUpdateAltIcon = lazy(() =>
  import('@mui/icons-material/SystemUpdateAlt')
)
const KeyboardArrowLeftIcon = lazy(() =>
  import('@mui/icons-material/KeyboardArrowLeft')
)
const KeyboardArrowRightIcon = lazy(() =>
  import('@mui/icons-material/KeyboardArrowRight')
)
const KeyboardArrowDownIcon = lazy(() =>
  import('@mui/icons-material/KeyboardArrowDown')
)
const InboxIcon = lazy(() => import('@mui/icons-material/MailOutline'))
const SettingsIcon = lazy(() => import('@mui/icons-material/Settings'))
const AddCircle = lazy(() => import('@mui/icons-material/AddCircle'))
const ExpandLessIcon = lazy(() => import('@mui/icons-material/ExpandLess'))
const ExpandMoreIcon = lazy(() => import('@mui/icons-material/ExpandMore'))
const CalendarIcon = lazy(() => import('@mui/icons-material/DateRange'))
const FavoriteIcon = lazy(() => import('@mui/icons-material/StarOutline'))
const BackspaceIcon = lazy(() =>
  import('@mui/icons-material/KeyboardBackspace')
)
const SyncIcon = lazy(() => import('@mui/icons-material/Sync'))
const DotIcon = lazy(() => import('@mui/icons-material/FiberManualRecord'))

// Note: SVG icons from assets folder
export const IMAGES = new Map([
  ['userRound', UserRound],
  ['listRound', ListRounded],
  ['checkboxRound', CheckboxRound],
  ['checkboxSquare', CheckboxSquare],
  ['questionMark', QuestionMarkRounded],
  ['registerAvatar', RegisterUserAvatar],
  ['checkboxRoundChecked', CheckboxRoundChecked],
  ['checkboxSquareChecked', CheckboxSquareChecked],
  // ['radioUnselected', RadioUnselectedDark],
  // ['radioUnselectedLight', RadioUnselectedLight],
  // ['radioUnselectedTick', RadioUnselectedTick],
  // ['radioUnselectedTickLight', RadioUnselectedTickLight],
  ['radioSelected', RadioSelectedDark],
  ['radioSelectedLight', RadioSelectedLight],
  ['radioSelectedTick', RadioSelectedTick],
  ['radioSelectedTickLight', RadioSelectedTickLight],
  ['selectDropdown', SelectDropdown],
  ['sidebarMenu', SidebarMenu],
  ['tacTimer', TacTimer],
  ['logout', Logout],
  ['logoutCircled', LogoutCircled],
  ['getLoan', GetLoan],
  ['maybankCards', MaybankCards],
  ['insureMe', InsureMe],
  ['openAccount', OpenAccount],
  ['branches', Branches],
  ['covid19', Covid19],
  ['clockWhite', ClockWhite],
  ['langEN', LangEN],
  ['langID', LangID],
  ['delete', Delete],
  ['lock', Lock],
  ['zoomIn', ZoomIn],
  ['zoomOut', ZoomOut],
  // [WEALTH_MUTUAL_FUND, MutualFundsIcon], // mutualfund type
  // [WEALTH_BOND_FUND, BondsIcon], // bond type
  // [WEALTH_BANCA_FUND, InsuranceIcon], // bancassurance type
  ['bonds', BondsIcon],
  ['mutualFunds', MutualFundsIcon],
  ['bancassurances', InsuranceIcon],
  ['profileWhite', ProfileWhite],
  ['arrowRightYellow', ArrowRightYellow],
  ['arrowLeftYellow', ArrowLeftYellow],
  ['edit', Edit],
  ['pension', Pension],
  ['education', Education],
  ['investment', Investment],
  ['otherGoal', OtherGoal],
  ['investmentProduct', InvestmentProduct],
  ['lockLarge', LockLarge],
  ['eyeOpen', EyeOpen],
  ['eyeClose', EyeClose],
  ['default', null]
])

// Note: Material icons
export const ICONS = new Map([
  ['add', <AddIcon />],
  ['addCircle', <AddCircle />],
  ['edit', <EditIcon />],
  ['check', <CheckIcon />],
  ['menu', <MenuIcon />],
  ['info', <InfoIcon />],
  ['inbox', <InboxIcon />],
  ['close', <CloseIcon />],
  ['search', <SearchIcon />],
  ['settings', <SettingsIcon />],
  ['business', <BusinessIcon />],
  ['syncArrowAlt', <SyncAltIcon />],
  ['download', <SystemUpdateAltIcon />],
  ['arrowForward', <ArrowForwardIcon />],
  ['arrowRightAlt', <ArrowRightAltIcon />],
  ['keyboardArrowLeft', <KeyboardArrowLeftIcon />],
  ['keyboardArrowRight', <KeyboardArrowRightIcon />],
  ['keybaordArrowDown', <KeyboardArrowDownIcon />],
  ['expandLess', <ExpandLessIcon />],
  ['expandMore', <ExpandMoreIcon />],
  ['calendar', <CalendarIcon />],
  ['favorite', <FavoriteIcon />],
  ['backspace', <BackspaceIcon />],
  ['sync', <SyncIcon />],
  ['dot', <DotIcon />],
  [('default', null)]
])
