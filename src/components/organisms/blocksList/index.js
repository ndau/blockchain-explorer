import React, { Component } from 'react'
import { InfiniteScroll, Box } from 'grommet'
import BlockListItem from '../../molecules/blockListItem'

class BlockList extends Component {
  render() {
    const { blocks, activeBlockHeight, setActiveBlock } = this.props;
    return (
      <Box>
        <InfiniteScroll
          size="large"
          items={blocks}
          // onMore={()=> {}}
        >
          { block => (
            <BlockListItem
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
}

export default BlockList;