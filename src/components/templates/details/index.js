import React, { Component } from 'react'
import Main from '../main'

class Details extends Component {
  render() {
    return (
      <Main nav={this.props.nav}>
        {this.props.children}
      </Main>
    );
  }
}

export default Details