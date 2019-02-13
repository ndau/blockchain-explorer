import React, { Component } from 'react'
import { Text, Anchor } from 'grommet';
import Details from '../../templates/details'
import TransactionDetails from '../../organisms/transactionDetails'
import { getTransaction } from '../../../helpers'

class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transaction: null,
      blockHeight: null,
    }

    this.getData();
  }

  render() {
    const { transaction, blockHeight } = this.state;
    return (
      <Details>
        <Text>
          <Text as="span" weight="bold" truncate>
            Transaction {transaction && `#${transaction.hash}`}
          </Text>
          {
            blockHeight &&
            <Text as="span" style={{float: "right"}}>
              Block <Anchor href={`/block/${blockHeight}/${window.location.search}`}>{`#${blockHeight}`}</Anchor>
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