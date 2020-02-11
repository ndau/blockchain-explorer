/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from 'react'
import { Box, Text } from 'grommet'
import BlockListItem from '../../molecules/blockListItem'

class BlockList extends Component {
  state = { activeBlock: null }

  render() {
    const { blocks } = this.props
    const activeBlock = this.state.activeBlock
    const activeBlockHeight = activeBlock && activeBlock.height

    if(!blocks || blocks.length === 0) {
      return (
        <Box pad="xlarge" animation="pulse">
          <Text alignSelf="center" size="xsmall">Loading blocks...</Text>
        </Box>
      )
    }

    return (
      <Box>
        <Text
          size="xsmall"
          alignSelf="start"
          color="#999"
          style={{fontStyle: "italic"}}
          margin={{bottom: "4px"}}
        >
          * showing blocks containing at least one transaction.
        </Text>
        <Box
          background="#293e63"
          pad="7px"
          round="xsmall"
          elevation="small"
        >
          {
            blocks.map((block, index) =>  {
              return (
                <Box key={index} animation={["slideDown", "fadeIn"]}>
                  <BlockListItem
                    block={block}
                    setAsActiveBlock={()=> this.setActiveBlock(block)}
                    unsetAsActiveBlock={()=> this.setActiveBlock(null)}
                    active={block.height === activeBlockHeight}
                  />
                </Box>
              )
            })
          }
        </Box>
      </Box>

    );
  }

  setActiveBlock = (activeBlock) => {
    this.setState({ activeBlock })
  }
}

export default BlockList
