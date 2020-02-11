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
import Main from '../main'

class Details extends Component {
  render() {
    const { browserHistory, nav, notFound } = this.props
    return (
      <Main 
        nav={nav} 
        browserHistory={browserHistory}
        notFound={notFound}
      >
        {this.props.children}
      </Main>
    );
  }
}

export default Details
