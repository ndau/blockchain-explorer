import React, { Component } from 'react'
import { Box } from 'grommet'
import Container from '../../atoms/container'
import Navbar from '../../organisms/navbar'

class Details extends Component {
  render() {
    return (
      <Box>
        <Box>
          <Navbar selectNode={this.props.selectNode} />
        </Box>
    
        <Container>
          <Box pad={{ vertical: "large" }}>
            <Box background="#0f2748" pad="large" round="xsmall" animation="fadeIn" style={{paddingTop: 0}}>
              {this.props.children}
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Details