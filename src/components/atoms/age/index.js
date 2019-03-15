import React, { Component } from 'react'
import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s:  'secs',
    ss: '%s secs',
    m:  '1 min',
    mm: '%d mins',
    h:  '1 hr',
    hh: '%d hrs',
    d:  '1 day',
    dd: '%d days',
    M:  '1 month',
    MM: '%d months',
    y:  '1 yr',
    yy: '%d yrs'
  }
});

class Age extends Component {
  constructor(props) {
    super(props)
    this.state= {
      age: this.getAge(),
    }
  }
  

  render() {
    return (
      <span>{this.state.age}</span>
    );
  }

  componentDidMount() {
    this.ageUpdateInterval = setInterval(()=> {
      this.setState(({age}) => {
        const newAge = this.getAge();
        if(newAge !== age) {
          return {
            age: newAge
          }
        }
      })
    }, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.ageUpdateInterval)
  }

  getAge = () => {
    let age = moment(this.props.timestamp).fromNow();
    return age;
  }
}

export default Age;