import React, { Component } from 'react'
import { Box, ResponsiveContext } from 'grommet'
import Anchor from '../../atoms/anchor'
import logoFile from '../../../img/ndau_orange_logo.png'

class Logo extends Component {
  render() {
    return (
      <ResponsiveContext.Consumer>
        {screenSize => (
          <Anchor href="/">
            <Box 
              height={screenSize === "small" ? "30px" : "35px"}
            >
              <img src={logoFile} style={{height: "100%"}} alt="ndau-logo" />
            </Box>
          </Anchor>
        )}
      </ResponsiveContext.Consumer> 
    )
  }
}

export default Logo