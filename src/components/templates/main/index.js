import React, { Component } from 'react'
import { Box } from 'grommet'
import Container from '../../atoms/container'
import Navbar from '../../organisms/navbar'

class Main extends Component {
  render() {
    const { children, browserHistory, selectNode } = this.props;
  
    return(
      <Box as="main">
        <Box gridArea="header">
          <Navbar
            browserHistory={browserHistory}
            selectNode={selectNode}
          />
        </Box>
        <Container>
          <Box pad={{ vertical: "large" }}>
            <Box background="#0f2748" pad="medium" round="xsmall" animation="fadeIn" style={{paddingTop: 0}}>
              {children}
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Main