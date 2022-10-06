/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Box, Text } from 'grommet'
import Container from '../../atoms/container'
import Navbar from '../../organisms/navbar/Navbar';
import Footer from '../../atoms/footer'
import Anchor from '../../atoms/anchor'
import './style.css'

class Page extends Component {
  render() {
    const { children, browserHistory, notFound } = this.props
  
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

export default withRouter(Page)
