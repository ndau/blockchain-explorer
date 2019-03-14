import React, { Component } from 'react';
import { Box, Chart, Stack, Text } from "grommet";
import { price_at_unit, get_market_cap } from '../../../helpers/ndauMath.js';
import { getCurrentOrder, throttle } from '../../../helpers'
import { PRIMARY_LIME } from '../../../constants'

const X_AXIS_HEIGHT = "20px";

class nPriceCurve extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      priceData: null,
      xAxis: [],
      yAxis: [],
      trackerAreaPoints: [],
      activeXValue: null,
      activeYValue: null
    }
  
    this.getData();
  } 

  render() {
    const { 
      priceData, 
      yAxis, xAxis, 
      trackerAreaPoints,
      activeXValue, 
      activeYValue, 
      ndauIssued, 
      currentPrice 
    } = this.state;

    const chartProps = {
      size: { width: "xxlarge", height: "small" },
      values: priceData,
      overflow: true
    };

    if(!priceData) {
      return null
    }
    return (
      <Box className="ndauPriceCurve">
        <Box align="end" margin={{bottom: "20px"}}>
          <Text>
            {
              <Text size="small" margin={{left: "small"}} weight="bold">
                <Text color="#ffe7c6" size="small" weight="normal">market cap: </Text>
                {(activeXValue || activeXValue === 0) ? get_market_cap(activeXValue).toFixed(2) : get_market_cap(ndauIssued).toFixed(2)} USD
              </Text>
            }
          </Text>
          <Text>
            {
              <Text size="small" margin={{left: "small"}} weight="bold">
                <Text color="#ffe7c6" size="small" weight="normal">ndau issued: </Text>
                {(activeXValue || activeXValue === 0) ? activeXValue: ndauIssued.toFixed(0)}
              </Text>
            }
            {
              <Text size="small" margin={{left: "small"}} weight="bold">
                <Text color="#ffe7c6" size="small" weight="normal">market price: </Text>
                {(activeYValue || activeYValue === 0) ? activeYValue.toFixed(2) : currentPrice.toFixed(2)} USD
              </Text>
            }
          </Text>
        </Box>

        

        <Box direction="row" fill>
          {/* y-axis label */}
          <Box  direction="column" align="center" width={"40px"} margin={{right: "10px"}}>
            <Text
              size="xsmall"
              color="#ffe7c6"
              style={{
                transform: "rotate(-90deg) translateX(-65px)", 
                width: "100px",
                letterSpacing: "1px"
              }}
            >
              price (USD)
            </Text>
          </Box>

          <Box flex justify="between" margin={{bottom: X_AXIS_HEIGHT, right: "10px"}} overflow="show">
            {
              yAxis && yAxis.map((y, index) => {
                return (
                  <Box key={index} direction="row" align="end" overflow="show">
                    <Box fill>
                      <Text size="xsmall">{y}</Text>
                    </Box>
                  </Box>
                );
              })
            }
          </Box>

          <Box>
            <Box>
              <Stack 
                guidingChild="first"
                interactiveChild="last"
                margin={{left: "18px"}}
                style={{cursor: "crosshair"}}
              >
                <Chart
                  {...chartProps}
                  type="line"
                  round
                  color={{ color: PRIMARY_LIME, opacity: "weak" }}
                  thickness="small"
                />
                <Chart
                  {...chartProps}
                  type="line"
                  round
                  color={{ color: PRIMARY_LIME, opacity: "strong" }}
                  thickness="xxsmall"
                />
                <Chart
                  {...chartProps}
                  type="area"
                  round
                  color={{ color: PRIMARY_LIME, opacity: "weak" }}
                  style={{opacity: 0.5}}
                  thickness="xxsmall"
                />
                <Chart
                  {...chartProps}
                  type="bar"
                  values={trackerAreaPoints}
                  round
                  color={{ color: "transparent", opacity: "medium" }}
                  thickness="xsmall"
                />
              </Stack>

              {/* x-axis */}
              <Box flex border="top" height={X_AXIS_HEIGHT} margin={{left: "18px"}}>
                {
                  xAxis &&
                  <Box
                    direction="row"
                    justify="between"
                    align="center"
                  > 
                    {
                      xAxis.map(x => <Text key={x} size="xsmall">{x}</Text>)
                    }
                  </Box>
                }
              </Box>
            </Box>
          </Box>
        </Box>

        {/* x-axis label */}
        <Box align="center">
          <Text
            size="xsmall" 
            color="#ffe7c6"
            style={{ letterSpacing: "0.5px" }}
          >
            units of ndau issued
          </Text>
        </Box>
      </Box>
    )
  }

  getData = () => {
    const { currentOrder } = this.props;
    if (this.props.currentOrder) {
      this.resetState(currentOrder)
    }
    else {
      getCurrentOrder()
      .then(currentOrder => {
        this.resetState(currentOrder)
      })
      .catch()
    }
  }

  resetState = (orderData) => {
    if(!orderData) {
      return null;
    }

    const ndauIssued = orderData.totalIssued / 100000000;
    const priceData = this.generatePriceData(0, ndauIssued);
    const currentPrice = price_at_unit(ndauIssued);
    const trackerAreaPoints = this.generateTrackerAreaPoints(priceData, currentPrice);

    this.setState({
      priceData,
      xAxis: [0, Math.floor(ndauIssued)],
      yAxis: [`${currentPrice.toFixed(2)}`, `1.00`],
      trackerAreaPoints,
      ndauIssued,
      currentPrice
    })
  }

  // generatePriceData generates a data table we can use to calculate extents
  // It uses the ndau price function
  generatePriceData = (start_ndau=0, end_ndau=0) => {
    var points = [];
    for (var n = start_ndau; n <= end_ndau; n += Math.floor((end_ndau - start_ndau) / 1000)) {
      points.push([n, price_at_unit(n)]);
    }
    
    return points;
  }

  generateTrackerAreaPoints = (priceData=[], highestYAxisValue) => {
    return priceData.map(datum => {
      // const throttleShowMarker = throttle(this.showMarker, 200)
      return datum && {
        value: [datum[0], highestYAxisValue],
        onHover: (showMarker) => this.showMarker(showMarker && datum)
      }  
    });
  }

  showMarker = (datum=[]) => {
    this.setState({ 
      activeXValue: datum[0],
      activeYValue: datum[1],
    })
  }
}

export default nPriceCurve