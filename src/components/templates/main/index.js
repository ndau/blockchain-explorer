import React, { Component } from 'react'
import { Box } from 'grommet'
import Page from '../page'

class Main extends Component {
  render() {
    const { children, nav, browserHistory, selectNode } = this.props;
  
    return(
      <Page browserHistory={browserHistory} selectNode={selectNode}>
        <Box pad={{horizontal: "medium"}} margin={{bottom: "small"}}>
          {nav}
        </Box>

        <Box
          elevation="medium"
          background="#0f2748" 
          pad="medium" 
          round="xsmall" 
          animation="fadeIn" 
          style={{ paddingTop: 0 }}
        >
          {children}
        </Box>
      </Page>
    );
  }
}

export default Main