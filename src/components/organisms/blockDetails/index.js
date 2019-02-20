import React, { Component } from 'react'
import { Box } from 'grommet'
import  BlockCard from '../../molecules/blockCard'
import { getTransactionHashes } from '../../../helpers';

class BlockDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { transactionHashes: null }
  }
  

  render() {
    const { transactionHashes } = this.state;
    const { block } = this.props;
    if (!block) {
      return null;
    }

    const data = {
      ...block,
      transactionHashes
    }

    return (
      <Box background="transparent">
        <BlockCard block={data} />
      </Box>
    );
  }

  setTransactionHashes(blockHeight) {
    getTransactionHashes(blockHeight)
      .then(transactionHashes => {
        this.setState({ transactionHashes })
      })
  }

  componentDidUpdate(prevProps) {
    const { block } = this.props;
    if(block && block.height) {
      if(!prevProps.block || block.height !== prevProps.block.height) {
        this.setTransactionHashes(block.height)
      }
    } 
  }
}

export default BlockDetails;