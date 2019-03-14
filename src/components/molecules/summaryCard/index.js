import React, { Component } from 'react'
import { Anchor, Text } from 'grommet'
import Card from '../../atoms/card'
import { makeURLQuery } from '../../../helpers'

class StatusCard extends Component {
  render() {
    const { summary } = this.props;
    if (!summary) {
      return null;
    }

    const { 
      marketPrice,  // : 16.85,
      targetPrice, // : 17,
      // floorPrice,  // : 2.57,
      totalIssued, // : 291900000000000,
      // totalNdau, // : 0,
      priceUnit, // : "USD"
      // latest_block_hash,
      latest_block_height,
      // latest_block_time,
    } = summary;

    const blockLink = `/block/${latest_block_height}/${makeURLQuery()}`;

    return (
      <Card
        header={(
          <header>
            <Text>Summary</Text>
          </header>
        )}
        background={"#4d9678"}
        wrap
      >
        <section>
          <Text as="section">
            <b>Market Price: </b> 
            {marketPrice && marketPrice.toFixed(2)} {priceUnit}
          </Text>
          <Text as="section">
            <b>Target Price </b> 
            {targetPrice && targetPrice.toFixed(2)} {priceUnit}
          </Text>
          <Text as="section">
            <b>ndau Issued </b>
            { totalIssued && (totalIssued / 100000000).toFixed(3) }
          </Text>
          <Text as="section">
            <b>Latest block </b>
            <Anchor href={blockLink} label={`#${latest_block_height}`}/>
          </Text>
        </section> 
      </Card>
    );
  }
}

export default StatusCard;