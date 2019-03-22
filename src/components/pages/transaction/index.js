import React, { Component } from 'react'
import { Text } from 'grommet';
import Anchor from '../../atoms/anchor'
import Details from '../../templates/details'
import TransactionDetails from '../../organisms/transactionDetails'
import TruncatedText from '../../atoms/truncatedText'
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
          <Text truncate as="article" >
            <h3> 
              Transaction{' '}
              <Text as="em" weight="bold">
                {
                  (transaction && transaction.hash) && 
                  <TruncatedText value={transaction.hash} />
                }
              </Text>
            </h3>
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