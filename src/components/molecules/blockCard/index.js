import React, { Component } from 'react'
import { Text, Box } from 'grommet'
import TruncatedText from '../../atoms/truncatedText'
import TransactionList from '../../organisms/transactionsList'
import Card from '../../atoms/card'

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
                <Text key={index}>
                  <b>{property}: </b>
                  {
                    value && (typeof value === "string" || Array.isArray(value)) ?
                    <TruncatedText value={block[property]} />
                    :
                    value
                  }
                </Text>
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