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
