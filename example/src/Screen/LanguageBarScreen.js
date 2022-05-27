import React from 'react'
import '../styles.scss'
import { LanguageBar,Icon } from 'dyno-shared-web'
import { ICONS } from '../utils/icons'

const LANGUAGE_OPTIONS = [
    {
      label: (
        <span className="inline--icon">
          <Icon isAssetIcon={false} type={ICONS.get('langID')} />
          ID
        </span>
      ),
      value: 'id',
    },
    {
      label: (
        <span className="inline--icon">
          <Icon isAssetIcon={false} type={ICONS.get('langEN')} />
          EN
        </span>
      ),
      value: 'en',
    },
  ];
  
export const LanguageBarScreen = () => {
  return (<>
  <h1>Demo for Langauge Bar</h1>
  <div style={{backgroundColor:"white",borderRadius:"10px",border:"1px solid black"}}>
  <LanguageBar items={LANGUAGE_OPTIONS}/>

  </div>
  </>)
}
