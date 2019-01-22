import React, { Component } from 'react'
import axios from 'axios'
import { DataTable, Anchor } from 'grommet'
import Dashboard from '../../templates/dashboard'
import { NDAU_ENDPOINT, HTTP_REQUEST_HEADER } from '../../../constants.js'
import { getTransactions } from '../../../helpers.js'

class Transactions extends Component {
  constructor (props) {
    super(props)

    this.state = {
      transactions: [],
      hideEmpty: false
    }
  }

  render () {
    // const transactionData = this.formatTransactions(this.state.hideEmpty);
    const columns = [
      {
        property: 'hash',
        header: 'Hash',
        search: true,
        primary: true,
        render: ({ hash }) => (
          <Anchor href={`/transaction/${hash}`} label={hash} />
        )
      },
      {
        property: 'quantity',
        header: 'Quantity (in ndau)'
      },
      {
        property: 'destination',
        header: 'To'
      },
      {
        property: 'time',
        header: 'Timestamp'
      },
      {
        property: 'age',
        header: 'Age'
      },
      {
        property: 'blockHeight',
        header: 'Block',
        search: true,
        render: ({ blockHeight }) => (
          <Anchor href={`/block/${blockHeight}`} label={blockHeight} />
        )   
      }
    ]
    const {transactions} = this.state;

    return (
      <Dashboard>
        <h2>Transactions</h2>

        <DataTable
          data={transactions}
          columns={columns}
          // sortable
        />
      </Dashboard>
    )
  }

  setBlock = blockHeight => {
    const blockEndpoint = `${NDAU_ENDPOINT}/block/height/${blockHeight}`

    return axios.get(blockEndpoint, HTTP_REQUEST_HEADER)
      .then(response => {
        return response.data.block.data.txs
      })
      .catch(error => console.log(error))
  }

  setTransactions = (blockHeight) => {
    if (blockHeight) {
      getTransactions(blockHeight)
      .then(transactions => this.setState({ transactions }))
    }
  }

  componentDidMount () {
    this.setTransactions()
  }
}

export default Transactions
