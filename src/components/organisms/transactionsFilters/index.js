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

class TransactionFilter extends Component {
  constructor(props) {
    super(props)
     
    this.state = {
      typeFilters: DEFAULT_TYPE_FILTERS,
      showFilters: false,
    }
  }
  
  render() {
    const { transactions } = this.props;
    if(!transactions) {
      return null
    }
    
    const { 
      typeFilters,
      filterStartDate,
      filterEndDate,
      filterRange,
      showFilters,
     } = this.state
    
    const transanctionTypes = Object.values(TRANSACTION_TYPES)
    
    return (
      <Box>
        <Box onClick={this.toggleShowFilter} alignSelf="end">
          <Text 
            size="xsmall"
            style={{fontStyle: "italic", color: "rgba(255,255,255, 0.7)"}}
          >
            {`Showing transactions of the ${typeFilters.length} / ${transanctionTypes.length} selected types.`}
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
              <Filter 
                size="small" color="rgba(255,255,255, 0.8)" 
                style={{paddingLeft: "2px"}}
              />
            </Text>
          </Text>
        </Box>
        
        <Collapsible open={showFilters}>
          {/* <Filters 
            showFilters={showFilters}
            typeFilters={typeFilters} 
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            filterRange={filterRange}
            selectFilterRange={this.selectFilterRange}
            setFilterRange={this.setFilterRange}
            toggleFilter={this.toggleFilter}
            noDateFilter={true}
          /> */}
        </Collapsible>
      </Box>
    );
  }

  // componentDidUpdate = (prevProps) => {
  //   //
  //  
  //   //
  //   if(!prevProps.state) {
  //     return
  //   }
  //   if(JSON.stringify(this.state) !== JSON.stringify(prevProps.state)) {
  //     this.props.filterTransactions(this.state)
  //   }
  // }

  

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
    }, ()=> this.props.updateFilters(this.state.typeFilters))
  }

  toggleShowFilter = () => {
    this.setState(({showFilters}) => ({ showFilters: !showFilters }))
  }
}

export default TransactionFilter
