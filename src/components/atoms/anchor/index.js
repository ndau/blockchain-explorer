import React from 'react';
import { Link } from 'react-router-dom'
import { Anchor as StyledAnchor } from 'grommet'
import { makeURLQuery } from '../../../helpers'

function Anchor(props) {
  return(
    <Link 
      to={`${props.href}${makeURLQuery(props.additionalQuery)}`}
      onClick={props.onClick}
      style={{ textDecoration: "none" }}
    >
      <StyledAnchor label={props.label} as="span">
        {props.children}
      </StyledAnchor>
    </Link>
  )
}

export default Anchor;