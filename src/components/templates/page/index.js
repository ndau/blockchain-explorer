import React, { Component } from 'react'
import { Box, Text } from 'grommet'
import Container from '../../atoms/container'
import Navbar from '../../organisms/navbar'
import Footer from '../../atoms/footer'
import Anchor from '../../atoms/anchor'

class Page extends Component {
  render() {
    const { children, browserHistory, notFound } = this.props;
  
    return(
      <Box as="main">
        <Box gridArea="header">
          <Navbar
            browserHistory={browserHistory}
          />
        </Box>

        
        <Box 
          justify="between" 
          direction="column"
          pad={{vertical: "large"}}
          style={{minHeight: "100vh"}}
        >
          {
            notFound ? (
              <Box animation="fadeIn">
                <Container >
                  <Box justify="center" height="100%">
                    <Text alignSelf="center" weight="bold" size="large">
                      Oops! Nothing was found. Please try again or go back to the{" "}
                      <Anchor label="homepage" href="/" />
                    </Text>
                    </Box>
                </Container>
              </Box>
            ) : (
              <Container>
                <Box>
                  {children}
                </Box>
              </Container>
            )
          }
          <Footer />
        </Box>
      </Box>
    );
  }
}

export default Page;