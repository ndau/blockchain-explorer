import React, { Component } from 'react'
import { Box, Text } from 'grommet'
import Anchor from '../../atoms/anchor'
import BlocksList from '../../organisms/blocksList'

class LatestBlocks extends Component {
  render() {
    const { blocks } = this.props;

    return (
      <Box>
        <Box margin={{ bottom: "xsmall" }}>
          <Text>
            <Text weight="bold">Latest Blocks</Text>
            <Text style={{float: "right"}}>
              <Anchor 
                href="blocks/" 
                label="View all blocks"  
              />
            </Text>
          </Text>
        </Box>
         
        <BlocksList blocks={blocks} />
      </Box>
    );
  }
}

export default LatestBlocks;