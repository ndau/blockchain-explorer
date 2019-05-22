import React, { Component } from 'react'
import { Box } from 'grommet'
import Page from '../page'
import './style.css'

class Dashboard extends Component {
  render() {
    const { children, browserHistory } = this.props;
    return(
      <Page browserHistory={browserHistory}>
        <Box>
          {children}
        </Box>
      </Page>
    );
  }
}

export default Dashboard