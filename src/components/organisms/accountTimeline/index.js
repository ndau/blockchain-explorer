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

class AccountTimeline extends Component {
  constructor(props) {
    super(props)
     
    const { filterStartDate, filterEndDate } =  this.getDateRange(12)
    this.state = { 
      events: props.events,
      typeFilters: DEFAULT_TYPE_FILTERS,
      filterStartDate,
      filterEndDate,
      filterRange: "Last year",
      filteredEvents: props.event
    }
  }
  
  render() {
    const { events, balance } = this.props;
    if(!events) {
      return null
    }
    
    const { 
      typeFilters,
      filterStartDate,
      filterEndDate,
      filterRange
     } = this.state

    const filteredEvents = this.filterEvents()
    const borderStyle = "1px dashed rgba(255,255,255,0.1)"

    return (
      <Box>
        <Box>
          <TimelineFilter 
            events={events}
            filterEvents={this.filterEvents}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            filterRange={filterRange}
            filteredEventsCount={filteredEvents && filteredEvents.length}
            typeFilters={typeFilters}
            selectFilterRange={this.selectFilterRange}
            setFilterRange={this.setFilterRange}
            toggleFilter={this.toggleFilter}
          />
        </Box>

        {
          events.length > 1 &&
          <Box margin={{bottom: "20px"}}>
            <TimelineChart 
              events={[...events, this.initialEvent]}
              filteredEvents={filteredEvents}
              balance={balance}
            />
          </Box>
        }
        
        <Box>
          {
            filteredEvents.map((event, index) => {
              return (
                <Box key={index}>
                  <Box 
                    round="xsmall"
                    style={{border: borderStyle}}
                    background="rgba(255,255,255,0.05)"
                  > 
                    <TimelineEvent 
                      event={event}
                      previousEvent={event && event.previousEvent}
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

  componentDidUpdate = async (prevProps) => {
    if(!prevProps.events && this.props.events) {
      await this.getEventTransactions()
    }
  }

  filterEvents = () => {
    const { events, typeFilters } = this.state
    if (!events) {
      return []
    }
    
    const { filterStartDate, filterEndDate } = this.state
    const filteredEvents =  events.filter(event => {
      const eventDate = moment(event.Timestamp)
      const isWithinFilterRange = eventDate.isAfter(filterStartDate) && eventDate.isBefore(filterEndDate)
      const transactionType = event.transaction && event.transaction.raw.type
      const isSelected = transactionType && typeFilters.includes(transactionType)

      return isWithinFilterRange && isSelected
    })

    return filteredEvents
  }

  getDateRange = (numberOfMonths) => {
    return {
      filterStartDate: moment(new Date()).subtract(numberOfMonths, 'months'),
      filterEndDate: moment(new Date()),
    }
  }

  selectFilterRange = (numberOfMonths, filterRange) => {
    const { filterStartDate, filterEndDate } = this.getDateRange(numberOfMonths)
    this.setState({ 
      filterStartDate, 
      filterEndDate,
      filterRange,
     })
  }

  setFilterRange = ({startDate, endDate}) => {
    this.setState({
      filterStartDate: moment(startDate),
      filterEndDate: moment(endDate)
    })
  }

  getTransactionEvent = (event, index) => {
    const { events } = this.props;
    return getTransaction(event.TxHash)
      .then(transaction => {
        const previousEvent = events[index + 1] || this.initialEvent
        event.transaction = transaction
        event.previousEvent = previousEvent
        
        return event
      })
  }

  getEventTransactions = async () => {
    const { events } = this.props

    await Promise.all(events.map((event, index) => this.getTransactionEvent(event, index)))
      .then(results => {
        this.setState({ events: results })
      }) 
  }

  toggleFilter = (type) => {
    const {typeFilters} = this.state
    let newTypeFilters = typeFilters;
    if (!typeFilters.includes(type)) {
      newTypeFilters = [...typeFilters, type]
    }
    else {
      newTypeFilters = [...typeFilters].filter(filter => filter !== type)
    }

    this.setState({
      typeFilters: newTypeFilters
    })
  }

  initialEvent = {
    Balance: 0
  }
}

export default AccountTimeline