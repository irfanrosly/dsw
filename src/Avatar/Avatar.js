import PropTypes from 'prop-types';
import React from 'react'
import './styles.scss'
import { Avatar as MaterialAvatar, Badge } from '@mui/material';


const BADGE_VERTICAL = 'top';
const BADGE_HORIZONTAL = 'right';

export const Avatar = ({ 
    src, 
    alt, 
    className, 
    hasBadge, 
    badgeContent }) => {
        return (
            <div className={`avatar ${className}`}>
                {hasBadge ? (
                <Badge overlap="circle" badgeContent={badgeContent} anchorOrigin={{ vertical: BADGE_VERTICAL, horizontal: BADGE_HORIZONTAL }}>
                    <MaterialAvatar alt={alt} src={src} />
                </Badge>
                ) : (
                <MaterialAvatar alt={alt} src={src} />
                )}
            </div>
            );
        }

Avatar.defaultProps = { 
    alt: '', 
    className: '', 
    hasBadge: false, 
    badgeContent: null,
};

Avatar.propTypes = {
  alt: PropTypes.string,
  hasBadge: PropTypes.bool,
  badgeContent: PropTypes.node,
  src: PropTypes.string, //PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
