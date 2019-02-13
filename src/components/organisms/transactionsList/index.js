import React, { Component } from 'react'
import { InfiniteScroll, Box, Text, Anchor, Collapsible } from 'grommet'
import TransactionCard from '../../molecules/transactionCard'

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
          <Anchor onClick={this.toggleShowTransactions}>
            <b>transactions</b>
          </Anchor>
          <Anchor
            href={`/transactions/${window.location.search}`}
            alignSelf="end"
          >
            <b>view all</b>
          </Anchor>
        </Box>
        <Collapsible open={this.state.showTransactions}>
          <Box height="auto">
            <InfiniteScroll
              size="small"
              items={transactionHashes}
              scrollableAncestor="window"
            >
              {
                transactionHash => {
                  return (
                    <TransactionCard
                      key={transactionHash}
                      transactionHash={transactionHash}
                      blockHeight={blockHeight}
                    />
                  )
                }
              }
            </InfiniteScroll> 
          </Box>
        </Collapsible>
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