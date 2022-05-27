import { Typography, Paper } from '@mui/material'
import React from 'react'
import '../styles.scss'
import { Accordion } from 'dyno-shared-web'
import { IMAGES, ICONS } from '../utils/icons'

const CustomTitle = () => (
  <>
    <Typography>Include my BPJS Ketenagakerjaan (Optional)</Typography>
    <Typography variant='caption'>
      Get more accurate calculation for your retirement plan by including your
      BPJS Ketenagakerjaan.
    </Typography>
  </>
)

const AccordionScreen = () => {
  return (
    <div>
      <h1>Demo for Accordion </h1>
      <div className='mt3' />
      <h2>1. Accordion default</h2>
      <Accordion title='Demo 1'>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
          commodi inventore laborum minus officiis quas recusandae. Atque ea
          eveniet provident reiciendis soluta tenetur, voluptate. Accusantium
          asperiores commodi minima sequi voluptatum.
        </div>
      </Accordion>

      <h2>2. Accordion disabled with no icon</h2>
      <div className='mt3' />
      <Accordion title='Demo 2' disabled expandIcon='default'>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
          commodi inventore laborum minus officiis quas recusandae. Atque ea
          eveniet provident reiciendis soluta tenetur, voluptate. Accusantium
          asperiores commodi minima sequi voluptatum.
        </div>
      </Accordion>

      <h2>3. Accordion Custom Icon</h2>
      <div className='mt3' />
      <Accordion title='Demo 3' expandIcon={ICONS.get("arrowForward")}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
          commodi inventore laborum minus officiis quas recusandae. Atque ea
          eveniet provident reiciendis soluta tenetur, voluptate. Accusantium
          asperiores commodi minima sequi voluptatum.
        </div>
      </Accordion>

      <h2>4. Accordion Default Expanded</h2>
      <div className='mt3' />
      <Accordion title='Demo 4' defaultExpanded>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
          commodi inventore laborum minus officiis quas recusandae. Atque ea
          eveniet provident reiciendis soluta tenetur, voluptate. Accusantium
          asperiores commodi minima sequi voluptatum.
        </div>
      </Accordion>

      <div className='mt4 ba pa2'>
        <h2>5. Custom Title and no background</h2>
        <Accordion title={<CustomTitle />} className="demo bpjs-accordion">
          <Paper elevation={2}>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
              commodi inventore laborum minus officiis quas recusandae. Atque ea
              eveniet provident reiciendis soluta tenetur, voluptate.
              Accusantium asperiores commodi minima sequi voluptatum.
            </div>
          </Paper>
        </Accordion>
      </div>
    </div>
  )
}

export default AccordionScreen
