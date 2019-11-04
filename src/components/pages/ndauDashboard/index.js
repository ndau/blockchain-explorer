import React, { Component } from 'react'
import { Box } from 'grommet'
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
      hideEmpty: true,
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
      >
        <Box margin={{bottom: "large"}}>
         <PriceCurve priceInfo={priceInfo} lastUpdated={lastUpdated} />
        </Box>
        
        <LatestBlocks blocks={blocks} range={BLOCK_LIST_LENGTH} />        
      </Dashboard>
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
        getCurrentOrder()
          .then(priceInfo =>  {
            if (!status) {
              this.setState({ priceInfo })
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
                  priceInfo
                }, ()=> {
                  this.startPolling({
                    after: this.state.latestBlockHeight, 
                    filter: hideEmpty,
                    success: this.resetData
                  })
                })
              }) 
          })
        return status
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