import * as React from 'react';
import {Basic} from '../../Screen/Button/Basic'
import {Action} from '../../Screen/Button/Action'
import {IconBtn} from '../../Screen/Button/IconBtn'

const ButtonScreen = () => {
    return (
        <>
        <div>
            <h1 style={{ textDecoration: 'underline' }}>Basic Button</h1>
            <Basic />

            <h1 style={{ textDecoration: 'underline' }}>Action Button</h1>
            <Action />

            <h1 style={{ textDecoration: 'underline' }}>Icon Button</h1>   
            <IconBtn />
        </div>
        </>
    )
}
export default ButtonScreen;