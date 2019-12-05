import React, { Component } from 'react'
import { Box, Text } from "grommet"
import Keyword from '../../molecules/keyword'
import './style.css'

class Legend extends Component {
  render() {
    const { label, value, inactive, keyword } = this.props
    return (
      <Box 
        style={{
          opacity: inactive ? "0.1" : "1", 
          transition: "opacity 0.3s",
          height: "25px"
        }}
        direction="row"
      > 
        <Box className="legendLabel" style={{textAlign: "right", marginRight: "3px", minWidth: "135px"}}>
          <Text size="small" color="#ffe7c6">

            { 
<<<<<<< HEAD
              keyword && 
              <Text margin={{right: "xxsmall"}}><Keyword keyword={keyword} /></Text>
=======
              keyword &&
              <Text margin={{right: "xxsmall"}} >
                <Keyword keyword={keyword} size="small" />
              </Text>
>>>>>>> d3d810314f8a5e0f84864526aa2494b2794e6307
            }
            {label}:
          </Text>
        </Box>
        <Box className="legendValue">
          <Text size="small" weight="bold">{value}</Text>
        </Box>
      </Box>
    );
  }
}

export default Legend