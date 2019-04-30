import React, { Component } from 'react'
import { Box, Text } from 'grommet'
import TransactionList from '../../organisms/transactionsList'

class AccountTimeline extends Component {
  state = { activeBlock: null }

  render() {
    const { events } = this.props;

    if(!events) {
      return null
    }

    return (
      <Box
        // background="#293e63"
        pad="7px"
        round="xsmall"
        elevation="small"
      >
        <Box overflow="hidden">
          {
            events.reverse().map((event, index) => {
              const { Balance, TxHash, Timestamp } = event;
              const previousBalance =  index < events.length - 1 ? events[index + 1]["Balance"] : Balance;
              const difference =  Balance - previousBalance;

              return (
                <Box 
                  key={index} margin={{bottom: "small"}}
                  background="#293e63"
                > 
                  <Text>{Timestamp}</Text>
                  <Text>balance: {Balance / 100000000}</Text>
                  <Text>amount: {difference  / 100000000}</Text>
                  <Text></Text>


                  <Text>
                    {/* transaction:  */}
                    <TransactionList transactionHashes={[TxHash]}/>
                  </Text>
                </Box>
              )
            })
          }
        </Box>
      </Box>
    );
  }

  setActiveBlock = (activeBlock) => {
    this.setState({ activeBlock })
  }
}

export default AccountTimeline;