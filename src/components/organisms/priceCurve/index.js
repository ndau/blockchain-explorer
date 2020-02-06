/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from 'react'
import { Box, Text } from 'grommet'
import Age from '../../atoms/age'
import ChartLegend from '../chartLegend'
import { humanizeNumber, formatTime } from '../../../helpers/format'
import { price_at_unit } from '../../../helpers/ndauMath'

export default class PriceCurve extends Component {
  constructor (props) {
    super(props)

    this.state = {
      priceCurveData: null,
      xAxis: [],
      yAxis: [],
      trackerAreaPoints: [],
      activeXValue: null,
      activeYValue: null
    }

    this.getData()
  }

  render () {
    if (!this.state.priceCurveData) {
      return (
        <Box
          pad='xlarge'
          animation='pulse'
          height='small'
          direction='row'
          justify='center'
        >
          <Text alignSelf='center' size='xsmall'>
            Loading price data...
          </Text>
        </Box>
      )
    }

    const { activeXValue, activeYValue, ndauIssued, currentPrice } = this.state

    const { priceInfo, lastUpdated } = this.props
    const { marketPrice, totalNdau, sib } = priceInfo || {}

    const active = activeXValue || activeXValue === 0
    const totalNdauIssued = active ? activeXValue : ndauIssued
    const nextIssuePrice = active ? activeYValue : currentPrice

    return (
      <Box className='ndauPriceCurve'>
        <Box align='end'>
          <Text
            color='#999'
            size='xsmall'
            margin={{ left: 'small' }}
            style={{ fontStyle: 'italic' }}
          >
            last updated{' '}
            <Age timestamp={lastUpdated} recent='just now' suffix='ago' />,{' '}
            {formatTime(lastUpdated)}
          </Text>
        </Box>

        <Box align='end' margin={{ bottom: '15px' }}>
          <ChartLegend
            totalNdau={totalNdau}
            marketPrice={marketPrice}
            sib={sib}
            active={active}
            totalNdauIssued={totalNdauIssued}
            nextIssuePrice={nextIssuePrice}
          />
        </Box>
      </Box>
    )
  }

  getData = () => {
    const { priceInfo } = this.props
    this.resetState(priceInfo)
  }

  componentDidUpdate = prevProps => {
    const { priceInfo } = this.props
    if (!priceInfo) {
      return
    }

    if (JSON.stringify(priceInfo) !== JSON.stringify(prevProps.priceInfo)) {
      return this.resetState(priceInfo)
    }
  }

  resetState = priceInfo => {
    if (!priceInfo) {
      return null
    }

    const ndauIssued = priceInfo.totalIssued
    const priceCurveData = this.generatePriceCurveData(0, ndauIssued)
    const currentPrice = price_at_unit(ndauIssued)
    const trackerAreaPoints = this.generateTrackerAreaPoints(
      priceCurveData,
      currentPrice
    )

    this.setState({
      priceCurveData,
      xAxis: [0, humanizeNumber(ndauIssued, 0)],
      yAxis: [humanizeNumber(currentPrice, 2, 2), `1.00`],
      trackerAreaPoints,
      ndauIssued,
      currentPrice
    })
  }

  // generatePriceData generates a data table we can use to calculate extents
  // It uses the ndau price function
  generatePriceCurveData = (start_ndau = 0, end_ndau = 0) => {
    var points = []
    for (
      var n = start_ndau;
      n <= end_ndau;
      n += Math.floor((end_ndau - start_ndau) / 1000)
    ) {
      points.push([n, price_at_unit(n)])
    }

    return points
  }

  generateTrackerAreaPoints = (priceCurveData = [], highestYAxisValue) => {
    return priceCurveData.map(datum => {
      return (
        datum && {
          value: [datum[0], highestYAxisValue],
          onHover: showMarker => this.showMarker(showMarker && datum)
        }
      )
    })
  }

  showMarker = (datum = []) => {
    this.setState({
      activeXValue: datum[0],
      activeYValue: datum[1]
    })
  }
}
