import React, { Component } from 'react';
import { Box, Chart, Stack, Text } from "grommet";
import Age from '../../atoms/age'
import ChartLegend from '../chartLegend'
import { humanizeNumber, formatTime } from '../../../helpers/format'
import { price_at_unit } from '../../../helpers/ndauMath';
import { PRIMARY_LIME } from '../../../constants'

const X_AXIS_HEIGHT = "20px";

class PriceCurve extends Component {
  constructor(props) {
    super(props)

    this.state = {
      priceCurveData: null,
      xAxis: [],
      yAxis: [],
      trackerAreaPoints: [],
      activeXValue: null,
      activeYValue: null,
    }

    this.getData();
  }

  render() {
    if(!this.state.priceCurveData) {
      return (
        <Box pad="xlarge" animation="pulse">
          <Text alignSelf="center" size="xsmall">Loading price data...</Text>
        </Box>
      )
    }

    const {
      priceCurveData,
      yAxis, xAxis,
      trackerAreaPoints,
      activeXValue,
      activeYValue,
      ndauIssued,
      currentPrice,
    } = this.state;
     

    const { priceInfo, lastUpdated } = this.props
    const { marketPrice, totalNdau, sib } = priceInfo || {}
  
    const chartProps = {
      size: { width: "xlarge", height: "small" },
      values: priceCurveData,
    };

    const active = activeXValue || activeXValue === 0
    const totalNdauIssued = active ? activeXValue: ndauIssued
    const nextIssuePrice = active ? activeYValue : currentPrice

    return (
      <Box className="ndauPriceCurve">
         <Box align="end">
          <Text 
            as="em"
            color="#999" 
            size="xsmall" 
            margin={{left: "small"}}
          >
            last updated <Age timestamp={lastUpdated} recent="just now" suffix="ago"/>, {formatTime(lastUpdated)}
          </Text>
        </Box>

        <Box align="end" margin={{bottom: "15px"}}>
          
          
          

          <ChartLegend
            totalNdau={totalNdau} 
            marketPrice={marketPrice}
            sib={sib}
            active={active}
            totalNdauIssued={totalNdauIssued}
            nextIssuePrice={nextIssuePrice}
          />
          
        </Box>

        <Box direction="row" fill>
          {/* y-axis label */}
          <Box  direction="column" align="center" width={"20px"} margin={{right: "10px"}}>
            <Text
              size="xsmall"
              color="#ffe7c6"
              style={{
                transform: "rotate(-90deg) translateX(-85px)",
                width: "100px",
              }}
            >
              price to issue (USD)
            </Text>
          </Box>
          
          {/* y-axis */}
          <Box flex justify="between" margin={{bottom: X_AXIS_HEIGHT, right: "10px"}}>
            {
              yAxis && yAxis.map((y, index) => {
                return (
                  <Box key={index} direction="row" align="start" >
                    <Box fill>
                      <Text size="xsmall" style={{lineHeight: "12px"}}>{`${y}`}</Text>
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
                margin={{left: "18px"}}
                style={{cursor: "pointer"}}
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
                  style={{opacity: 0.7}}
                  thickness="xxsmall"
                />

                {/* Tracker */}
                {
                  (activeXValue === 0 || activeXValue) &&
                  <Box fill direction="row">
                    <Box flex={false} margin={{left: `${((activeXValue/ndauIssued)*100)}%`}} >
                      <Box
                        fill
                        pad="0"
                        border={{
                          color: "rgba(255, 255, 255, 0.5)",
                          side: "left",
                          size: "1px"
                        }}
                      />
                    </Box>
                  </Box>
                }

                <Chart
                  {...chartProps}
                  type="bar"
                  values={trackerAreaPoints}
                  round
                  color={{ color: "rgba(0,0,0,0)", opacity: "medium" }}
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
                      xAxis.map((x, index) => <Text key={index} size="xsmall">{x}</Text>)
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
          >
            issuance of reserve ndau
          </Text>
        </Box>
      </Box>
    )
  }

  getData = () => {
    const { priceInfo } = this.props;
    this.resetState(priceInfo)
  }

  componentDidUpdate = (prevProps) => {
    const { priceInfo } = this.props;
    if(!priceInfo) {
      return;
    }

    if (JSON.stringify(priceInfo) !== JSON.stringify(prevProps.priceInfo)) {
      return this.resetState(priceInfo);
    }
  }

  resetState = (priceInfo) => {
    if(!priceInfo) {
      return null;
    }

    const ndauIssued = priceInfo.totalIssued;
    const priceCurveData = this.generatePriceCurveData(0, ndauIssued);
    const currentPrice = price_at_unit(ndauIssued);
    const trackerAreaPoints = this.generateTrackerAreaPoints(priceCurveData, currentPrice);
   
    this.setState({
      priceCurveData,
      xAxis: [0, humanizeNumber(ndauIssued, 0)],
      yAxis: [humanizeNumber(currentPrice, 2, 2), `1.00`],
      trackerAreaPoints,
      ndauIssued,
      currentPrice,
    })
  }

  // generatePriceData generates a data table we can use to calculate extents
  // It uses the ndau price function
  generatePriceCurveData = (start_ndau=0, end_ndau=0) => {
    var points = [];
    for (var n = start_ndau; n <= end_ndau; n += Math.floor((end_ndau - start_ndau) / 1000)) {
      points.push( [n, price_at_unit(n)] )
    }

    return points;
  }

  generateTrackerAreaPoints = (priceCurveData=[], highestYAxisValue) => {
    return priceCurveData.map(datum => {
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

export default PriceCurve
