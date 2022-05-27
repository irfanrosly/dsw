import { memo as reactMemo } from 'react';
import isEqual from 'lodash/isEqual';

// Memo function
// - to reduce component rerender time
export function memo(Component) {
  // Compare previous state & new state
  return reactMemo(Component, isEqual);
}
