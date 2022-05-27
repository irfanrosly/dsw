import _ from 'lodash';

// Create our own get() wrapper to handle more falsy situations
 const get = (source, path, defaultValue, callback) => {
  let value = _.get(source, path, defaultValue);
  // Use the default value for specific falsy values
  if (value === null || value === undefined || value === '') {
    value = defaultValue;
  }
  // If there is a callback passed to process the get value/defaultValue
  if (typeof callback === 'function') {
    return callback(value);
  }
  return value;
};

export {get};