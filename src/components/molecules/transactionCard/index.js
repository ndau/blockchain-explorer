import React, { Component } from 'react'
import { Text, Anchor, Collapsible } from "grommet"
import { Expand, Contract } from 'grommet-icons'
import Card from '../../atoms/card';
import TransactionDetails from '../../organisms/transactionDetails'
import TruncatedText from '../../atoms/truncatedText'
import { getTransaction, makeURLQuery } from '../../../helpers';

class TransactionCard extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      transaction: null,
      showDetails: true, 
    }

    this.resetTransaction(props.transactionHash);
  }

  render() {
    const { transaction, showDetails } = this.state;
    if (!transaction) {
      return (
        <Card
          header={(
            <header>
              <Text>No transaction data was retrieved.</Text>
            </header>
          )}
          pad="small"
        />
      )
    }

    const { hash } = transaction;
    
    const transactionURL = `/transaction/${window.encodeURIComponent(hash)}/${makeURLQuery()}`;
  
    return (
      <Card
        header={(
          <header onClick={this.toggleShowDetails}>
            <Text truncate>
              transaction 
              <Anchor href={transactionURL}>
                {` `}
                <TruncatedText value={hash} />
              </Anchor>

              <Text style={{float: "right"}}>
                { showDetails ? <Contract size="20px" /> : <Expand size="20px" /> }
              </Text>
            </Text>

          </header>
        )}
        pad="small"
      >
        <Collapsible open={showDetails}>
          <TransactionDetails transaction={transaction} />
        </Collapsible> 
      </Card>
    );
  }

  componentDidUpdate(prevProps) {
    const { transactionHash } = this.props;
    if(transactionHash !== prevProps.transactionHash) {
      this.resetTransaction(transactionHash)
    }
  }

  resetTransaction(transactionHash) {
    getTransaction(transactionHash)
      .then(transaction => {
        this.setState({ transaction })
      })
  }

  toggleShowDetails = () => {
    this.setState(({showDetails}) => {
      return {
        showDetails: !showDetails
      }
    }) 
  }
}

export default TransactionCard;