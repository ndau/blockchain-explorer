import React, { Component } from 'react'
import { Box } from "grommet"
import Lengend from '../../atoms/legend'

class Legends extends Component {
  render() {
    const { info } = this.props;

    if (!info) {
      return null;
    }
  
    return (
      <Box>
      {
        info.map((legendInfo, index) => (
          <Box key={index}>
            <Lengend {...legendInfo} />
          </Box>
        ))
      }
      </Box>
    );
  }
}

export default Legends;