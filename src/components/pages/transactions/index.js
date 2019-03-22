import React, { Component } from 'react'
import { DataTable, Box, Text } from 'grommet'
import Anchor from '../../atoms/anchor'
import qs from 'query-string';
import Dashboard from '../../templates/dashboard'
import {
  getBlockTransactions,
  makeURLQuery, 
} from '../../../helpers'

class Transactions extends Component {
  constructor (props) {
    super(props)

    this.state = {
      transactions: null,
      blockHeight: null,
    }

    this.getData()
  }

  render () {
    const { transactions, blockHeight } = this.state;

    return (
      <Dashboard
        browserHistory={this.props.history}
        selectNode={!blockHeight}
        bottom={
          <Box>
            <h2>Transactions</h2>

            <DataTable
              data={transactions || []}
              columns={this.columns}
            />
          </Box>
        }
      />
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      this.getData();
    }
  }

  getData = () => {
    const query = qs.parse(window.location.search);
    const blockHeight = query.block;
  
    if(blockHeight) {
      return getBlockTransactions(blockHeight)
        .then(txns => {
          const transactions = txns.filter(txn => txn)
          this.setState({ transactions })
        })  
    }
   
    // getNodeStatus()
    //   .then(status => {
    //     if(!status) {
    //       return
    //     }

    //     const latestBlockHeight = status.latest_block_height;

    //     // getBlocks()
    //   })
    
  }

  columns = [
    {
      property: 'hash',
      header: 'Hash',
      search: true,
      primary: true,
      render: ({ hash }) => {
        const transactionURL = `/transaction/${window.encodeURIComponent(hash)}/${makeURLQuery()}`;
        return (
          <Box width="150px">
            <Text truncate>
              <Anchor href={transactionURL} label={hash} />
            </Text>
          </Box>
        );
      }

    },
    {
      property: 'type',
      header: 'Type',
      search: true,
      // render: ({quantity}) => <Box width="150px"><Text truncate>{(quantity/100000000).toFixed(3)}</Text></Box>
    },
    {
      property: 'quantity',
      header: 'Quantity',
      render: ({quantity}) => <Box width="150px"><Text truncate>{(quantity/100000000).toFixed(3)}</Text></Box>
    },
    {
      property: 'source',
      header: 'From',
      render: ({source}) => <Box width="150px"><Text truncate>{source || "--"}</Text></Box>
    },
    {
      property: 'destination',
      header: 'To',
      render: ({destination}) => <Box width="150px"><Text truncate>{destination || "--"}</Text></Box>
    },
    // {
    //   property: 'age',
    //   header: 'Age'
    // },
    // {
    //   property: 'blockHeight',
    //   header: 'Block',
    //   search: true,
    //   render: ({ blockHeight }) => (
    //     <Anchor 
    //       href={`/block/${blockHeight}/${makeURLQuery()}`} 
    //       label={blockHeight}
    //     />
    //   )   
    // }
  ]
}

export default Transactions
