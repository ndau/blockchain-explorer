import React, { Component } from 'react'
import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s:  '1 sec',
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

    this.ageUpdateInterval = window.setInterval(this.updateAge, 30000)
  }

  render() {
    const { age } = this.state
    const {suffix, recent} = this.props
    return (
      <span>{age} {age !== recent && suffix}</span>
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.ageUpdateInterval)
  }

  updateAge = () => {
    this.setState(({age}) => {
      const newAge = this.getAge();
      if(newAge !== age) {
        return { age: newAge }
      }
    })
  }

  getAge = () => {
    const { timestamp, recent } = this.props;
    let age = moment(timestamp).fromNow();

    if(age === "1 sec") {
      age = recent || age
    }

    return age
  }

  componentDidUpdate() {
    window.clearInterval(this.ageUpdateInterval)
    this.ageUpdateInterval = window.setInterval(this.updateAge, 30000)
  }
}

export default Age;