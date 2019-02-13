import React, { Component } from 'react'
import BlockDetails from '../../organisms/blockDetails'
import Details from '../../templates/details'
import { getBlock } from '../../../helpers.js'

class Block extends Component {
  constructor(props) {
    super(props);

    this.state = {
      block: null,
      transactionHashes: null,
    }

    this.getData();
  }

  render() {
    const { block } = this.state;

    return (
      <Details>
        <h3>Block {block && block.height}</h3>
        <BlockDetails block={block} />
      </Details>
    )
  }

  getData = () => {
    const { blockHeight } = this.props.match.params;
    getBlock(blockHeight)
      .then(block => this.setState({ block }))
  }
}

export default Block;