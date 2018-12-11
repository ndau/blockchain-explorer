import React from 'react'

function Grid(props) {
  const getColomns = (count=12) => {
    const gridValues = new Array(count).fill(`${100/count}%`);
    return gridValues.join(" ");
  }

  const customStyle = {
    padding: 0,
    display: 'grid',
    gridTemplateColumns: getColomns(props.columnCount),

    // TEMP
    border: "1px solid red"
    // TEMP.
  };

  return(
    <div style={customStyle}>
      {props.children}
    </div>
  )
}

export default Grid;