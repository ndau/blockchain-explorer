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
          <Navbar browserHistory={browserHistory}
          />
        </Box>

        <Box
          className="Page"
          direction="column"
          pad={{vertical: "large"}}
          justify="between"
          style={{minHeight: "100vh"}}
        > 
          <Box>
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
          </Box>
  
          <Box>
            <Footer />
          </Box>
          
        </Box>
      </Box>
    );
  }
}

export default Page;