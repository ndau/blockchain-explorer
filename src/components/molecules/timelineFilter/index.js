import React, { Component } from 'react'
import { Box, Text, Collapsible } from 'grommet'
import { StatusGood, Radial, Filter } from 'grommet-icons'
import moment from 'moment'
import DateRangePicker from '../../molecules/dateRangePicker'
import { TRANSACTION_TYPES } from '../../../constants'
import { getTransaction } from '../../../helpers/fetch'
import { formatTime } from '../../../helpers/format'

class TimelineFilter extends Component {
  state = {
    showFilters: false
  }

  render() {
    if(!this.props.events) {
      return null
    }
    
    const { showFilters } = this.state
    const { 
      typeFilters, 
      filterStartDate,
      filterEndDate,
      filterRange,
      filteredEventsCount,
      selectFilterRange,
      setFilterRange,
      toggleFilter
     } = this.props

    const transanctionTypes = Object.values(TRANSACTION_TYPES)
    const unselectedTypes = transanctionTypes.filter(filter => !typeFilters.includes(filter))
    const sortedTransanctionTypes = [...typeFilters, ...unselectedTypes]

    const daterangeFilters = [
      {
        label: "last month", 
        onClick: () => selectFilterRange(1, "last month")
      },
      {
        label: "last 3 months", 
        onClick: () => selectFilterRange(3, "last 3 months")
      },
      {
        label: "last 6 months", 
        onClick: () => selectFilterRange(6, "last 6 months")
      },
      {
        label: "last year", 
        onClick: () => selectFilterRange(12, "last year")
      },
    ]

    return (
      <Box>
        <Box onClick={this.toggleShowFilter} margin={{bottom: "small"}}>
          <Text size="xsmall" color="#bbb">
            {`Showing ${filteredEventsCount || ''} transactions from 
            ${formatTime(filterStartDate)} to ${formatTime(filterEndDate)},
            of ${typeFilters.length} / ${transanctionTypes.length} types.`}
            
            <Filter size="small" color="#ffe7c6" style={{paddingLeft: "5px"}}/>
          </Text>
        </Box>

        <Collapsible open={showFilters}>
          <Box 
            style={{
              background: "rgba(255,255,255, 0.05)",
              visibility: showFilters ? "visible":"hidden",
              transition: "visibilty 0.1s",
            }} 
            align="center"
            width="100%"
            margin={{bottom: "small"}}
            pad={{vertical: "small"}}
          >
            <Box>
              <Box 
                width="100%" 
                style={{borderBottom: "1px solid rgba(255,255,255, 0.3)"}}
              >
                <Text size="xsmall" alignSelf="end" color="rgba(255,255,255, 0.5)">
                  filter by date
                </Text>
              </Box>

              <Box pad={{bottom: "medium"}}>
                <DateRangePicker 
                  startDate={filterStartDate}
                  endDate={filterEndDate}
                  onSetRange={setFilterRange} 
                />
              </Box>

              <Box>
                {
                  daterangeFilters.map(({label, onClick}, index) => {
                    const IsSelected = filterRange === label

                    return (
                      <Box key={index} onClick={onClick} direction="row" justify="between">
                        <Text>
                          {
                            IsSelected ? 
                            <StatusGood size="18px"/> : 
                            <Radial color="#ccc" size="18px"/>
                          }
                          <Text size="small" margin={{left: "xsmall"}}>
                            {label}
                          </Text>
                        </Text>
                        
                      </Box>
                    )
                  })
                }

                <Box margin={{bottom:"15px"}}>
                  <Box 
                    width="100%" 
                    style={{borderBottom: "1px solid rgba(255,255,255, 0.3)"}}
                  >
                    <Text size="xsmall" alignSelf="end" color="rgba(255,255,255, 0.5)">
                      filter by type
                    </Text>
                  </Box>
                </Box>
              
                {
                  sortedTransanctionTypes.map((type, index) => {
                    const IsSelected = typeFilters.includes(type)

                    return (
                      <Box key={index} onClick={() => toggleFilter(type)} >
                        <Text>
                          {
                            IsSelected ? <StatusGood size="18px"/> : <Radial color="#ccc" size="18px"/>
                          }
                          <Text size="small" margin={{left: "xsmall"}}>
                            {type && type.replace(/([a-z])([A-Z])/g, '$1 $2')}
                          </Text>
                        </Text>
                        
                      </Box>
                    )
                  })
                }  
              </Box>
            </Box>
          </Box>
        </Collapsible>
      </Box>
    );
  }

  getDateRange = (numberOfMonths) => {
    return {
      filterStartDate: moment(new Date()).subtract(numberOfMonths, 'months'),
      filterEndDate: moment(new Date()),
    }
  }

  selectFilterRange = (numberOfMonths, filterRange) => {
    const { filterStartDate, filterEndDate } =  this.getDateRange(numberOfMonths)
    this.setState({ 
      filterStartDate, 
      filterEndDate,
      filterRange,
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

  toggleShowFilter = () => {

    this.setState(({showFilters}) => ({ showFilters: !showFilters }))
  }
}

export default TimelineFilter