import PropTypes from 'prop-types'
import React from 'react'
import {
  Accordion as MaterialAccordion,
  AccordionSummary,
  Typography
} from '@mui/material'
import { Icon } from '../Icon'
import '../Styles/index.scss'
const ACCORDION_SHADOW_ELEVATION = 0
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
export const Accordion = ({
  className,
  title,
  titleClassName,
  children,
  expandIcon,
  disabled,
  defaultExpanded
}) => {
  return (
    <MaterialAccordion
      className={`common accordion ${className}`}
      elevation={ACCORDION_SHADOW_ELEVATION}
      disabled={disabled}
      defaultExpanded={defaultExpanded}
    >
      <AccordionSummary
        className={titleClassName}
        expandIcon={<Icon type={expandIcon ?? <ExpandMoreIcon />} />}
      >
        <Typography variant='subtitle2'>{title}</Typography>
      </AccordionSummary>
      {children}
    </MaterialAccordion>
  )
}

Accordion.defaultProps = {
  className: '',
  title: '',
  titleClassName: '',
  children: null,
  expandIcon: null,
  disabled: false,
  defaultExpanded: false
}

Accordion.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  titleClassName: PropTypes.string,
  disabled: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  children: PropTypes.node,
  expandIcon: PropTypes.node
}
