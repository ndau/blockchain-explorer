import React, { Component } from 'react'
import { Box, Text } from 'grommet'
import TimelineEvent from '../../molecules/timelineEvent'
import TimelineChart from '../../molecules/timelineChart'

class AccountTimeline extends Component {
  state = { activeBlock: null }

  render() {
    const { events } = this.props;

    if(!events) {
      return null
    }

    const borderStyle = {border: "1px dashed rgba(255,255,255,0.2)"}

    return (
      <Box>
        <Box align="center" margin={{top: "large", bottom: "small"}}>
          <Text weight="bold">Timeline</Text>
        </Box>

        <Box margin={{bottom: "10px"}}>
          <TimelineChart events={events} />
        </Box>

        <Box overflow="hidden">
          {
            events.reverse().map((event, index) => {
              const previousEvent = events[index + 1] 

              return (
                <Box key={index}>
                  <Box 
                    round="xsmall" 
                    // style={{border: "1px dotted #666"}}
                    // elevation="medium"
                    style={borderStyle}
                    background="rgba(255,255,255,0.06)"
                  > 
                    <TimelineEvent 
                      event={event}
                      previousEvent={previousEvent}
                      index={index}
                    />
                  </Box>
                  {
                    index !== events.length -1 &&
                    <Box 
                      alignSelf="center" 
                      border="right" 
                      height="20px" 
                      width="0"
                      style={borderStyle}
                    />
                  } 
                </Box>
              )
            })
          }
        </Box>
      </Box>
    );
  }

  setActiveBlock = (activeBlock) => {
    this.setState({ activeBlock })
  }
}

export default AccountTimeline;