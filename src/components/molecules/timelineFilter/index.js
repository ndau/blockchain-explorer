import React, { Component } from 'react'
import { Box, Text, Collapsible, ResponsiveContext } from 'grommet'
import { StatusGood, Radial, Filter } from 'grommet-icons'
import DateRangePicker from '../../molecules/dateRangePicker'
import { TRANSACTION_TYPES } from '../../../constants'
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
        label: "Last month", 
        onClick: () => selectFilterRange(1, "Last month")
      },
      {
        label: "Last 3 months", 
        onClick: () => selectFilterRange(3, "Last 3 months")
      },
      {
        label: "Last 6 months", 
        onClick: () => selectFilterRange(6, "Last 6 months")
      },
      {
        label: "Last year", 
        onClick: () => selectFilterRange(12, "Last year")
      },
    ]

    return (
      <ResponsiveContext.Provider>
        <Box>
          <Box onClick={this.toggleShowFilter} margin={{bottom: "medium"}} alignSelf="center">
            <Text 
              size="xsmall"
              style={{fontStyle: "italic", color: "rgba(255,255,255, 0.7)"}}
            >
              {`Showing ${filteredEventsCount || ''} transactions between 
              ${formatTime(filterStartDate)} and ${formatTime(filterEndDate)}
              of the ${typeFilters.length} / ${transanctionTypes.length} selected types.`}
              
              <Text 
                size="xsmall"
                color="rgba(255,255,255, 0.7)"
                style={{
                  marginLeft: "5px", 
                  lineHeight: "10px",
                  fontStyle: "normal", 
                  fontWeight: "bold",
                  borderBottom: "0.5px dashed #ffe7c6"
                }}
                bold
              >
                {showFilters ? "Hide" : "Show"} filter options
                <Filter size="small" color="rgba(255,255,255, 0.8)" style={{paddingLeft: "2px"}}/>
              </Text>
            </Text>
          </Box>
          
          <Collapsible open={showFilters}>
            <Box 
              style={{
                background: "rgba(255,255,255, 0.03)",
                visibility: showFilters ? "visible":"hidden",
                transition: "visibilty 0.1s",
              }} 
              align="center"
              width="100%"
              margin={{bottom: "medium"}}
              pad={{vertical: "medium"}}
              round="small"
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
                          <Text style={{lineHeight: "18px", justifySelf: "center"}} >
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
      </ResponsiveContext.Provider>
    );
  }

  toggleShowFilter = () => {
    this.setState(({showFilters}) => ({ showFilters: !showFilters }))
  }
}

export default TimelineFilter