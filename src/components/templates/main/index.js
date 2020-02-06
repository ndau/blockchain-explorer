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
import Page from '../page'

class Main extends Component {
  render() {
    const { children, nav, browserHistory, notFound } = this.props;
  
    return(
      <Page browserHistory={browserHistory} notFound={notFound}>
        {
          nav &&
          <Box pad={{horizontal: "medium"}} margin={{bottom: "small"}}>
            {nav}
          </Box>
        }

        <Box
          elevation="medium"
          background="#0f2748" 
          pad="medium" 
          round="xsmall" 
          animation="fadeIn" 
        >
          {children}
        </Box>
      </Page>
    );
  }
}

export default Main
