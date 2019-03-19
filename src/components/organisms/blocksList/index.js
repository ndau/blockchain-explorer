import React, { Component } from 'react'
import { InfiniteScroll, Box, Text } from 'grommet'
import BlockListItem from '../../molecules/blockListItem'

class BlockList extends Component {
  state = { activeBlock: null }

  render() {
    const { blocks, loadMoreBlocks } = this.props;
    const activeBlock = this.state.activeBlock;
    const activeBlockHeight = activeBlock && activeBlock.height;

    if(!blocks || blocks.length === 0) {
      return (
        <Box pad="xlarge" animation="pulse">
          <Text alignSelf="center" size="xsmall">Loading blocks...</Text>
        </Box>
      )
    }

    return (
      <Box
        background="#293e63"
        pad={{ horizontal: "small", vertical: "small" }}
        round="xsmall"
        elevation="small"
      >
        <InfiniteScroll
          size="large"
          items={blocks}
          onMore={loadMoreBlocks && loadMoreBlocks}
        >
          { block => (
            <BlockListItem
              key={block.height} 
              block={block}
              setAsActiveBlock={()=> this.setActiveBlock(block)}
              unsetAsActiveBlock={()=> this.setActiveBlock(null)}
              active={block.height === activeBlockHeight}
            /> 
          )}
        </InfiniteScroll>
      </Box>
    );
  }

  setActiveBlock = (activeBlock) => {
    this.setState({ activeBlock })
  }
}

export default BlockList;