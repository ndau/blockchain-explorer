import React, { Component } from 'react'
import { Grid, Box, Image } from 'grommet'
import Anchor from '../../atoms/anchor'
import Container from '../../atoms/container'
import BlockchainSearch from '../../molecules/blockchainSearch'
import { NAVBAR_COLOR } from '../../../constants'
import logoFile from '../../../img/ndau_orange_logo.png'
import './style.css'

class Navbar extends Component {
  background = this.props.background || NAVBAR_COLOR;
  
  render() {
    return (
      <div className="Navbar">
        <Box fill background={this.background} elevation="medium">
          <Container topPad="0">
            <Grid
              columns={["flex", "auto", "flex"]}
              rows={["auto"]}
              areas={[
                { name: "left", start: [0, 0], end: [0, 0] },
                { name: "center", start: [1, 0], end: [1, 0] },
                { name: "right", start: [2, 0], end: [2, 0] },
              ]}
              as="header"
            >

              <Box gridArea="center" margin={{vertical: "10px"}}>
                <Box height="100%" direction="row" align="center">
                  <Anchor href="/">
                    <Box height="35px" width="80px">
                      <Image src={logoFile} fit="contain" height="100%"/>
                    </Box>
                  </Anchor>
                  
                  <Box margin={{left: "20px"}}>
                    <BlockchainSearch browserHistory={this.props.browserHistory} />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Container>
        </Box>
      </div>
    )
  }
}

export default Navbar