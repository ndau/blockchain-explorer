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
import { Box, Text } from 'grommet';
import Container from '../container';

function Footer() {
  return(
    <Box>
      <Container topPad="0">
        <Box pad={{top: "large"}}>
          <Text
            alignSelf="center" 
            color="rgba(255,255,255, 0.2)"
            size="small"
          >
            ndau explorer &copy; 2019 Oneiro NA, Inc.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer;
