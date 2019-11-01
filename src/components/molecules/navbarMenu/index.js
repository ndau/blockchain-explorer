import React, { Component, createRef } from 'react'
import { Box, Drop } from 'grommet'
import { Menu } from 'grommet-icons'
import Container from '../../atoms/container'
import './style.css'

class NavbarMenu extends Component {
  state = { open: false }
  targetRef = createRef();
  
  render() {
    const { icon } = this.props;

    return (
      <Box>
        <Box
          ref={this.targetRef}
          onClick={this.toggleOpen}
        >  
          {
            icon ? icon : (
              <Menu size="30px" color="#fff" pad="0" justify="center"/>
            )
          }
        </Box>

        {
          this.state.open && this.targetRef.current && (
          <Drop
            align={{ top: "bottom", left: "left" }}
            target={this.targetRef.current}
            animation="slideDown"
            stretch
            onEsc={this.toggleOpen}
            onClickOutside={this.toggleOpen}
            className="menuDrop"
            elevation="medium"
            margin={{top: 'medium'}}
          >  
            <Box
              pad={{vertical: 'medium'}}
              width="100vw"
              background="#fff"
              style={{borderRadius: "0 0 3px 3px"}}
            >  
              <Container topPad='0'>
                {this.props.children}
              </Container> 
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