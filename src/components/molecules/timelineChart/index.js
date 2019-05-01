import React, { Component } from 'react'
import { Box, Chart, Stack, Text } from "grommet"
// import { humanizeNumber } from '../../../helpers/format
import { formatAccountEvent, convertNapuToNdau } from '../../../helpers/format'
import { PRIMARY_LIME } from '../../../constants'

const X_AXIS_HEIGHT = "20px";

class TimelineChart extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     events: null,
  //     xAxis: [],
  //     yAxis: [],
  //   }

  //   this.getData();
  // }

  render() {

    const chartProps = {
      size: { width: "xlarge", height: "xxsmall" },
      values: this.generateEventsData(),
      // overflow: true
    };

    // debugger

    const { xAxis=[] } = this

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
                interactiveChild="last"
                // margin={{left: "18px"}}
                style={{cursor: "pointer"}}
              >
                <Chart
                  {...chartProps}
                  type="bar"
                  color={{ color: "rgba(255,255,255,0.06)" }}
                  thickness="large"
                />
              </Stack>

              {/* x-axis */}
              {/* <Box flex border="top" height={X_AXIS_HEIGHT} margin={{left: "18px"}}>
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
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

  // generatePriceData generates a data table we can use to calculate extents
  // It uses the ndau price function
  generateEventsData = () => {
    const { events } = this.props
    return events.map((event, index) => {
      const eventData = formatAccountEvent(event)
      return [index, eventData.raw.balance]
    })
  }
}

export default TimelineChart
