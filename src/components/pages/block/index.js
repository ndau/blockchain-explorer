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
import { LinkNext, LinkPrevious } from 'grommet-icons'
import Anchor from '../../atoms/anchor'
import BlockDetails from '../../organisms/blockDetails'
import Details from '../../templates/details'
import { getBlock, getNodeStatus } from '../../../helpers/fetch'

class Block extends Component {
  constructor(props) {
    super(props);

    this.state = {
      block:{},
      transactionHashes: null,
      latestBlockHeight: null,
    }

    this.getData()
  }

  render() {
    const { block, latestBlockHeight } = this.state
    const blockHeight = block && block.height

    return (
      <Details
        browserHistory={this.props.history}
        notFound={!block}
        nav={
          <Box animation="fadeIn">
            <Text>
              {
                (blockHeight && blockHeight) > 1 &&
                <Text>
                  <Anchor  href={`/block/${blockHeight - 1}`}>
                    <LinkPrevious size="22px" color="#f99d1c"/>
                  </Anchor>
                </Text>
              }

              {
                ((blockHeight && latestBlockHeight) && blockHeight !== latestBlockHeight) &&
                <Text style={{float: "right"}}>
                  <Anchor  href={`/block/${blockHeight + 1}`}>
                    <LinkNext size="22px" color="#f99d1c"/>
                  </Anchor>
                </Text>
              }
            </Text>
          </Box>
        }
      >
        <Box>
          <Box margin={{bottom: "20px"}}>
            <Text size="large">
              Block{' '}
              <Text weight="bold" as="em" style={{wordWrap: "break-word"}}>
                {blockHeight}
              </Text>
            </Text>
          </Box>
        
          <BlockDetails block={block} />
        </Box>
      </Details>
    )
  }

  getData = async () => {
    const { blockHeight } = this.props.match.params;
    await getBlock(blockHeight)
      .then(block => this.setState({ block }))
    getNodeStatus()
      .then(status => {
        const latestBlockHeight = status && status["latest_block_height"];
        this.setState({ latestBlockHeight })
      })
  }

  componentDidUpdate(prevProps) {
    const getURL = (location={}) => {
      const {pathname, search} = location
      return `${pathname}${search}`
    }

    if (getURL(this.props.location) !== getURL(prevProps.location)) {
      this.getData()
    }
  }
}

export default Block;
