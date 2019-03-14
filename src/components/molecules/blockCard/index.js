import React, { Component } from 'react'
import { Text } from 'grommet'
import TruncatedText from '../../atoms/truncatedText'
import TransactionList from '../../organisms/transactionsList'
import Card from '../../atoms/card'

class BlockCard extends Component{
  state = { showTransactions: true }

  render() {
    const { block } = this.props;
    
    if (!block) {
      return <h3>Loading...</h3>;
    }
    
    const { transactionHashes, height } = block;
    const notDisplayed = ["transactions", "numberOfTransactions", "transactionHashes"];
    return (
      <Card background="transparent">
        {
          Object.keys(block).map((property, i) => {
            if(notDisplayed.includes(property)) { return null }
            const value = block[property];
            return (
              <Text key={i}  as="div">
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
        <TransactionList transactionHashes={transactionHashes} blockHeight={height} />
      </Card>
    )
  }
} 

export default BlockCard;