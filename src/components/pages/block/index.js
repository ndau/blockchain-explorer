import React, { Component } from 'react'
import { Box, Text, Keyboard } from 'grommet'
import { LinkNext, LinkPrevious } from 'grommet-icons'
import Anchor from '../../atoms/anchor'
import BlockDetails from '../../organisms/blockDetails'
import Details from '../../templates/details'
import { getBlock, makeURLQuery, getNodeStatus } from '../../../helpers'

class Block extends Component {
  constructor(props) {
    super(props);

    this.state = {
      block: null,
      transactionHashes: null,
      latestBlockHeight: null,
    }

    this.getData();
  }

  render() {
    const { block, latestBlockHeight } = this.state;
    const blockHeight = block && block.height;

    return (
      <Details
        nav={
          <Box animation="fadeIn">
            <Text>
              {
                (blockHeight && blockHeight) > 1 &&
                <Text>
                  <Anchor  href={`/block/${blockHeight - 1}/${makeURLQuery()}`}>
                    <LinkPrevious size="22px" color="#f99d1c"/>
                  </Anchor>
                </Text>
              }
              
              {
                (latestBlockHeight &&  blockHeight !== latestBlockHeight) &&
                <Text style={{float: "right"}}>
                  <Anchor  href={`/block/${blockHeight + 1}/${makeURLQuery()}`}>
                    <LinkNext size="22px" color="#f99d1c"/>
                  </Anchor>
                </Text>
              }
            </Text>
          </Box>
        }
      >
        {/* TODO: fix Keyboard control */}
        <Keyboard onLeft={this.goToPreviousBlock}> 
          <Box>
            <h3>Block <em>{blockHeight}</em></h3>
            <BlockDetails block={block} />
          </Box>
        </Keyboard>
      </Details>
    )
  }

  getData = () => {
    const { blockHeight } = this.props.match.params;
    getBlock(blockHeight)
      .then(block => this.setState({ block }))
    getNodeStatus()
      .then(status => {
        const latestBlockHeight = status["latest_block_height"];
        this.setState({ latestBlockHeight })
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      this.getData();
    }
  }

  // goToPreviousBlock = () => {
  //   debugger
  // }
}

export default Block;