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
import { Box, ResponsiveContext } from 'grommet'
import Anchor from '../../atoms/anchor'
import logoFile from '../../../img/ndau_orange_logo.png'

class Logo extends Component {
  render() {
    return (
      <ResponsiveContext.Consumer>
        {screenSize => (
          <Anchor href="/">
            <Box 
              height={screenSize === "small" ? "30px" : "35px"}
            >
              <img src={logoFile} style={{height: "100%"}} alt="ndau-logo" />
            </Box>
          </Anchor>
        )}
      </ResponsiveContext.Consumer> 
    )
  }
}

export default Logo
