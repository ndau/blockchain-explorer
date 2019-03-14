import React, { Component, createRef } from 'react'
import { Grid, Box, Image, Anchor, Text, Drop } from 'grommet'
import { Menu } from 'grommet-icons';
import qs from 'query-string';
import SuggestionsInput from '../../molecules/suggestionsInput'
import Container from '../../atoms/container'
import logoFile from '../../../img/ndau_orange_logo.png'
import { NAVBAR_COLOR } from '../../../constants'
import { makeURLQuery } from '../../../helpers'
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
          <Menu size="35px" color="#fff"></Menu>
        </Box>

        {
          this.state.open && this.targetRef.current && (
          <Drop
            align={{ top: "bottom", left: "left" }}
            target={this.targetRef.current}
            elevation="none"
            animation="slideDown"
            stretch
            onEsc={this.toggleOpen}
            // onClickOutside={this.toggleOpen}
            className="menuDrop"
          >
            <Box
              pad="medium"
              width="xxlarge"
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

const VERTICAL_PAD = "10px"

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.background = props.background || NAVBAR_COLOR;

    const query = qs.parse(window.location.search);
    this.state = {
      nodeEndpoint: query.node
    }
  }
  
  render() {
    const { left, selectNode } = this.props;
    const { nodeEndpoint } = this.state;
  
    return (
      <div className="Navbar">
        <Box fill background={this.background}>
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
              <Box gridArea="center" align="center" pad={{ vertical: VERTICAL_PAD}}>
                <Anchor href={`/${makeURLQuery()}`}>
                  <Box height="45px" width="90px" pad={{vertical: "0"}}>
                    <Image src={logoFile} fit="contain" height="100%"/>
                  </Box>
                </Anchor>
              </Box>

              {
                left && 
                <Box gridArea="left">
                  {left}
                </Box>
              }
              
              <Box gridArea="right" className="mobileNavbarActions">
                <Box align="end" className="navbarAction">
                  <NavbarMenu verticalPad={VERTICAL_PAD}>
                    {
                      selectNode ? (
                        <SuggestionsInput
                          onValueChange={this.onNodeEndpointChange}
                          value={nodeEndpoint}
                          suggestions={[
                            'https://node-0.main.ndau.tech',
                            'https://testnet-0.api.ndau.tech',
                            'https://devnet-0.api.ndau.tech',
                            'https://devnet-1.api.ndau.tech',
                          ]}
                        />
                      ) : (
                        <Box align="end" pad={{vertical: "small"}}>
                          <Text size="small" alignSelf="end" color="#aaa">
                            node: {nodeEndpoint}
                          </Text>
                        </Box>
                      )
                    }
                  </NavbarMenu>
                </Box>
              </Box>
          
              <Box gridArea="right" className="navbarActions">
                <Box className="navbarAction" pad={{ vertical: VERTICAL_PAD}} align="end">
                  {
                    selectNode ? (
                      <SuggestionsInput
                        onValueChange={this.onNodeEndpointChange}
                        value={nodeEndpoint}
                        suggestions={[
                          'https://node-0.main.ndau.tech',
                          'https://testnet-0.api.ndau.tech',
                          'https://devnet-0.api.ndau.tech',
                          'https://devnet-1.api.ndau.tech',
                        ]}
                      />
                    ) : (
                      <Box align="end" pad={{vertical: "small"}}>
                        <Text size="small" alignSelf="end" color="#aaa">
                          node: {nodeEndpoint}
                        </Text>
                      </Box>
                    )
                  }
                </Box>
              </Box>
            </Grid>
          </Container>
        </Box>
      </div>
    )
  }

  onNodeEndpointChange = ( nodeEndpoint ) => {
    const { browserHistory } = this.props;
    if ( browserHistory ) {
      browserHistory.push({
        path: `${window.location.origin}${window.location.pathname}`,
        search: `?node=${window.encodeURIComponent(nodeEndpoint)}`
      })

      this.setState({ nodeEndpoint })
    }
  }
}

export default Navbar