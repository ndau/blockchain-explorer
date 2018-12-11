import React from 'react'

function Container(props) {
  const customStyle = {
    paddingLeft: props.paddingLeft || "5%",
    paddingRight: props.paddingRight || "5%",
    paddingTop: props.paddingTop || 0,
    paddingBottom: props.paddingBottom || 0,
  };

  return(
    <div style={customStyle}>
      {props.children}
    </div>
  )
}

export default Container;