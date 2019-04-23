import React, { Component } from 'react'
import { Text, Box } from 'grommet'
import TransactionList from '../../organisms/transactionsList'
import Value from '../../molecules/value'
import Card from '../../atoms/card'
import '../detailsCard/style.css'

class BlockCard extends Component {
  render() {
    const { block } = this.props;
    
    if (!block) {
      return <h3>Loading...</h3>;
    }
    
    const { transactionHashes, height } = block;
    const notDisplayed = ["transactions", "numberOfTransactions", "transactionHashes", "timestamp"];
    return (
      <Card background="transparent" pad={{horizontal: "0"}}>
        <Box>
          {
            Object.keys(block).map((property, index) => {
              if(notDisplayed.includes(property)) { return null }
              const value = block[property];
              return (
                <Box key={index} className="detailField" round="xsmall">
                  <Text key={index}>
                    <b>{property}: </b>
                    {
                      <Value value={value} />
                    }
                  </Text>
                </Box>
            )})
          }

          <TransactionList
            transactionHashes={transactionHashes}
            blockHeight={height}
          />
        </Box>
      </Card>
    )
  }
} 

export default BlockCard;