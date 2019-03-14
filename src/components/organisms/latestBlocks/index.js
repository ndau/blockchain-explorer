import React, { Component } from 'react'
import { Box, Anchor, Text } from 'grommet'
import BlocksList from '../../organisms/blocksList'
import { getBlocks, makeURLQuery } from '../../../helpers';

class LatestBlocks extends Component {
  render() {
    const { blocks } = this.props;

    return (
      <Box>
        <Box margin={{ bottom: "small" }}>
          <Text>
            <Text weight="bold">Latest Blocks</Text>
            <Anchor href={`/blocks/${makeURLQuery()}`} label="View all blocks" style={{float: "right"}} />
          </Text>
        </Box>

        <BlocksList blocks={blocks} />
      </Box>
    );
  }
}

export default LatestBlocks;