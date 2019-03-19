import React, { Component } from 'react'
import { Text, Anchor, Collapsible, Box } from "grommet"
import { Expand, Contract } from 'grommet-icons'
import Card from '../../atoms/card';
import TransactionDetails from '../../organisms/transactionDetails'
import TruncatedText from '../../atoms/truncatedText'
import { getTransaction, makeURLQuery } from '../../../helpers';
import './style.css'

class TransactionCard extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      transaction: null, 
    }

    this.getTransaction(props.transactionHash);
  }

  render() {
    const { transaction } = this.state;
    const { open, setActiveTransaction, index } = this.props;

    if (!transaction) {
      return (
        <Card
          header={(
            <header>
              <Text>No transaction data was retrieved.</Text>
            </header>
          )}
          pad="15px"
        />
      )
    }

    const { hash, type } = transaction;
    
    const transactionURL = `/transaction/${window.encodeURIComponent(hash)}/${makeURLQuery()}`;
  
    return (
      <Card
        header={(
          <header onClick={() => setActiveTransaction(index)}>
            <Box>
              <Text truncate as="article">
                <Text style={{float: "right"}}>
                  { 
                    open ? 
                    <Contract
                      size="15px"
                      color="#aaa"
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveTransaction(null)
                      }}
                    /> : 
                    <Expand
                      size="15px"
                      color="#aaa" 
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveTransaction(index)
                      }}
                    /> 
                  }
                </Text>
                <Text weight="bold" header>
                  Transaction 
                  <Text>
                    {
                      hash &&
                      <Anchor href={transactionURL} onClick={event => event.stopPropagation()}>
                        {` `}
                        <TruncatedText value={hash} className="txHash" />
                      </Anchor>
                    }
                  </Text>
                </Text>
              </Text>
              {
                (!open && type) &&
                <Text size="xsmall">{type} Transaction</Text>
              }
            </Box>
              
          </header>
        )}
        background="#0b1f3a"
        pad="15px"
      > 
        <Collapsible open={open}>
          <TransactionDetails transaction={transaction} />
        </Collapsible>
      </Card>
    );
  }

  componentDidUpdate(prevProps) {
    const { transactionHash } = this.props;
    if(transactionHash !== prevProps.transactionHash) {
      this.getTransaction(transactionHash)
    }
  }

  getTransaction(transactionHash) {
    getTransaction(transactionHash)
      .then(transaction => {
        this.setState({ transaction })
      })
  }
}

export default TransactionCard;