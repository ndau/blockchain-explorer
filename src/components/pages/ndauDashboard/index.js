import React, { Component } from 'react'
import Dashboard from '../../templates/dashboard'
import BlocksList from '../../organisms/blocksList'
import TransactionsList from '../../organisms/transactionsList'
import NdauPriceCurve from '../../organisms/ndauPriceCurve'
import SummaryCard from '../../molecules/summaryCard'
import { MAX_FETCH_ATTEMPT } from '../../../constants.js'
import {
  getNodeStatus,
  getCurrentOrder,
  getBlocks,
  getTransactions,
  formatBlocks,
  pollForBlocks,
} from '../../../helpers.js'

const BLOCK_RANGE_INTERVAL = 4;

class NdauDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodeStatus: null,
      blocks: [],
      transactions: [],
      latestBlockHeight: 1,
      activeBlock: null,
      currentOrder: null,
      hideEmpty: false,
      
    }
  }

  render() {
    const { blocks, nodeStatus={}, currentOrder={}, activeBlock } = this.state;
    const summary = {...nodeStatus, ...currentOrder};
    const formattedBlocks = formatBlocks(blocks);
    const activeBlockHeight = activeBlock && activeBlock.height;
    this.setTransactions(activeBlockHeight);
  
    return (
      <Dashboard
        topLeft={
          <SummaryCard summary={summary} />
        }
        topRight={
          <NdauPriceCurve ndauSold={summary.endowmentSold && summary.endowmentSold / 100000000}/>
        }
        bottomLeft={
          <BlocksList 
            blocks={formattedBlocks}
            setActiveBlock={this.setActiveBlock}
            activeBlockHeight={activeBlockHeight} />
        }
        bottomRight={
          <TransactionsList transactions={this.state.transactions} blockHeight={activeBlockHeight} />
        }
      />
    )
  }

  componentDidMount() {
    this.getData();
  }

  getData = (attemps) => {
    let counter = attemps || 0;

    if(counter >= MAX_FETCH_ATTEMPT) {
      console.log(`checked node status ${counter} times, quitting...`)
      return null
    }

    getNodeStatus()
      .then(status => {
        if (!status) {
          // console.log('API is probaby down, checking again..')
          // setTimeout(() => this.getData(counter+1), POLL_INTERVAL);
          return null
        }

        this.setState({ nodeStatus: status })
        return status;
      })
      .then((status) => {
        getCurrentOrder()
          .then(currentOrder =>  this.setState({ currentOrder }))
        
        return status
      })
      .then((status) => {
        if (!status) {
          return
        }

        const latestHeight = status.latest_block_height;
        const maximum = BLOCK_RANGE_INTERVAL  + 1;
 
        getBlocks(null, latestHeight, maximum)
          .then((blocks=[]) => {
            const latestBlocks = blocks.slice(0, maximum);

            this.setState({ 
              blocks: latestBlocks,
              activeBlockHeight: latestHeight
            }, ()=> pollForBlocks(latestHeight, maximum, this.resetData))
          })
      })
  }

  
  
  resetData = (newBlocks=[], newStatus, latestBlockHeight) => {
    const maximum = BLOCK_RANGE_INTERVAL  + 1;
  
    this.setState(({blocks=[]}) => {
      const latestBlocks = [...newBlocks, ...blocks].slice(0, maximum)
      console.log(`FOUND ${newBlocks.length} new block(s)!`)
      return {
        blocks: latestBlocks,
        nodeStatus: newStatus,
        latestBlockHeight,
      }
    })
  }

  setTransactions = (blockHeight) => {
    if (blockHeight) {
      getTransactions(blockHeight)
      .then(transactions => this.setState({ transactions }))
    }
  }

  toggleHideEmpty = () => {
    this.setState(({hideEmpty})=> {
      return {
        hideEmpty: !hideEmpty
      }
    })
  }


  setActiveBlock = (activeBlock) => {
    this.setState({ activeBlock })
  }
}

export default NdauDashboard;