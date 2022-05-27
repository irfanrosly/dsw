import React,{ useState, useRef } from 'react';
import PropTypes from 'prop-types';

import {Typography} from '@mui/material';

import { get } from '../utils/lodash';

import {Icon} from '../Icon';

// customize TabLabel with multiple items and collapsible panel
export const TabLabel = ({ id, hasDropdown, item, isVisible, onExpanded, tabIndex, setDropdownPosition }) => {
  const [isExpanded, setExpanded] = useState(false);
  const tabReference = useRef(null);

  const label = get(item, 'label', '');
  const balanceDisplay = get(item, 'balanceDisplay', '');
  const labelClass = get(item, 'labelClass', '');
  const expandIcon = isExpanded ? 'expandLess' : 'expandMore';

  const handleDropdown = event => {
    // prevent navigation for IE
    window.event.cancelBubble = true;
    // prevent navigation for other browsers
    event.stopPropagation();
    // toggle dropdown
    setExpanded(!isExpanded);
    onExpanded(id);

    // pass back reference's position
    setDropdownPosition(tabReference.current.getBoundingClientRect());
  };

  return (
    <div ref={tabReference}>
      <Typography className="ttu tab--label">
        {label}
        {hasDropdown && isVisible && (
          <i className="tab--expand-btn" role="button" onClick={handleDropdown} tabIndex={tabIndex} onKeyPress={handleDropdown}>
            <Icon isAssetIcon={false} type={expandIcon} />
          </i>
        )}
      </Typography>

      {isVisible && <Typography className={`${labelClass} tab--expand-label`}>{balanceDisplay}</Typography>}
    </div>
  );
};

TabLabel.defaultProps = {
  id: '',
  hasDropdown: false,
  onExpanded: null,
  tabIndex: 0,
  setDropdownPosition: null,
};

TabLabel.propTypes = {
  id: PropTypes.string,
  hasDropdown: PropTypes.bool,
  onExpanded: PropTypes.func,
  tabIndex: PropTypes.number,
  setDropdownPosition: PropTypes.func,
  item: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

