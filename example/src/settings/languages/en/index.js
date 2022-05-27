import { tac } from './tac';
import { login } from './login';
import { buttonText } from './buttons';
import { dashboard } from './dashboard';
import { selfUnlock } from './self-unlock';
import { registration } from './registration';
import { errorMessages } from './error-messages';
import { logout, sessionExpired } from './logout';
import { transaction } from './transaction';
import { calendar } from './calendar';
import { country } from './country';
import { lldDescription } from './lld-description';
import { digitalWealth } from './digital-wealth';
import { settings } from './settings';

// Object key must match translation message ID. ie: buttonText.continue
const English = {
  buttonText,
  dashboard,
  login,
  registration,
  tac,
  errorMessages,
  logout,
  sessionExpired,
  selfUnlock,
  transaction,
  calendar,
  country,
  lldDescription,
  digitalWealth,
  settings,
};

export default English;
