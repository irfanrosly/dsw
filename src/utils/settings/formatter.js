import { get } from 'utils/lodash';

import { SUCCESS_RESPONSE_CODE } from './response-codes';

export const formatSettingsResult = data => {
  const responseCode = get(data, 'responseCode', '');
  const isSuccess = responseCode === SUCCESS_RESPONSE_CODE;
  const errorCode = !isSuccess && responseCode;

  return { ...data, isSuccess, errorCode };
};

export const formatSecurityImagesResult = images => {
  return images.map(image => {
    const value = get(image, 'value', '');
    const src = `${process.env.REACT_APP_FILE_URL}${value}`;

    return { ...image, src };
  });
};
