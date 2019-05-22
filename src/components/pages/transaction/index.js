import React, { Component } from 'react'
import { Box, Text } from 'grommet';
import Anchor from '../../atoms/anchor'
import Details from '../../templates/details'
import TransactionDetails from '../../organisms/transactionDetails'
import { getTransaction } from '../../../helpers/fetch'

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
        <Details browserHistory={this.props.history} notFound/>
      );
    }

    return (
      <Details browserHistory={this.props.history}>
        <Box margin={{bottom: "20px"}}>
          <Text>
            <Text size="large">
              Transaction{' '}
              <Text weight="bold" as="em" style={{wordWrap: "break-word"}}>
                {transaction && transaction.hash}
              </Text>
            </Text>
            
            {
              blockHeight &&
              <Text as="span" style={{float: "right"}}>
                Block <Anchor href={`/block/${blockHeight}`}>{`#${blockHeight}`}</Anchor>
              </Text>
            }
          </Text>
        </Box>
        
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

  componentDidUpdate(prevProps) {
    const getURL = (location={}) => {
      const {pathname, search} = location
      return `${pathname}${search}`
    }

    if (getURL(this.props.location) !== getURL(prevProps.location)) {
      this.getData();
    }
  }
}

export default Transaction