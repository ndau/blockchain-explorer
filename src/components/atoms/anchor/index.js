import React from 'react';
import { Link } from 'react-router-dom'
import { Anchor as StyledAnchor } from 'grommet';

function Anchor(props) {
  return(
    <Link 
      to={props.href} 
      onClick={props.onClick}
      style={{
        display: "inline",
        textDecoration: "none"
      }}
    >
      <StyledAnchor label={props.label}>
        {props.children}
      </StyledAnchor>
    </Link>
  )
}

export default Anchor;