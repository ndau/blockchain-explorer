import React, { Component, createRef } from 'react'
import { Box, Drop } from 'grommet'
import { Menu } from 'grommet-icons';
import './style.css'

class NavbarMenu extends Component {
  state = { open: false }
  targetRef = createRef();
  
  render() {
    return (
      <Box fill align="end">
        <Box
          ref={this.targetRef}
          onClick={this.toggleOpen}
          pad={{vertical: "15px"}}
        >
          <Menu size="30px" color="#fff" pad="0" justify="center"></Menu>
        </Box>

        {
          this.state.open && this.targetRef.current && (
          <Drop
            align={{ top: "bottom", left: "left" }}
            target={this.targetRef.current}
            animation="slideDown"
            stretch
            onEsc={this.toggleOpen}
            className="menuDrop"
            elevation="medium"
          >
            <Box
              pad="small"
              width="100vw"
              background="#293e63"
              align="center"
            >
              {this.props.children}
            </Box>
          </Drop>
        )}
      </Box>
    )
  }

  toggleOpen = () => {
    this.setState(({open}) => {
      return { open: !open }
    })
  }

  componentDidMount() {
    this.forceUpdate();
  }
}

export default NavbarMenu;