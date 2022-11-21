/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from "react";
import { Box, Text, Anchor } from "grommet";
import BlockListItem from "../../molecules/blockListItem";

class BlockList extends Component {
  state = { activeBlock: null };

  render() {
    const { blocks } = this.props;
    const activeBlock = this.state.activeBlock;
    const activeBlockHeight = activeBlock && activeBlock.height;

    if (!blocks || blocks.length === 0) {
      return (
        <Box pad="xlarge" animation="pulse">
          <Text alignSelf="center" size="xsmall">
            Loading blocks...
          </Text>
        </Box>
      );
    }

    return (
      <div>
        <Box
          round={{ size: "xsmall", corner: "top" }}
          pad="5px"
          background="#093D60"
          justify="center"
        >
          <Anchor
            color="white"
            href="/blocks"
            label="LATEST BLOCKS"
            alignSelf="center"
          />
        </Box>

        {blocks.map((block, index) => {
          return (
            <Box key={index} animation={["slideDown", "fadeIn"]}>
              <BlockListItem
                exclude={true}
                block={block}
                setAsActiveBlock={() => this.setActiveBlock(block)}
                unsetAsActiveBlock={() => this.setActiveBlock(null)}
                active={block.height === activeBlockHeight}
                border="bottom"
              />
            </Box>
          );
        })}
      </div>
    );
  }

  setActiveBlock = (activeBlock) => {
    this.setState({ activeBlock });
  };
}

export default BlockList;
