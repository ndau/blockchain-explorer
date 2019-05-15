import React, { Component } from 'react'
import { Box, Image } from 'grommet'
import Anchor from '../../atoms/anchor'
import Container from '../../atoms/container'
import Logo from '../../atoms/logo'
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
              <Box margin={{vertical: "10px"}}>
                <Box height="100%" direction="row" align="center" justify="between">
                  <Logo />
                  
                  <Box margin={{left: "medium"}}>
                    <BlockchainSearch browserHistory={this.props.browserHistory} />
                  </Box>
                </Box>
              </Box>
          </Container>
        </Box>
      </div>
    )
  }
}

export default Navbar