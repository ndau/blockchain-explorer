import React, { Component } from 'react'
import Dashboard from '../../templates/dashboard'
import LatestBlocks from '../../organisms/latestBlocks'
import NdauPriceCurve from '../../organisms/ndauPriceCurve'
import SummaryCard from '../../molecules/summaryCard'
import {
  getNodeStatus,
  getCurrentOrder,
  getBlocks,
  pollForBlocks,
} from '../../../helpers.js'

const BLOCK_LIST_LENGTH = 5;

class NdauDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodeStatus: null,
      blocks: [],
      transactions: [],
      latestBlockHeight: 1,
      currentOrder: null,
      hideEmpty: false,
    }

    this.getData();
  }

  render() {
    const { blocks, nodeStatus={}, currentOrder={} } = this.state;
    const summary = {...nodeStatus, ...currentOrder};
  
    return (
      <Dashboard
        browserHistory={this.props.history}
        selectNode
        topLeft={
          <SummaryCard summary={summary} />
        }
        topRight={
          <NdauPriceCurve
            ndauSold={summary.totalIssued && summary.totalIssued / 100000000}
          />
        }
        bottom={
          <LatestBlocks blocks={blocks} />
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
    getNodeStatus()
      .then(status => {
        if (!status) {
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
        const maximum = BLOCK_LIST_LENGTH;
 
        getBlocks(null, latestHeight, maximum, null)
          .then((blocks=[]) => {
            const latestBlocks = blocks.slice(0, maximum);
            const latestBlock = latestBlocks[0];
    
            this.setState({ 
              blocks: latestBlocks,
            }, ()=> pollForBlocks(latestHeight, maximum, this.resetData))

            return latestBlock

          })
      })
      
  }

  resetData = (newBlocks=[], newStatus, latestBlockHeight, newCurrentOrder) => {
  
    this.setState(({currentOrder}) => {
      console.log(`FOUND ${newBlocks.length} new block(s)!`)
      return {
        blocks: newBlocks,
        nodeStatus: newStatus,
        latestBlockHeight,
        currentOrder: newCurrentOrder || currentOrder
      }
    })
  }
}

export default NdauDashboard;