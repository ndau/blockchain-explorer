import React, { Component } from 'react'
import Main from '../main'

class Details extends Component {
  render() {
    const { browserHistory, nav, notFound } = this.props
    return (
      <Main 
        nav={nav} 
        browserHistory={browserHistory}
        notFound={notFound}
      >
        {this.props.children}
      </Main>
    );
  }
}

export default Details