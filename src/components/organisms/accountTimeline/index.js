import React, { Component } from 'react'
import { Box,Text, Menu } from 'grommet'
import { StatusGood, Radial } from 'grommet-icons'
import TimelineEvent from '../../molecules/timelineEvent'
import TimelineChart from '../../molecules/timelineChart'
import { TRANSACTION_TYPES } from '../../../constants'
import { getTransaction  } from '../../../helpers/fetch'

const DEFAULT_FILTERS = [
  "Transfer",
	"Change Validation",
  "Change Recourse Period",
  "Delegate",
	"Lock",
	"Notify",
	"SetRewards Destination",
	"Set Validation",
]

class AccountTimeline extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      filters: DEFAULT_FILTERS,
      filteredEvents: []
    }

  }
  
  render() {
    const { events, balance } = this.props;
    if(!events) {
      return null
    }
    
    const { filters, filteredEvents = [] } = this.state
    // console.log('filteredEvents', filteredEvents)
    const transanctionTypes = Object.values(TRANSACTION_TYPES)

    // let selectedTypes, unselectedTypes;


    const unselectedTypes = transanctionTypes.filter(filter => !filters.includes(filter))
    const sortedTransanctionTypes = [...filters, ...unselectedTypes]
    // const filteredEvents = this.filterEvents()
    

    const filterItems = sortedTransanctionTypes.map(type => {
      const activeFilter = filters.includes(type)
      return {
        label: <Text size="small" margin={{left: "small"}}>{type && type.replace(/([a-z])([A-Z])/g, '$1 $2')}</Text>,
        icon:  activeFilter ? <StatusGood lcolor="lime"/> : <Radial color="#ccc" />,
        onClick: () => this.toggleFilter(type),
      }
    })

    const borderStyle = "1px dashed rgba(255,255,255,0.1)"

    return (
      <Box>
        <Box align="center">
          <Menu 
            // open={true}
            size="small"
            
            label={`filter by transaction type (${filters.length}/${transanctionTypes.length})`}
            color="#bbb"
            items={filterItems}
            dropProps={{
              style: {height: "200px", outline: "none"},
              height: "small",
              size: "small"
            }}
            style={{
              outline: "none",
              padding: 0
            }}
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

  componentDidUpdate(prevProps) {
    if(!prevProps.events && this.props.events) {
      this.filterEvents(DEFAULT_FILTERS)
    }
  }

  filterEvents = (filters) => {
    const { events } = this.props
    if (!events) {
      return []
    }
    
    Promise.all(events.map(event => this.getTransactionEvent(event)))
      .then(results => {
        // console.log('results', results)
        const filteredEvents = results.filter((event) => {
          const transactionType = event.transaction && event.transaction.type
          // console.log(transactionType)
          return transactionType && filters.includes(transactionType)
        })

        this.setState({
          filters,
          filteredEvents
        })
      }) 
  }


  getTransactionEvent = (event) => {
    return getTransaction(event.TxHash)
      .then(transaction => {
        event.transaction = transaction
        return event
      })
  }

  toggleFilter = (typeName) => { 
    const type = typeName && typeName.replace(/([a-z])([A-Z])/g, '$1 $2')
    const {filters} = this.state
    let newFilters = filters;
    if (!filters.includes(type)) {
      newFilters = [...filters, type]
    }
    else {
      newFilters = [...filters].filter(filter => filter !== type)
    }
    this.filterEvents(newFilters)
  }

  setActiveBlock = (activeBlock) => {
    this.setState({ activeBlock })
  }

  initialEvent = {
    Balance: 0
  }
}

export default AccountTimeline;