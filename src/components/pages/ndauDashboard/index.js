import React, { Component } from 'react'
import Dashboard from '../../templates/dashboard'
import LatestBlocks from '../../organisms/latestBlocks'
import PriceCurve from '../../organisms/priceCurve'
import {
  getNodeStatus,
  getCurrentOrder,
  getBlocks,
  pollForBlocks,
} from '../../../helpers/fetch'
import { POLL_INTERVAL } from '../../../constants'

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

        const latestBlockHeight = status.latest_block_height;
        const limit = BLOCK_LIST_LENGTH;
        const hideEmpty = this.state.hideEmpty;
 
        getBlocks(latestBlockHeight, hideEmpty, limit)
          .then(({blocks}) => {
            if(!blocks) {
              return null;
            }
    
            this.setState({ 
              blocks,
            }, ()=> {
              this.startPolling(latestBlockHeight, hideEmpty, limit, this.resetData)
            })
          })
      })
      
  }

  componentWillUnmount() {
    this.endPolling()
  }

  startPolling = (latestBlockHeight, hideEmpty, limit, success) => {
    this.endPolling()

    this.pollInterval = window.setInterval(
      pollForBlocks(latestBlockHeight, hideEmpty, limit, success), 
      POLL_INTERVAL
    );
  }

  endPolling = () => {
    if (this.pollInterval) {
      window.clearInterval(this.pollInterval)
    }
  }

  resetData = (newBlocks=[], latestBlockHeight, newCurrentOrder) => {

    this.setState(({currentOrder}) => {
      return {
        blocks: [...newBlocks],
        latestBlockHeight,
        currentOrder: newCurrentOrder || currentOrder
      }
    })
  }
}

export default NdauDashboard;