import { Icon } from '../../../Icon'
import langID from 'id.svg'
import langEN from 'en.svg'

export const DEFAULT_LOCALE = 'en'
export const INDONESIA_LOCALE = 'id'

export const LANGUAGE_OPTIONS = [
  {
    label: (
      <span className='inline--icon'>
        <Icon isAssetIcon={true} type={langID} />
        ID
      </span>
    ),
    value: 'id'
  },
  {
    label: (
      <span className='inline--icon'>
        <Icon isAssetIcon={true} type={langEN} />
        EN
      </span>
    ),
    value: 'en'
  }
]
