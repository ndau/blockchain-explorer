import React, { Component } from 'react'
import { Text} from 'grommet'
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

            return (
              <Text truncate as="article" key={i}>
                <b>{property}:</b> {block[property]}
              </Text>
          )})
        }
        <TransactionList transactionHashes={transactionHashes} blockHeight={height} />
      </Card>
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

export default BlockCard;