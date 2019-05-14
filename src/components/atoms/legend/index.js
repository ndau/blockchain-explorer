import React, { Component } from 'react'
import { Box, Text } from "grommet"
import './style.css'

class Legend extends Component {
  render() {
    const { label, value, inactive } = this.props;  
    return (
      <Box 
        style={{
          opacity: inactive ? "0.1" : "1", 
          transition: "opacity 0.3s",
        }}
        direction="row"
      >
        <Box className="legendLabel" width="135px" style={{textAlign: "right", marginRight: "3px"}}>
          <Text size="small" color="#ffe7c6">{label}:</Text>
        </Box>
        <Box className="legendValue">
          <Text size="small" weight="bold">{value}</Text>
        </Box>
      </Box>
    );
  }
}

export default Legend;