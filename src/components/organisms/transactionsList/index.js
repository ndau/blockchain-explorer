import React, { Component } from 'react'
import { Box, Text, Anchor } from 'grommet'
import TransactionCard from '../../molecules/transactionCard'
import { makeURLQuery } from '../../../helpers';

class TransactionsList extends Component{
  state = { showTransactions: true }

  render() {
    const { transactionHashes, blockHeight } = this.props;
    
    if (!transactionHashes) {
      return (
       <Text size="medium">Loading...</Text>
      );
    }

    if(transactionHashes.length < 1) {
      return (
        <Text size="medium" weight="bold">
          No transactions
        </Text>
      )
    }
    
    return (
      <Box>
        <Box>
          <Text onClick={this.toggleShowTransactions} as="span">
            <b>transactions</b>

            <Anchor
              href={`/transactions/${makeURLQuery({block: blockHeight})}`}
              style={{float: "right"}}
            >
              <b>view all</b>
            </Anchor>
          </Text>
        </Box>
        <Box>
          { 
            transactionHashes.map(hash => (
              <TransactionCard
                key={hash}
                transactionHash={hash}
                blockHeight={blockHeight}
              />
            ))
          }
        </Box>
      </Box>
    )
  }

  toggleShowTransactions = () => {
    this.setState(({showTransactions}) => {
      return {
        showTransactions: !showTransactions
      }
    }) 
  }
} 

export default TransactionsList;