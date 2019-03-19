import React, { Component } from 'react'
import { Box } from 'grommet'
import Container from '../../atoms/container'
import Navbar from '../../organisms/navbar'
import Footer from '../../atoms/footer'

class Page extends Component {
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

        <Box 
          justify="between" 
          direction="column"
          pad={{vertical: "large"}}
          style={{minHeight: "100vh"}
        }>
          <Container>
            <Box>
              {children}
            </Box>
          </Container>

          <Footer />
        </Box>
      </Box>
    );
  }
}

export default Page;