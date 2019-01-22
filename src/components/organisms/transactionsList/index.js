import React, { Component } from 'react'
import { Anchor, InfiniteScroll, Box, Text } from 'grommet'
import TransactionCard from '../../molecules/transactionCard'

class TransactionsList extends Component {
  render() {
    const { transactions, blockHeight } = this.props;

    return (
      <Box>
        <Anchor href="/transactions" label="View all transactions" alignSelf="end" />
        {
          transactions ? (
            <InfiniteScroll
              size="small"
              items={transactions}
              scrollableAncestor="window"
            >
              {
                transaction => <TransactionCard key={transaction.index} {...transaction} />
              }
            </InfiniteScroll> 
          ) : (
            <Box align="center" pad={{vertical: "large"}}>
              <Text color="#333" size="xlarge" weight="bold">
                There are no transactions in Block #{blockHeight}
              </Text>
            </Box>
          )
        }
      </Box>
    );
  }
}

export default TransactionsList;