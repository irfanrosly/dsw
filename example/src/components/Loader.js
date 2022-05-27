import React, { useState, useEffect } from 'react'
import '../../src/styles.css'
import {Loader, BasicButton} from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'


const LoaderScreen = () => {
    //For loader Start
  const LOADING_TIME = 3000

  const [isOpen, setOpen] = useState(false)

  const toggleLoader = () => setOpen(!isOpen)

  // Auto close the loader after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setOpen(false)
    }, LOADING_TIME)
  }, [isOpen])


    return (
        <>
           <h1>Demo for Loader</h1>
            <p className='mb5 i'>
                Loader component to show loading/waiting state. Use isOpen props to
                control its visibility
            </p>
            <BasicButton
                title='Show loader'
                variant='contained'
                onClick={toggleLoader}
            />
            <Loader isOpen={isOpen} /> 

        </>
    )
}

export default LoaderScreen;