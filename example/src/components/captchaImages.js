import React from 'react'
import '../../src/styles.css'
import 'dyno-shared-web/dist/index.css'
import {CaptchaImages} from 'dyno-shared-web'

const REGISTRATION_IMAGES = [
  { value: 'animal', src: 'https://www.maybank2u.com.my/maybank_gif/adapt/images/AnimalsWildlife/IAN_CL1_PX00735.jpg' },
  { value: 'travel', src: 'https://www.maybank2u.com.my/maybank_gif/adapt/images/TravelCulture/IAT_CL1_PX00767.jpg' },
  { value: 'food', src: 'https://www.maybank2u.com.my/maybank_gif/adapt/images/TravelCulture/IAT_CL1_PX00611.jpg' },
  { value: 'science', src: 'https://www.maybank2u.com.my/maybank_gif/adapt/images/BizScience/IAB_CL1_PX01456.jpg' },
];

const SETTINGS_IMAGES = [
  {
    altText: 'House and Home 207',
    backDropIdx: '',
    value: '0',
    imagepath: '',
    isCurrentTheme: null,
    imageId: '',
    src: 'https://www.maybank2u.com.my/maybank_gif/adapt/images/HouseHome/IAH1_CL1_PX00437.jpg',
  },
  {
    altText: 'House and Home 220',
    backDropIdx: '',
    value: '1',
    imagepath: '',
    isCurrentTheme: null,
    imageId: '',
    src: 'https://www.maybank2u.com.my/maybank_gif/adapt/images/HouseHome/IAH1_CL1_PX00451.jpg',
  },
  {
    altText: 'House and Home 268',
    backDropIdx: '',
    value: '2',
    imagepath: '',
    isCurrentTheme: null,
    imageId: '',
    src: 'https://www.maybank2u.com.my//maybank_gif/adapt/images/HouseHome/IAH1_CL1_PX00506.jpg',
  },
  {
    altText: 'Food and Beverages 308',
    backDropIdx: '',
    value: '3',
    imagepath: '',
    isCurrentTheme: null,
    imageId: '',
    src: 'https://www.maybank2u.com.my/maybank_gif/adapt/images/FoodBev/IAF_CL1_PX00670.jpg',
  },
  {
    altText: 'Food and Beverages 360',
    backDropIdx: '',
    value: '4',
    imagepath: '',
    isCurrentTheme: null,
    imageId: '',
    src: 'https://www.maybank2u.com.my/maybank_gif/adapt/images/FoodBev/IAF_CL1_PX01238.jpg',
  },
  {
    altText: 'Business and Technology 407',
    backDropIdx: '',
    value: '5',
    imagepath: '',
    isCurrentTheme: null,
    imageId: '',
    src: 'https://www.maybank2u.com.my/maybank_gif/adapt/images/BizScience/IAB_CL1_PX01452.jpg',
  },
  {
    altText: 'Business and Technology 431',
    backDropIdx: '',
    value: '6',
    imagepath: '',
    isCurrentTheme: null,
    imageId: '',
    src: 'https://www.maybank2u.com.my/maybank_gif/adapt/images/BizScience/IAB_CL1_PX01568.jpg',
  },
  {
    altText: 'Sports and Leisure 108',
    backDropIdx: '',
    value: '7',
    imagepath: '',
    isCurrentTheme: null,
    imageId: '',
    src: 'https://www.maybank2u.com.my/maybank_gif/adapt/images/SportsLeisure/IAS_CL1_PX00170.jpg',
  },
];

const CaptchaScreen = () => (
  <>
    <h1>Demo for Captcha</h1>
    <p>
      <i>NOTE: This is for user to set his captcha image based on the given list</i>
    </p>

    <p>
      <i>Square variant</i>
    </p>

    <CaptchaImages name="captcha1" images={REGISTRATION_IMAGES} onChange={value => console.log(value)} />

    <p>
      <i>Round variant</i>
    </p>
    <div className="flex w-50">
      <CaptchaImages name="captcha2" variant="round" images={SETTINGS_IMAGES} onChange={value => console.log(value)} />
    </div>
  </>
);

export default CaptchaScreen;