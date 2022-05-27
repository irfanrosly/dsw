import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { get } from './utils/lodash'
import './Styles/index.scss'

export const CaptchaImages = ({
  variant,
  images,
  onChange,
  name,
  selectedValue,
  itemColumnSize,
  className
}) => (
  <Grid
    container
    spacing={4}
    className={`common captcha-images ${variant} ${className}`}
  >
    {Children.toArray(
      images.map((img, index) => {
        const src = get(img, 'src', '')
        const value = get(img, 'value', '')
        const isChecked = selectedValue === value
        return (
          <Grid item xs={itemColumnSize}>
            <label htmlFor={`captcha_${name}_${index}`}>
              <input
                type='radio'
                name={name}
                value={value}
                checked={isChecked}
                id={`captcha_${name}_${index}`}
                onChange={(e) => onChange(e.target.value)}
              />
              <img src={src} alt={src} />
            </label>
          </Grid>
        )
      })
    )}
  </Grid>
)

CaptchaImages.defaultProps = {
  className: '',
  selectedValue: '',
  variant: 'square', // or round
  itemColumnSize: 'auto'
}

CaptchaImages.propTypes = {
  className: PropTypes.string,
  selectedValue: PropTypes.string,
  itemColumnSize: PropTypes.number,
  name: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['round', 'square'])
}
