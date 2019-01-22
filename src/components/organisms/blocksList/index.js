import React, { Component } from 'react'
import { Anchor, InfiniteScroll, Box } from 'grommet'
import BlockCard from '../../molecules/blockCard'

class BlockList extends Component {
  render() {
    const { blocks, activeBlockHeight, setActiveBlock } = this.props;
    return (
      <Box>
        <Anchor href="/blocks" label="View all blocks" alignSelf="end" />
        <InfiniteScroll
          size="large"
          items={blocks}
          // onMore={this.onLoadMoreBlocks}
        >
          { block => (
            <BlockCard 
              key={block.height} 
              setAsActiveBlock={()=>setActiveBlock(block)}
              active={block.height === activeBlockHeight}
              {...block} 
            /> 
          )}
        </InfiniteScroll>
      </Box>
    );
  }

  // onLoadMoreBlocks = (arg1, arg2) => {
  //   // debugger
  // }
}

export default BlockList;