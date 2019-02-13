import React, { Component } from 'react'
import { Box, Grid, Anchor } from 'grommet'
import BlocksList from '../../organisms/blocksList'
import BlockDetails from '../../organisms/blockDetails'

class LatestBlocks extends Component {
  state = { activeBlock: null }
  
  render() {
    const activeBlock = this.state.activeBlock || this.props.blocks[0];

    return (
      <Box>
        <Box margin={{ bottom: "small", left: "small" }}>
          <Anchor href={`/blocks${window.location.search}`} label="View all blocks" />
        </Box>

        <Box background="rgba(51,51,51,0.4)" pad={{ horizontal: "small", vertical: "small" }}>
          <Grid
            fill
            columns={["flex", "flex"]}
            rows={["auto"]}
            areas={[
              { name: "left", start: [0, 0], end: [1, 0] },
              { name: "right", start: [1, 0], end: [1, 0] },
            ]}
          >
            <Box gridArea="left">
              <BlocksList 
                blocks={this.props.blocks}
                setActiveBlock={this.setActiveBlock}
                activeBlockHeight={activeBlock && activeBlock.height}
              />
            </Box>
            <Box gridArea="right">
              <BlockDetails block={activeBlock} />
            </Box>
          </Grid>
        </Box>
      </Box>
    );
  }

  setActiveBlock = (activeBlock) => {
    this.setState({ activeBlock })
  }
}

export default LatestBlocks;