import React, { Component } from 'react'
import { Text, Anchor, Collapsible } from "grommet"
import { Down, Up } from 'grommet-icons'
import Card from '../../atoms/card';
import TransactionDetails from '../../organisms/transactionDetails'
import { getTransaction, makeURLQuery } from '../../../helpers';

class TransactionCard extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      transaction: null,
      showDetails: false 
    }

    this.resetTransaction(props.transactionHash);
  }

  render() {
    const { transaction, showDetails } = this.state;
    if (!transaction) {
      return <Text>No transaction data was retrieved.</Text>;
    }

    const { hash } = transaction;
    
    const transactionURL = `/transaction/${window.encodeURIComponent(hash)}/${makeURLQuery()}`;
  
    return (
      <Card
        header={(
          <header>
            <Text truncate as="article">
              transaction 
              <Anchor href={transactionURL}>{` ${hash}`}</Anchor>

              <Text style={{float: "right"}}>
                {
                  showDetails ? (
                    <Up onClick={this.toggleShowDetails} />
                  ) : (
                    <Down onClick={this.toggleShowDetails} />
                  )
                }
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