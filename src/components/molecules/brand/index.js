import React from 'react'

function Brand(props) {

  const customStyle = {
    padding: 0,
  };

  return(
    <div style={customStyle}>
      {props.children}
    </div>
  )
}

export default Brand;