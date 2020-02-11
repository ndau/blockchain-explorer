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
import './style.css'

class Dashboard extends Component {
  render() {
    const { children, browserHistory } = this.props;
    return(
      <Page browserHistory={browserHistory}>
        <Box>
          {children}
        </Box>
      </Page>
    );
  }
}

export default Dashboard
