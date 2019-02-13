import React, { Component } from 'react'
import { Text, Anchor } from "grommet"
import Card from '../../atoms/card';
import { getTransaction } from '../../../helpers'

class TransactionCard extends Component {
  state = { transaction: null }

  render() {
    const { transaction } = this.state;
    if (!transaction) {
      return <Text>No transaction data was retrieved.</Text>;
    }

    const { quantity, destination, source, hash } = transaction;
    const transactionURL = `/transaction/${window.encodeURIComponent(hash)}/${window.location.search}`;
  
    return (
      <Card
        header={(
          <header>
            <Text truncate as="article">
              transaction 
              <Anchor href={transactionURL}>{` ${hash}`}</Anchor>
            </Text>
          </header>
        )}
        pad="small"
      >
        <section>
          {
            quantity && 
            <Text as="section">
              <b>quantity: </b> {quantity / 100000000}
            </Text>
          }
          {
            source &&
            <Text truncate as="article">
              <b>from: </b> {source}
            </Text>
          }
          {
            destination &&
            <Text truncate as="article">
              <b>to: </b> {destination}
            </Text>
          }
        </section> 
      </Card>
    );
  }

  componentDidMount() {
    getTransaction(this.props.transactionHash)
      .then(transaction => {
        this.setState({ transaction })
      })
  }
}

export default TransactionCard;