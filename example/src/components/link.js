import React, { useState } from 'react'
import '../../src/styles.css'
import {Link} from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'
import { IMAGES, ICONS } from '../utils/icons'

const LinkScreen = () => {

    return (
        <>
            <div className='flex flex-row items-center mt3'>
        <Link label='Register here' className='ttc' />
        <Link label='Download Terms and Condition' className='mh4' />
        <Link label='View total donation' className='ttc link--dark' />
        <Link
          label='back'
          className='mr4 ttu link--back'
          hasLeftIcon
          icon={ICONS.get('keyboardArrowLeft')}
        />
        <Link
          label='More info'
          className='ttc link--icon right'
          hasRightIcon
          icon={ICONS.get('arrowForward')}
        />
        <div style={{ backgroundColor: 'darkgray' }}>
          <Link
            label='forgot login details'
            className='link--forgot-login'
            hasRightIcon
            icon={ICONS.get('keyboardArrowRight')}
          />
        </div>
      </div>

        </>
    )
}

export default LinkScreen;