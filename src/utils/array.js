import { find, compact } from 'lodash';

// re-arrange array elements by a given order list
export const sortArrayItems = (array, orders) =>
  // cleanup array using compact to remove null element
  Array.isArray(array) && compact(orders.map(order => find(array, order) || null));

// format array elements by using given formatter & format
export const formatArrayItems = (array, formatter, format) => Array.isArray(array) && array.map(item => formatter(item, format));

// update array values of the same key/index. Returns existing items if there's nothing to update
export const updateArrayValues = (newValue, oldValue) => (Array.isArray(newValue) ? newValue.concat(oldValue) : newValue ?? oldValue);

// find element and checking if its an array
export const findArrayEntry = (array, key, value) => Array.isArray(array) && array.find(item => item[key] === value);
