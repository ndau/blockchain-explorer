import React, { Component } from 'react'
import { Box, Chart, Stack, Text } from 'grommet'
import { formatAccountEvent, convertNapuToNdau } from '../../../helpers/format'

class TimelineChart extends Component {
  constructor(props) {
    super(props)
    // this.generateData()
    

    this.state = {
      activeEvent: null
    }
  }
  render() {
    this.generateData()
    const chartProps = {
      size: { width: "xlarge", height: "xxsmall" },
      values: this.chartPoints,
    };

    const { yAxis } = this
    // const { activeEvent } = this.state;

    return (
      <Box className="timelineChart">
        <Box align="end" margin={{bottom: "xsmall"}}>
          <Text size="xsmall" weight="bold">
            <Text size="xsmall" color="#ffe7c6" weight="normal">current balance: </Text>
            {this.props.balance}
          </Text>
        </Box>

        <Box direction="row" fill>
          {/* y-axis label */}
          <Box  direction="column" align="center" width={"10px"} margin={{right: "10px"}}>
            <Text
              size="xsmall"
              color="#ffe7c6"
              style={{
                transform: "rotate(-90deg) translateX(-14.5px)",
                width: "40px",
              }}
            >
              balance
            </Text>
          </Box>

          {/* y-axis */}
          <Box flex justify="between" margin={{bottom: "0px", right: "10px"}}>
            {
              yAxis.map((y, index) => {
                return (
                  <Box key={index} direction="row" align="start" >
                    <Box fill>
                      <Text size="xsmall" style={{lineHeight: "10px"}}>{y}</Text>
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
                style={{cursor: "pointer"}}
                pad="0"
              >
                <Chart
                  {...chartProps}
                  type="line"
                  round
                  color={{ color: "#f99d1c", opacity: "strong" }}
                  thickness="xxsmall"
                />
                <Chart
                  {...chartProps}
                  type="area"
                  color={{ color: "#f99d1c", opacity: "weak" }}
                  thickness="xsmall"
                  pad="0"
                />

                {/* Bubbles */}
                {/* <Box fill direction="row" justify="between" align="end">
                  {
                    bubblePoints.map((bubblePoint, index) => { 
                      return bubblePoint && (
                        <Box
                          key={index}
                          pad="0"
                          width="6px"
                          height="6px"
                          round
                          background="rgba(255,255,255,0.3)"
                          margin={{bottom: bubblePoint.pad}}
                        />
                      )
                    })
                  }
                </Box> */}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

  // componentDidUpdate() {
  //   this.generateData()
  // }

  generateData = () => {
    this.maxBalance = this.findMaxBalance()
    this.chartPoints = this.generateEventsData()
    this.bubblePoints = this.generateBubblePoints(this.props.events, this.maxBalance)
    this.yAxis = [
      this.maxBalance === "0" ? "" : this.maxBalance, 
      "0"
    ]
  }

  generateEventsData = () => {
    const { events } = this.props
    return events.reverse().map((event, index) => {
      const eventData = formatAccountEvent(event)
      return [index, eventData.raw.balance]
    })
  }

  generateBubblePoints = (data=[], highestYAxisValue) => {
    return data.map(datum => {
      const event = formatAccountEvent(datum)
      return {
        event,
        pad: `${((parseFloat(event.balance) / parseFloat(this.maxBalance))*48) - 4}px`
      }  
    });
  }

  setShowBubbles = (show=false) => {
    this.setState({
      showBubbles:  show
    })
  }

  findMaxBalance = () => {
    let maxBalance = 0;

    this.props && this.props.events.forEach(event => {
      maxBalance = Math.max(maxBalance, event.Balance)
    });

    return convertNapuToNdau(maxBalance)
  }
}

export default TimelineChart
