import React, { Component } from 'react'
import moment from 'moment';

moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s:  '<1m',
    ss: '%ss',
    m:  '1m',
    mm: '%dm',
    h:  '1h',
    hh: '%dh',
    d:  '1d',
    dd: '%dd',
    M:  '1month',
    MM: '%dmonths',
    y:  '1yr',
    yy: '%dyrs'
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