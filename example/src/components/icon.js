import React, { useState } from 'react'
import '../../src/styles.css'
import {Icon,} from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'
import { IMAGES, ICONS } from '../utils/icons'

const IconScreen = () => {



    return (
        <>
        <div>
            <div>
                <Icon isAssetIcon={true} type={IMAGES.get('userRound')} className='mr2' />
            </div>
            <div>
            <Icon isAssetIcon={false}  type={ICONS.get('add')} className='mr2' />
            </div>

        </div>
            
        </>
    )
}

export default IconScreen;