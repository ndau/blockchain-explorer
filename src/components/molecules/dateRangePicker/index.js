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
    const { date, dates } = this.state

    return (
      <Calendar
        range
        date={date} 
        dates={dates}
        onSelect={this.onSelect} 
        lstyle={{lbackground: "#fafafa", border: "1px solid #aaa"}}
        size="small"
        bounds={["2019-01-01", new Date().toISOString()]}
      />
    )
  }

  componentDidUpdate(prevProps) {
    const { startDate, endDate } = this.props
    console.log('range picker updated')
    if (startDate !== prevProps.startDate || endDate !== prevProps.endDate) {
      console.log('state updated')
      this.setState({
        startDate, endDate
      })
    }
  }

  onSelect = arg => {
    if (Array.isArray(arg)) {
      console.log(arg)
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
        