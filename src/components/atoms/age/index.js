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
import moment from 'moment';

const AGE_UPDATE_INTERVAL = 10000

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
      age: this.age(),
    }

    this.ageUpdateInterval = window.setInterval(this.updateAge, AGE_UPDATE_INTERVAL)
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
      const newAge = this.age();
      if(newAge !== age) {
        return { age: newAge }
      }
    })
  }

  age = () => {
    const { timestamp, recent } = this.props;
    let age = moment(timestamp).fromNow();

    if(age === "1 sec") {
      age = recent || age
    }

    age = age.toUpperCase();

    return age
  }

  componentDidUpdate() {
    this.updateAge()

    if(this.ageUpdateInterval) {
      window.clearInterval(this.ageUpdateInterval)
    }
    this.ageUpdateInterval = window.setInterval(this.updateAge, AGE_UPDATE_INTERVAL)
  }
}

export default Age;
