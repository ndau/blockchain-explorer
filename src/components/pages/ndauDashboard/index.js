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
      priceInfo: null,
      hideEmpty: false,
      lastUpdated: new Date()
    }

    this.getData();
  }

  render() {
    const { blocks, priceInfo={}, lastUpdated } = this.state
    return (
      <Dashboard
        browserHistory={this.props.history}
        selectNode
        top={
          <PriceCurve priceInfo={priceInfo} lastUpdated={lastUpdated} />
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

        const latestBlockHeight = status.latest_block_height;
        const limit = BLOCK_LIST_LENGTH;
        const hideEmpty = this.state.hideEmpty;
 
        getBlocks({before: latestBlockHeight, filter: hideEmpty, limit})
          .then(({blocks}) => {
            if(!blocks) {
              return null;
            }
    
            this.setState({ 
              blocks,
              latestBlockHeight,
            }, ()=> {
              this.startPolling({
                after: this.state.latestBlockHeight, 
                filter: hideEmpty,
                success: this.resetData
              })
            })
          })
      })
      .then(()=> {
        getCurrentOrder()
          .then(priceInfo =>  this.setState({ priceInfo }))
      })
  }

  componentWillUnmount() {
    this.endPolling()
  }

  startPolling = ({after, filter, success}) => {
    this.endPolling()

    this.pollInterval = window.setInterval(
      pollForBlocks({after, filter, success}), 
      POLL_INTERVAL
    );
  }

  endPolling = () => {
    if (this.pollInterval) {
      window.clearInterval(this.pollInterval)
    }
  }

  resetData = (newBlocks, latestBlockHeight, newPriceInfo) => {
    if (newBlocks && newBlocks.length > 0) {
      const { blocks=[] } = this.state;

      const latestBlocks = [...newBlocks, ...blocks].slice(0, 5)

      this.setState(({priceInfo}) => {
        return {
          blocks: latestBlocks,
          latestBlockHeight,
          priceInfo: newPriceInfo || priceInfo,
          lastUpdated: new Date()
        }
      })
    }
  }
}

export default NdauDashboard;