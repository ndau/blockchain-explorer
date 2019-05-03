import React, { Component } from 'react'
import { Box, Chart, Stack, Text } from 'grommet'
import { formatAccountEvent } from '../../../helpers/format'

class TimelineChart extends Component {
  render() {
    const chartProps = {
      size: { width: "xlarge", height: "xxsmall" },
      values: this.generateEventsData(),
    };

    return (
      <Box className="timelineChart">
        <Box align="end">
          <Text>
          </Text>
        </Box>

        <Box direction="row" fill>
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
}

export default TimelineChart
