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
            ndau Explorer &copy; 2019 Oneiro, Inc.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer;