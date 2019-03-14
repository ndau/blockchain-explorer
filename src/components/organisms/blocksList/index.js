import React, { Component } from 'react'
import { InfiniteScroll, Box, Text } from 'grommet'
import BlockListItem from '../../molecules/blockListItem'

class BlockList extends Component {
  state = { activeBlock: null }

  render() {
    const { blocks } = this.props;
    const activeBlock = this.state.activeBlock;
    const activeBlockHeight = activeBlock && activeBlock.height;

    if(!blocks || blocks.length === 0) {
      return (
        <Box pad="xlarge" animation="pulse">
          <Text alignSelf="center" size="xsmall">Loading blocks...</Text>
        </Box>
      )
    }

    // if() {
    //   return <p>No blocks were found.</p>
    // }
    return (
      <Box
        background="#293e63"
        pad={{ horizontal: "small", vertical: "small" }}
        round="xsmall"
      >
        <InfiniteScroll
          size="large"
          items={blocks}
          // onMore={this.props.onMore}
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

  // loadMoreBlocks = () => {
  //   const { earliestBlockHeight } = this.state
  //   if (!earliestBlockHeight || earliestBlockHeight < 1) {
  //     return
  //   }

  //   const blockRangeEnd = earliestBlockHeight - 1 || 1;
  //   if (blockRangeEnd <= 1) {
  //     return
  //   }
    
  //   getBlocks(null, blockRangeEnd, this.props.range, true, null)
  //     .then(previousBlocks => {
  //       if (previousBlocks.length < 1) {
  //         return
  //       }
      
  //       const earliestBlock = previousBlocks[previousBlocks.length - 1];
  //       this.setState(({ blocks }) => {
  //         return {
  //           blocks: [...blocks, ...previousBlocks],
  //           earliestBlockHeight:  earliestBlock && earliestBlock.height,
  //         }
  //       })
  //     })
  // }
}

export default BlockList;