import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
const SvgIcon = lazy(() => import('@mui/material/SvgIcon'));
const Tooltip = lazy(() => import('./Tooltip'));
export const Icon = ({ isAssetIcon, hasTooltip, type, title, placement, className, tooltipClassName, children }) => {
  
  return (
    <Suspense fallback={null}>
      {hasTooltip ? (
        <Tooltip title={title} placement={placement} className={tooltipClassName}>
          {isAssetIcon ? (
            <img src={type} alt="" className={className}/>
          ) : (
            <SvgIcon className={className}>{type}</SvgIcon>
          )}
        </Tooltip>
      ) : (
          isAssetIcon ? <img src={type} alt="" className={className}/> : 
            <SvgIcon className={className}>{type}</SvgIcon>
      )} 
    </Suspense>
  );
};

Icon.defaultProps = {
  isAssetIcon: false,
  title: '',
  type: null, // Temporarily defaulted to 'questionMark' svg
  placement: 'top',
  className: '',
  hasTooltip: false,
  tooltipClassName: '',
};

Icon.propTypes = {
  isAssetIcon: PropTypes.bool,
  type: PropTypes.any,
  title: PropTypes.node,
  hasTooltip: PropTypes.bool,
  placement: PropTypes.string,
  className: PropTypes.string,
  tooltipClassName: PropTypes.string,
};

