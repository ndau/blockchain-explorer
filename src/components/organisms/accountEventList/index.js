import React, { Component } from 'react'
import { Box } from 'grommet'
import moment from 'moment'
import TimelineEvent from '../../molecules/timelineEvent'
import TimelineChart from '../../molecules/timelineChart'
import TimelineFilter from '../../molecules/timelineFilter'
import { getTransaction } from '../../../helpers/fetch'

const DEFAULT_TYPE_FILTERS = [
  "Transfer",
	"ChangeValidation",
  "ChangeRecoursePeriod",
  "Delegate",
	"Lock",
	"Notify",
	"SetRewardsDestination",
	"SetValidation",
]

class AccountEventList extends Component {
  constructor(props) {
    super(props)
     
    const { filterStartDate, filterEndDate } =  this.getDateRange(3)
    this.state = { 
      events: props.events,
      typeFilters: DEFAULT_TYPE_FILTERS,
      filterStartDate,
      filterEndDate,
      filterRange: "Last 3 months",
      selectedEvent: null,
      activeEvent: null
    }

    this.filteredEvents = props.events
  }
  
  render() {
    const { events, selectedEvent } = this.props;
    if(!events) {
      return null
    }
    
    const filteredEvents = selectedEvent ? events : this.filteredEvents || events
    const displayedEvents = selectedEvent ? [selectedEvent] : filteredEvents
    const borderStyle = "1px dashed rgba(255,255,255,0.1)"

    return (
      <Box onMouseLeave={this.clearActiveEvent}>
        {
          displayedEvents.map((event, index) => {
            const { activeEvent, selectedEvent } = this.state
            const isActive = activeEvent && ( activeEvent.TxHash === event.TxHash )
            const isSelected = selectedEvent && ( selectedEvent.TxHash === event.TxHash )

            return (
              <Box key={index} onMouseEnter={() => this.props.setActiveEvent(event)} >
                <Box 
                  round="xsmall"
                  style={{border: isActive ? "1px dashed rgba(255,255,255,0.3)" : borderStyle}}
                  background="rgba(255,255,255,0.05)"
                > 
                  <TimelineEvent 
                    event={event}
                    previousEvent={events[event.index + 1]}
                    index={index}
                    selected={isSelected}
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
    );
  }

  // componentDidUpdate = async (prevProps) => {
  //   if(!prevProps.events && this.props.events) {
  //     await this.getEventTransactions()
  //   }
  // }
}

export default AccountEventList