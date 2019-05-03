import React, { Component } from 'react'
import { Grid, Box, Image, Text } from 'grommet'
import qs from 'query-string';
import Anchor from '../../atoms/anchor'
import SuggestionsInput from '../../molecules/suggestionsInput'
import Container from '../../atoms/container'
import NavbarMenu from '../../molecules/navbarMenu'
import { 
  NAVBAR_COLOR, 
  MAIN_NODE_ENDPOINT, 
  TESTNET_NODE_ENDPOINT, 
  DEVNET_NODE_ENDPOINT 
} from '../../../constants'
import logoFile from '../../../img/ndau_orange_logo.png'
import './style.css'

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
              <Box gridArea="center" align="center" pad={{ vertical: VERTICAL_PAD}}>
                <Anchor href="/">
                  <Box height="40px" width="80px" pad={{vertical: "0"}}>
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
              
              <Box gridArea="right">
                <Box className="mobileNavbarActions">
                  <Box align="end" className="navbarAction">
                    <NavbarMenu verticalPad={VERTICAL_PAD}>
                      {
                        selectNode ? (
                          <SuggestionsInput
                            onValueChange={this.onNodeEndpointChange}
                            value={nodeEndpoint}
                            suggestions={[
                              MAIN_NODE_ENDPOINT,
                              DEVNET_NODE_ENDPOINT,
                              TESTNET_NODE_ENDPOINT,
                              
                              // {
                              //   label:"Mainnet",
                              //   value: MAIN_NODE_ENDPOINT
                              // },

                              // {
                              //   label:"Testnet",
                              //   value: "testnet node"//TESTNET_NODE_ENDPOINT
                              // },
                              // {
                              //   label:"Devnet",
                              //   value: DEVNET_NODE_ENDPOINT
                              // },
                            ]}
                          />
                        ) : (
                          <Box align="end" pad={{vertical: "small"}}>
                            <Text size="small" alignSelf="end" color="#aaa">
                              node endpoint: {nodeEndpoint}
                            </Text>
                          </Box>
                        )
                      }
                    </NavbarMenu>
                  </Box>
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