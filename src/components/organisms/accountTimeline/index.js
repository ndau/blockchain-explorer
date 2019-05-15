import React, { Component } from 'react'
import { Box } from 'grommet'
import TimelineEvent from '../../molecules/timelineEvent'
import TimelineChart from '../../molecules/timelineChart'

class AccountTimeline extends Component {
  state = { activeBlock: null }

  render() {
    const { events, balance } = this.props;

    if(!events) {
      return null
    }

    const borderStyle = "1px dashed rgba(255,255,255,0.2)"

    return (
      <Box>
        {
          events.length > 1 &&
          <Box margin={{bottom: "20px"}}>
            <TimelineChart 
              events={[...events, this.initialEvent]}
              balance={balance}
            />
          </Box>
        }
        
        <Box>
          {
            events.map((event, index) => {
              const previousEvent = events[index + 1] || this.initialEvent

              return (
                <Box key={index}>
                  <Box 
                    round="xsmall"
                    style={{border: borderStyle}}
                    background="rgba(255,255,255,0.05)"
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
                      style={{borderRight: borderStyle}}
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

  initialEvent = {
    Balance: 0
  }
}

export default AccountTimeline;