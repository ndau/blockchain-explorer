import React, { Component } from 'react'
import moment from 'moment';

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
    if(age === "a few seconds ago") {
      age = "seconds ago"
    }

    return age;
  }
}

export default Age;