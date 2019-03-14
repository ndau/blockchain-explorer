import React, { Component } from 'react'
import { Box, Text } from 'grommet'
import TransactionCard from '../../molecules/transactionCard'
// import { makeURLQuery } from '../../../helpers';

class TransactionsList extends Component{
  state = { activeTransactionIndex: null }

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

    const gap = "small";
    
    return (
      <Box>
        <Box>
          <Text onClick={this.toggleShowTransactions} as="span" color="#fff">
            <b>transactions</b>
          </Text>
        </Box>
        <Box margin={{top: gap}}>
          { 
            transactionHashes.map((hash, index) => (
              <Box key={index} margin={{bottom: (index !== transactionHashes.length-1)? gap : "0"}}>
                <TransactionCard
                  transactionHash={hash}
                  blockHeight={blockHeight}
                  open={index === this.state.activeTransactionIndex}
                  index={index}
                  setActiveTransaction={this.setActiveTransactionIndex}
                />
              </Box>
            ))
          }
        </Box>
      </Box>
    )
  }

  setActiveTransactionIndex = (index) => {
    if(index !== this.state.activeTransactionIndex) {
      this.setState({
        activeTransactionIndex: index
      }) 
    }
  }
} 

export default TransactionsList;