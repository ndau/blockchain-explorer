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
import { Calendar } from "grommet"

class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    const { startDate, endDate } = this.props
    this.state = {
      date: new Date().toISOString(), 
      dates: null,
      open: null, 
      startDate,
      endDate
    }
  }

  render() {
    const { date, dates, startDate, endDate } = this.state
    const range = startDate && endDate ? [[startDate.toISOString(), endDate.toISOString()]] : dates
    // console.log(startDate.toISOString(), endDate.toISOString())

    return (
      <Calendar
        range
        date={date}   
        dates={range}
        onSelect={this.onSelect} 
        lstyle={{lbackground: "#fafafa", border: "1px solid #aaa"}}
        size="small"
        bounds={["2019-01-01", new Date().toISOString()]}
      />
    )
  }

  componentDidUpdate(prevProps) {
    const { startDate, endDate } = this.props
    if (startDate !== prevProps.startDate || endDate !== prevProps.endDate) {
      this.setState({
        startDate, endDate
      })
    }
  }

  onSelect = arg => {
    if (Array.isArray(arg)) {
      this.setState({ 
        dates: arg, date: null 
      }, () => {
        this.props.onSetRange({
          startDate: arg[0][0],
          endDate: arg[0][1],
        })
      })
    } else {
      this.setState({ 
        dates: null, date: arg 
      }, () => {
        this.props.onSetRange({
          startDate: arg,
          endDate: arg,
        })
      })
    }
  }; 
}

export default DateRangePicker;
        
