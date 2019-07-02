import React, { Component } from 'react'
import { Box, Chart, Stack, Text } from 'grommet'
import { formatAccountEvent, convertNapuToNdau } from '../../../helpers/format'

class TimelineChart extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      activeEvent: null,
      selectedTransactionIndex: null
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
        <Box align="end" margin={{bottom: "10px"}}>
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
                    <Box sfill>
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
                <Box flex direction="row" justify="between" align="end" overflow="visible">
                  {
                    this.bubblePoints.map((bubblePoint, index) => { 
                      const {eventIndex, pad, event, isActive, isSelected, display, onSelect} = bubblePoint
                      const previousEvent = this.props.events[eventIndex - 1]
                      const amount = previousEvent && event.Balance - previousEvent.Balance

                      // console.log(isActive, index) 
                      return bubblePoint && (
                        <Box pad={{bottom: pad}} key={index}>
                          <Stack>
                            {
                              (isActive || isSelected) &&
                              <Box
                                // margin="2px"
                                width="8px"
                                height="8px"
                                animation={["fadeIn", {
                                  "type": "pulse",
                                  "delay": 0,
                                  "duration": 600,
                                  "size": "large"
                                }]}
                                background="transparent"
                                // margin={{bottom: bubblePoint.pad}}
                                // onClick={bubblePoint.onSelect}
                                round
                                style={{
                                  border:"1px solid #bbb",
                                  // overflow: "hidden"
                                  // visibility: bubblePoint.display ? "visible":"hidden",
                                }}
                              />
                            }
                            <Box
                              pad="0"
                              width="8px"
                              height="8px"
                              round
                              background={
                                amount === 0 ? 'rgba(255,255,255, 0.3)' : ( 
                                  amount < 0 ? 'rgba(255,0,0,0.3)':'rgba(0,255,0,0.3)'
                              )}
                              onClick={onSelect}
                              style={{
                                visibility: display ? "visible":"hidden",
                              }}
                            />
                          </Stack>
                        </Box>
                      )
                    })
                  }
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

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

  generateBubblePoints = () => {
    const { 
      events, filteredEvents, activeEvent, selectedEvent, toggleSelectedEvent 
    } = this.props
    return events.map((event, index) => {
      const displayState = filteredEvents.find(transaction => {
        return transaction.TxHash === event.TxHash
      })

      const pad = `${(event.Balance / this.findMaxBalance(true)) *40}px`
      
      return {
        event,
        pad,
        display: displayState,
        isActive: activeEvent && ( activeEvent.TxHash === event.TxHash ),
        isSelected: selectedEvent && selectedEvent.TxHash === event.TxHash,
        onSelect: () => toggleSelectedEvent(event),
        eventIndex: index
      }  
    });
  }

  setSelectedTransaction = (index) => {
    this.setState({
      selectedTransactionIndex: index
    })
  }

  setShowBubbles = (show=false) => {
    this.setState({
      showBubbles:  show
    })
  }

  findMaxBalance = (raw=false) => {
    let maxBalance = 0;

    this.props && this.props.events.forEach(event => {
      maxBalance = Math.max(maxBalance, event.Balance)
    });

    return raw ? maxBalance : convertNapuToNdau(maxBalance)
  }
}

export default TimelineChart
