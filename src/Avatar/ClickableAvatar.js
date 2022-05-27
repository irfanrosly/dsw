// import PropTypes from 'prop-types';
// import React from 'react'
// import { Avatar as MaterialAvatar, Button, Badge } from '@mui/material';
// import Icon from '../Icon';
// import './styles.scss';

// const BADGE_VERTICAL = 'top';
// const BADGE_HORIZONTAL = 'right';

// export const ClickableAvatar = ({ 
//     alt, 
//     src, 
//     label, 
//     className, 
//     selectedAvatar, 
//     onClick }) => {
//         return (
//                 <div className={`avatar ${className}`}>
//                     {label === selectedAvatar ? (
//                     <Button onClick={() => onClick(label)} className="btn--selected">
//                         <Badge
//                         overlap="circle"
//                         badgeContent={<Icon type="check" />}
//                         anchorOrigin={{ vertical: BADGE_VERTICAL, horizontal: BADGE_HORIZONTAL }}
//                         >
//                         <MaterialAvatar alt={alt} src={src} />
//                         </Badge>
//                     </Button>
//                     ) : (
//                     <Button className="btn" onClick={() => onClick(label)}>
//                         <MaterialAvatar alt={alt} src={src} />
//                     </Button>
//                     )}
//                     <h1>{label}</h1>
//                 </div>
//                 );
//             }

// ClickableAvatar.defaultProps = {
//   label: '',
//   className: '',
//   alt: 'avatar',
//   selectedAvatar: null,
// };

// ClickableAvatar.propTypes = {
//   alt: PropTypes.string,
//   label: PropTypes.string,
//   selectedAvatar: PropTypes.string,
//   src: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
//   className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
// };

