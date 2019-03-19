import React, { Component } from 'react'
import Main from '../main'

class Details extends Component {
  render() {
    return (
      <Main>
        {this.props.children}
      </Main>
    );
  }
}

export default Details