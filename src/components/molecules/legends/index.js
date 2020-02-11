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
import { Box } from "grommet"
import Lengend from '../../atoms/legend'

class Legends extends Component {
  render() {
    const { info } = this.props;

    if (!info) {
      return null;
    }

    return (
      <Box>
      {
        info.map((legendInfo, index) => (
          <Box key={index}>
            <Lengend {...legendInfo} />
          </Box>
        ))
      }
      </Box>
    );
  }
}

export default Legends;
