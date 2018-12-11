import React from 'react'

function Column(props) {
  const customStyle = {
    gridColumnStart: props.start || 1,
    gridColumnEnd: props.end || 'span 12',
    padding: 0,
    margin: 0,

    // TEMP
    border: "1px solid yellow"
    // TEMP.
  };

  return(
    <div style={customStyle}>
      {props.children}
    </div>
  )
}

export default Column;