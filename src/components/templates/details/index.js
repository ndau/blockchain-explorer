import React, { Component } from 'react'
import Main from '../main'

class Details extends Component {
  render() {
    const { browserHistory, nav } = this.props
    return (
      <Main history nav={nav} browserHistory={browserHistory}>
        {this.props.children}
      </Main>
    );
  }
}

export default Details