import React, { Component } from 'react'
import { Box } from 'grommet'
import Container from '../../atoms/container'
import Navbar from '../../organisms/navbar' 
import './style.css'

class Dashboard extends Component {
  render() {
    const { top, bottom, browserHistory, selectNode } = this.props;
    return(
      <Box as="main">
        <Navbar
          browserHistory={browserHistory}
          selectNode={selectNode}
        />
        <Container>
          <Box pad={{vertical: "large"}}>
            <Box margin={{bottom: "xlarge"}} className="chartArea">
              {top}
            </Box>
            <Box>
              {bottom}
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Dashboard