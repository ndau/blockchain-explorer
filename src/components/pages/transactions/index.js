/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from 'react'
import { 
  Box, Text, DataTable, ResponsiveContext
} from 'grommet'
import Main from '../../templates/main'
import ColumnHeader from '../../molecules/columnHeader'
import TableData from '../../molecules/tableData'
import Age from '../../atoms/age'
import Anchor from '../../atoms/anchor'
import TruncatedText from '../../atoms/truncatedText'
import TransactionFilters from '../../organisms/transactionsFilters'
import { getNodeStatus,  getTransactionsBefore, pollForTransactions } from '../../../helpers/fetch'
import { formatTransactions } from '../../../helpers/format'
// import { POLL_INTERVAL } from '../../../constants'
import './style.css'

const POLL_INTERVAL = 10000
const CURRENT_TX_HASH =  "start"

class Transanctions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTxHash: CURRENT_TX_HASH,
      nextTxHash: null,
      transactions: [],
      filteredTransactions: [],
      typeFilters: null
    }
    
    this.getData()
  }

  render() {
    const { transactions } = this.state
    const formattedTransactions = formatTransactions(transactions)

    return (
      <Main browserHistory={this.props.history}> 
        <Box margin={{bottom: "20px"}}>
          <Text size="large" weight="bold">
            Transactions{' '}
          </Text>
        </Box>

        <Box>
          <TransactionFilters 
            transactions={transactions}
            updateFilters={this.updateFilters} 
          />
        </Box>

        <ResponsiveContext.Consumer>
          {
            screenSize => {
              return (
                <DataTable
                  data={formattedTransactions}
                  columns={this.columns}
                  onMore={this.loadMoreTransactions}
                  size="medium"
                  className="dataTable"
                />
              )
            }
          }
        </ResponsiveContext.Consumer>
      </Main>
    )
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

  getData = (typeFilters) => {
    getNodeStatus()
      .then(status => {
        if (!status) {
          return null
        }

        const { currentTxHash } = this.state
        getTransactionsBefore(currentTxHash, typeFilters)
          .then(({Txs, NextTxHash}) => {
         
            if(Txs) {
              const currentTxHash = Txs[0].TxHash

              this.setState({
                transactions: Txs,
                filteredTransactions: Txs,
                currentTxHash,
                nextTxHash: NextTxHash
              }, () => {
                this.startPolling()
              })
            }
            
          })
          .catch(error => {
           
            return
          })
            
      })
  }

  componentWillUnmount() {
    this.endPolling()
  }

  startPolling = () => {
    this.endPolling()

    this.pollInterval = window.setInterval(
      pollForTransactions({
        currentTxHash: this.state.currentTxHash,
        typeFilters: this.state.typeFilters,
        success: this.resetData
      }), 
      POLL_INTERVAL
    );
  }

  endPolling = () => {
    if (this.pollInterval) {
      window.clearInterval(this.pollInterval)
    }
  }

  loadMoreTransactions = () => {
    const { nextTxHash, typeFilters } = this.state

   
    if (!nextTxHash || nextTxHash.length < 1) {
      return
    }

    getTransactionsBefore(nextTxHash, typeFilters)
      .then(({Txs, NextTxHash}) => {
        if(Txs) {
          this.resetData(Txs, NextTxHash)
        }
      })
  }

  resetData = (newTransactions, nextTxHash) => {
    this.setState(({transactions=[]}) => {
      return {
        transactions: [...newTransactions, ...transactions],
        nextTxHash,
        loading: false,
      }
    })
  }

  updateFilters = (typeFilters) => {
    //
    // if (typeFilters) {
    const { transactions } = this.state
    if (!transactions) {
      return []
    }

    getTransactionsBefore('start', typeFilters)
      .then(({Txs, NextTxHash}) => {
    
        if(Txs) {
          const currentTxHash = Txs[0].TxHash

       
          //
          //
          this.setState({ 
            transactions: Txs,
            nextTxHash: NextTxHash,
            currentTxHash,
            typeFilters,
          }, () => {
            this.startPolling()
          })
        }
        
      })
      .catch(error => {
       
        return
      })
  }

  columns = [
    {
      property: "type",
      header: <ColumnHeader>type</ColumnHeader>,
      // align: "center",
      render: ({type}) => <TableData>{type}</TableData>
    },
    {
      property: "amount",
      header: <ColumnHeader>amount</ColumnHeader>,
      // align: "center",
      render: ({amount}) => <TableData>{amount || "--"}</TableData>
    },
    {
      property: "hash",
      header: <ColumnHeader>hash</ColumnHeader>,
      // align: "center",
      primary: true,
      render: ({hash}) => {
        return (
          <TableData>
            <Anchor
              href={`/transaction/${hash}`}
            >
            <Text size="small">
              <TruncatedText value={hash} maxLength="11" size="small" />
            </Text>
            
            </Anchor>
          </TableData>
        )
      }
    },
    {
      property: "added",
      header: <ColumnHeader>added</ColumnHeader>,
      // align: "end",
      render: ({raw: {timestamp} }) => {
        return (
          <TableData>
            <Text size="small">
              <Age timestamp={timestamp} suffix="ago" />
            </Text>
            
          </TableData>
        )
      }
    },
  ]
}

export default Transanctions;
