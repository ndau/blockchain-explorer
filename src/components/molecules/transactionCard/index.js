import React, { Component } from 'react'
import { Text } from "grommet"
import Card from '../../atoms/card'

class TransactionCard extends Component {
  render() {
    const { index, target, quantity } = this.props;
    return (
      <Card
        header={(
          <header>
            <Text>
              transaction {index}
            </Text>
          </header>
        )}
      >
        <section>
          <Text as="section">
            <b>quantity: </b> {quantity / 100000000}
          </Text>
          <Text as="section">
            <b>to: </b> {target}
          </Text>
        </section> 
      </Card>
    );
  }
}

export default TransactionCard;