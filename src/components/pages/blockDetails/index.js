import React, { Component } from 'react'
import axios from 'axios'
// import moment from 'moment'
import Details from '../../templates/details'
import { NDAU_ENDPOINT, HTTP_REQUEST_HEADER } from '../../../constants.js'

class BlockDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blockData: null,
      blockHeight: null,
      transactions: null,
    }
  }

  formatBlockData = ()=> {
    if (!this.state.blockData) {
      return null
    }

    const { blockData: {
      hash,
      height,
      time,
      num_txs: transactions,
    }} = this.state;
     
    return {
      hash,
      height,
      time,
      transactions,
    }
  }

  render() {
    return (
      <Details
        data={this.formatBlockData()}
      />
    )
  }


  setBlock = () => {
    const { blockHeight } = this.props.match.params;
    const blockEndpoint = `${NDAU_ENDPOINT}/block/height/${blockHeight}`
    
    axios.get(blockEndpoint, HTTP_REQUEST_HEADER)
      .then(({data}) => {
        const blockData = { 
          ...data.block_meta.block_id, 
          ...data.block_meta.header,
        }
        const transactions = data.block.data.txs;

        this.setState({ blockData, transactions, blockHeight })
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.setBlock()
  }
}

export default BlockDetails