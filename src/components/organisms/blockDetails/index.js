import React, { Component } from 'react'
import { Box } from 'grommet'
import  BlockCard from '../../molecules/blockCard'
import { getTransactionHashes } from '../../../helpers';

class BlockDetails extends Component {
  state = { transactionHashes: null }

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

  componentDidUpdate(prevProps) {
    if(!this.state.transactionHashes && this.props.block) {
      getTransactionHashes(this.props.block.height)
        .then(transactionHashes => {
          this.setState({ transactionHashes })
        })
    }
  }
}

export default BlockDetails;