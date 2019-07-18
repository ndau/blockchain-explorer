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

    const {raw, ...blockDetails} = block
    
    const { transactionHashes, height, numberOfTransactions } = blockDetails;
    const notDisplayed = ["transactions", "numberOfTransactions", "transactionHashes", "timestamp"];
    return (
      <Card background="transparent" pad={{horizontal: "0"}}>
        <Box>
          {
            Object.keys(blockDetails).map((property, index) => {
              if(notDisplayed.includes(property)) { return null }
              const value = blockDetails[property];
              return (
                <Box key={index} className="detailField" round="xsmall">
                  <Text key={index}>
                    <b>{property}: </b>
                    {
                      <Value value={value} rawValue={raw[property]} />
                    }
                  </Text>
                </Box>
            )})
          }

          <TransactionList
            transactionHashes={transactionHashes}
            numberOfTransactions={numberOfTransactions}
            blockHeight={height}
          />
        </Box>
      </Card>
    )
  }
} 

export default BlockCard;