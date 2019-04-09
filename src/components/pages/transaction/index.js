import React, { Component } from 'react'
import { Text } from 'grommet';
import Anchor from '../../atoms/anchor'
import Details from '../../templates/details'
import TransactionDetails from '../../organisms/transactionDetails'
import { getTransaction, makeURLQuery } from '../../../helpers'

class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transaction: {},
      blockHeight: null,
    }

    this.getData();
  }

  render() {
    const { transaction, blockHeight } = this.state;
    if (!transaction) {
      return (
        <Details>
          <Text>No transaction data was retrieved.</Text>
        </Details>
      );
    }

    return (
      <Details>
        <Text>
          <Text as="h3">
            Transaction{' '}
            <Text weight="bold" as="em" style={{wordWrap: "break-word"}}>
              {transaction && transaction.hash}
            </Text>
          </Text>
          
          {
            blockHeight &&
            <Text as="span" style={{float: "right"}}>
              Block <Anchor href={`/block/${blockHeight}/${makeURLQuery()}`}>{`#${blockHeight}`}</Anchor>
            </Text>
          }
        </Text>
        
        <TransactionDetails transaction={transaction} />
      </Details>
    )
  }

  getData = () => {
    const { blockHeight, transactionHash } = this.props.match.params;
    getTransaction(transactionHash)
      .then(transaction => {
        this.setState({ transaction, blockHeight })
      })
  }
}

export default Transaction