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
      transactions: []
    }
    
    this.getData()
  }

  render() {
    const { transactions  } = this.state
    const formattedTransactions = formatTransactions(transactions)

    return (
      <Main browserHistory={this.props.history}> 
        <Box margin={{bottom: "20px"}}>
          <Text size="large" weight="bold">
            Transactions{' '}
          </Text>
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

  getData = () => {
    getNodeStatus()
      .then(status => {
        if (!status) {
          return null
        }

        const { currentTxHash } = this.state
        getTransactionsBefore(currentTxHash)
          .then(({Txs, NextTxHash}) => {
         
            if(Txs) {
              const currentTxHash = Txs[0].TxHash

              this.setState({
                transactions: Txs,
                currentTxHash,
                nextTxHash: NextTxHash
              }, () => {
                this.startPolling()
              })
            }
            
          })
          .catch(error => {
            console.log(error)
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
    const { transactions, nextTxHash } = this.state
    if (nextTxHash === "") {
      return
    }

    // this.setState({ loading: true })

    getTransactionsBefore(nextTxHash)
      .then(({Txs, NextTxHash}) => {
        if(Txs) {
          this.setState({
            transactions: [ ...transactions, ...Txs ],
            nextTxHash: NextTxHash,
            loading: false
          })
        }
      })
  }

  resetData = (newTransactions, currentTxHash) => {
    if (newTransactions && newTransactions.length > 0) {
      this.setState(({transactions=[]}) => {
        return {
          transactions: [...newTransactions, ...transactions],
          currentTxHash,
        }
      })
    }
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