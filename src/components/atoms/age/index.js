import React, { Component } from 'react'
import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s:  'just now',
    ss: '%s secs ago',
    m:  '1 min ago',
    mm: '%d mins ago',
    h:  '1 hr ago',
    hh: '%d hrs ago',
    d:  '1 day ago',
    dd: '%d days ago',
    M:  '1 month ago',
    MM: '%d months ago',
    y:  '1 yr ago',
    yy: '%d yrs ago'
  }
});

class Age extends Component {
  constructor(props) {
    super(props)
    this.state= {
      age: this.getAge(),
    }

    this.ageUpdateInterval = window.setInterval(()=> {
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
  

  render() {
    return (
      <span>{this.state.age}</span>
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.ageUpdateInterval)
  }

  getAge = () => {
    let age = moment(this.props.timestamp).fromNow();
    return age;
  }
}

export default Age;