import React, { Component } from 'react'
import { Box } from 'grommet'
import Page from '../page'
import './style.css'

class Dashboard extends Component {
  render() {
    const { top, bottom, browserHistory, selectNode } = this.props;
    return(
      <Page browserHistory={browserHistory} selectNode={selectNode}>
        <Box>
          <Box margin={{bottom: "large"}} className="chartArea">
            {top}
          </Box>
          <Box>
            {bottom}
          </Box>
        </Box>
      </Page>
    );
  }
}

export default Dashboard