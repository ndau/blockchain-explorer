/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React from 'react';
import { Box } from 'grommet';

function Container(props) {
  return(
    <Box 
      style={{
        width: "92%",
        maxWidth: "950px", 
        margin: "0 auto",
        paddingTop: props.topPad || "65px"
      }}
    >
      {props.children}
    </Box>
  )
}

export default Container;
