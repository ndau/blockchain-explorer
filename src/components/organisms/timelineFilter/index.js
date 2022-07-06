/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from 'react'
import { Box, Text, Collapsible } from 'grommet'
import { Filter } from 'grommet-icons'
import Filters from '../../molecules/filters'
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
      toggleFilter,
      selectedEvent,
      getAccountData
     } = this.props

    if (selectedEvent) {
      return (
        <Box>
          <Box onClick={this.toggleShowFilter} margin={{bottom: "medium"}} alignSelf="center">
            <Text 
              size="xsmall"
              style={{fontStyle: "italic", color: "rgba(255,255,255, 0.7)"}}
            >
              Showing selected transaction
            </Text>
          </Box>
          
        </Box>
      )
    }

    const transanctionTypes = Object.values(TRANSACTION_TYPES)

    return (
      <Box>
        <Box onClick={this.toggleShowFilter} margin={{bottom: "medium"}} alignSelf="center">
          <Text 
            size="xsmall"
            style={{fontStyle: "italic", color: "rgba(255,255,255, 0.7)"}}
          >
            {`${filteredEventsCount === 0 ? 'No transactions found ': `Showing ${filteredEventsCount || ''} transactions` } between 
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
          <Filters 
            showFilters={showFilters}
            typeFilters={typeFilters} 
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            filterRange={filterRange}
            selectFilterRange={selectFilterRange}
            setFilterRange={setFilterRange}
            toggleFilter={toggleFilter}
            getAccountData={getAccountData}
          />
        </Collapsible>
      </Box>
    );
  }

  toggleShowFilter = () => {
    this.setState(({showFilters}) => ({ showFilters: !showFilters }))
  }
}

export default TimelineFilter
