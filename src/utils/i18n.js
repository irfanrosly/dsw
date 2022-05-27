import flatten from 'flat';
import { createIntl, createIntlCache } from 'react-intl';

import { store } from 'providers/store';

import en from 'settings/languages/en';
import id from 'settings/languages/id';

// This is optional but highly recommended since it prevents memory leak
const cache = createIntlCache();

const { LanguageReducer } = store.getState();
const { locale } = LanguageReducer;

const messages = { en, id };

const intl = createIntl(
  {
    locale,
    // intl only accepts flatten message descriptors
    messages: flatten(messages[locale]),
  },
  cache
);

// use this function to translate message Id outside of React components
// defaultMessage is fallback if translation is missing
export const translate = (messageId, defaultMessage = '') => intl.formatMessage({ id: messageId, defaultMessage });
