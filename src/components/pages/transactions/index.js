import React, { Component } from 'react'
import { 
  Box, Text, CheckBox
} from 'grommet'
import Main from '../../templates/main'
import { getNodeStatus, getBlocks, pollForBlocks, getAllTransactions } from '../../../helpers/fetch'
import { POLL_INTERVAL } from '../../../constants'
import './style.css'

class Transanctions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [],
      hideEmpty: false,
      lastestBlockHeight: null,
      lastFetchedHeight: null,
    }

    setTimeout(this.toggleHideEmpty, 100)
  }

  render() {
    const { transactions, hideEmpty } = this.state
    // const transactions = this.getTransactions(blocks)
    console.log("transactions ", transactions)

    return (
      <Main browserHistory={this.props.history}> 
        <Box margin={{bottom: "20px"}}>
          <Text size="large" weight="bold">
            Transactions{' '}
            {/* <Text
              size="xsmall"
              color="#aaa"
              weight="normal"
              style={{float: "right"}}
            >
              <CheckBox
                toggle
                checked={hideEmpty}
                label="hide empty blocks"
                onChange={this.toggleHideEmpty}
                reverse
                name="small" 
              />
            </Text> */}
          </Text>
        </Box>
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
    const { hideEmpty } = this.state
    getNodeStatus()
      .then(status => {
        if (!status) {
          return null
        }

        const latestBlockHeight = status.latest_block_height;
        getBlocks({before: latestBlockHeight, filter: hideEmpty, limit: 1})
          .then(({blocks, lastFetchedHeight}) => {
            const currentBlock = blocks[0]
            
            this.setState({
              blocks,
              nodeStatus: status,
              lastFetchedHeight,
              latestBlockHeight,
              hideEmpty
            }, () => {
              this.startPolling({
                after: this.state.latestBlockHeight, 
                filter: hideEmpty,
                success: this.resetData
              })
            })
          })
      })
  }

  getTransactions = async (blocks) => {
    const transactions = [] 
    await getAllTransactions(blocks)
      .then()
    return transactions
  }

  componentWillUnmount() {
    this.endPolling()
  }

  startPolling = ({after, filter, limit, success}) => {
    this.endPolling()

    this.pollInterval = window.setInterval(
      pollForBlocks({after, filter, limit, success}), 
      POLL_INTERVAL
    );
  }

  endPolling = () => {
    if (this.pollInterval) {
      window.clearInterval(this.pollInterval)
    }
  }

  toggleHideEmpty = () => {
    this.setState(({hideEmpty}) => {
      return { hideEmpty: !hideEmpty }
    }, () => {
      this.getData()
    })
  }

  loadMoreBlocks = () => {
    const { lastFetchedHeight, hideEmpty } = this.state
    if (!lastFetchedHeight || lastFetchedHeight < 2) {
      return
    }

    this.setState({ loading: true })

    getBlocks({before: lastFetchedHeight - 1, filter: hideEmpty})
      .then(({ blocks : previousBlocks, lastFetchedHeight}) => {
        if (previousBlocks.length < 1) {
          return
        }

        this.setState(({ blocks }) => {
          return {
            blocks: [...blocks, ...previousBlocks],
            lastFetchedHeight,
            loading: false
          }
        })
      })
  }

  resetData = (newBlocks, lastestBlockHeight) => {
    if (newBlocks && newBlocks.length > 0) {
      this.setState(({blocks=[]}) => {
        return {
          blocks: [...newBlocks, ...blocks],
          lastestBlockHeight,
        }
      })
    }
  }
}

export default Transanctions;
