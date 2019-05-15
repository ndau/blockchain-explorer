import React, { Component } from 'react'
import { Box, Text, Keyboard } from 'grommet'
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

    this.getData();
  }

  render() {
    const { block, latestBlockHeight } = this.state;
    const blockHeight = block && block.height;

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
                ((blockHeight && latestBlockHeight) &&  blockHeight !== latestBlockHeight) &&
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
        {/* TODO: fix Keyboard control */}
        <Keyboard>
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
        const latestBlockHeight = status && status["latest_block_height"];
        this.setState({ latestBlockHeight })
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      this.getData();
    }
  }
}

export default Block;