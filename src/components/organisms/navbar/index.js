import React, { Component } from 'react'
import { Grid, Box, Image } from 'grommet'
import logoFile from '../../../img/ndau-icon-green.png'

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.background = props.background || "rgba(51,51,51,0.8)";
  }
  
  render() {
    return(
      <Box margin={{ bottom: "20px"}} background={this.background}>
        <Grid
          columns={["flex"]}
          rows={["auto"]}
          areas={[
            { name: "brand", start: [0, 0], end: [0, 0] },
          ]}
          as="header"
        > 
          <Box gridArea="brand" pad={{ vertical: "10px" }} align="center">
            <Box height="50px" width="40px">
              <Image src={logoFile} fit="contain" />
            </Box>
          </Box>
        </Grid>
      </Box>
    )
  }
}

export default Navbar