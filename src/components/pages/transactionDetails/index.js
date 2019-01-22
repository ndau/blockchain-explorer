import React, { Component } from 'react'
import axios from 'axios'
// import moment from 'moment'
import Details from '../../templates/details'
import { NDAU_ENDPOINT, HTTP_REQUEST_HEADER } from '../../../constants.js'

class TransactionDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactionData: null,
      blockHeight: null,
    }
  }

  formatTransactionData = ()=> {
    if (!this.state.blockData) {
      return null
    }

    const { blockData: {
      hash,
      time,
    }} = this.state;
     
    return {
      hash,
      time,
    }
  }

  render() {
    const transactionData = this.formatTransactionData();
    return (
      <Details
        data={transactionData}
      />
    )
  }


  setTransaction = () => {
    const { blockHeight, transactionHash } = this.props.match.params;
    const transactionEndpoint = `${NDAU_ENDPOINT}/transaction/hash/${transactionHash}`
    
    axios.get(transactionEndpoint, HTTP_REQUEST_HEADER)
      .then(({data}) => {
        const transactionData = { 
          ...data,
        }

        this.setState({ transactionData, blockHeight })
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.setBlock()
  }
}

export default TransactionDetails