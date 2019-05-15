import React, { Component } from 'react'
import { Box, Image, ResponsiveContext } from 'grommet'
import Anchor from '../../atoms/anchor'
import logoFile from '../../../img/ndau_orange_logo.png'

class Logo extends Component {
  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Anchor href="/">
            <Box height="40px" width={size === "small" ? "65px" : "75px"}>
              <Image src={logoFile} fit="contain" height="100%"/>
            </Box>
          </Anchor>
        )}
      </ResponsiveContext.Consumer> 
    )
  }
}

export default Logo