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
import { Box } from 'grommet'
import Container from '../../atoms/container'
import Logo from '../../atoms/logo'
import BlockchainSearch from '../../molecules/blockchainSearch'
import BookmarkMenu from '../../molecules/bookmarkMenu'
import { NAVBAR_COLOR } from '../../../constants'
import './style.css'

class Navbar extends Component {
  background = this.props.background || NAVBAR_COLOR;
  
  render() {
    return (
      <div className="Navbar">
        <Box fill background={this.background} elevation="medium">
          <Container topPad="0">
            <Box margin={{vertical: "10px"}}>
              <Box height="100%" direction="row" align="center" justify="between">
              {/* <BlockchainSearch /> */}
                
                <Box margin={{left: "medium"}}>
                <Logo />                  
                </Box>

                <Box>
                  <BookmarkMenu />
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </div>
    )
  }
}

export default Navbar
