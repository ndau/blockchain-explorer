import React, { Component } from 'react'
import { Box } from 'grommet'
import Container from '../../atoms/container'
import Logo from '../../atoms/logo'
import BlockchainSearch from '../../molecules/blockchainSearch'
import BookmarkMenu from '../../molecules/bookmarkMenu'
import { NAVBAR_COLOR } from '../../../constants'
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
                  <BlockchainSearch />
                </Box>

                <Box>
                  <BookmarkMenu />
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