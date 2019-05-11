import React, { Component } from 'react'
import { Box, Chart, Stack, Text } from 'grommet'
import { formatAccountEvent } from '../../../helpers/format'

class TimelineChart extends Component {
  state = {yAxis: null}
  render() {
    const chartProps = {
      size: { width: "xlarge", height: "xxsmall" },
      values: this.generateEventsData(),
    };

    // const yAxis = [this.findMaxBalance(), 0]

    return (
      <Box className="timelineChart">
        <Box align="end">
          <Text>
          </Text>
        </Box>

        <Box direction="row" fill>
          {/* y-axis */}
          {/* <Box flex justify="between" margin={{bottom: "20px", right: "10px"}}>
            {
              yAxis.map((y, index) => {
                return (
                  <Box key={index} direction="row" align="start" >
                    <Box fill>
                      <Text size="xsmall">{y}</Text>
                    </Box>
                  </Box>
                );
              })
            }
          </Box> */}

          <Box>
            <Box>
              <Stack
                guidingChild="first"
                // interactiveChild="last"
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
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

  generateEventsData = () => {
    const { events } = this.props
    return events.reverse().map((event, index) => {
      const eventData = formatAccountEvent(event)
      return [index, eventData.raw.balance]
    })
  }

  findMaxBalance = () => {
    const { events } = this.props
    let maxBalance = 0;

    events.forEach(event => {
      maxBalance = Math.max(maxBalance, event.Balance)
    });

    return maxBalance / 100000000
  }
}

export default TimelineChart
