import React from 'react';
import { Box } from 'grommet';

function Container(props) {
  return(
    <Box 
      style={{
        width: "90%",
        maxWidth: "900px", 
        margin: "0 auto",
        paddingTop: props.topPad || "60px"
      }}
    >
      {props.children}
    </Box>
  )
}

export default Container;