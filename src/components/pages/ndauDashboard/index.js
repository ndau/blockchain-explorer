import React, { Component } from 'react'
import Dashboard from '../../templates/dashboard'
import LatestBlocks from '../../organisms/latestBlocks'
import PriceCurve from '../../organisms/priceCurve'
import {
  getNodeStatus,
  getCurrentOrder,
  getBlocks,
  pollForBlocks,
} from '../../../helpers'

const BLOCK_LIST_LENGTH = 5;

class NdauDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: null,
      latestBlockHeight: 1,
      currentOrder: null,
      hideEmpty: false,
    }

    this.getData();
  }

  render() {
    const { blocks, currentOrder={} } = this.state;
  
    return (
      <Dashboard
        browserHistory={this.props.history}
        selectNode
        top={
          <PriceCurve currentOrder={currentOrder} />
        }
        bottom={
          <LatestBlocks blocks={blocks} range={BLOCK_LIST_LENGTH} />        
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

        // this.setState({ nodeStatus: status })
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
          .then((blocks) => {
            if(!blocks) {
              return null;
            }

            const latestBlocks = blocks.slice(0, maximum);
            const latestBlock = latestBlocks[0];
    
            this.setState({ 
              blocks: latestBlocks,
            }, ()=> pollForBlocks(latestHeight, maximum, this.resetData))

            return latestBlock
          })
      })
      
  }

  resetData = (newBlocks=[], latestBlockHeight, newCurrentOrder) => {
    this.setState(({currentOrder}) => {
      return {
        blocks: newBlocks,
        latestBlockHeight,
        currentOrder: newCurrentOrder || currentOrder
      }
    })
  }
}

export default NdauDashboard;