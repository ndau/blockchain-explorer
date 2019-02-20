import React, { Component } from 'react'
import { Grid, Box, Image, Anchor, Text } from 'grommet'
import qs from 'query-string';
import SuggestionsInput from '../../molecules/suggestionsInput'
import logoFile from '../../../img/ndau_orange_logo.png'
import { NAVBAR_COLOR } from '../../../constants'
import { makeURLQuery } from '../../../helpers'

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
  
    return(
      <Box
        margin={{ bottom: "20px"}}
        pad={{ vertical: "10px", horizontal: "10px" }}
        background={this.background}
      >
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
          <Box gridArea="center" align="center">
            <Anchor href={`/${makeURLQuery()}`}>
              <Box height="50px" width="120px">
                <Image src={logoFile} fit="contain" />
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
                    'http://localhost:3030',
                  ]}
                />
              ) : (
                <Box align="end" pad={{vertical: "small"}}>
                  <Box width="medium">
                    <Text weight="bold" color="dark-4">
                      node: {nodeEndpoint}
                    </Text>
                  </Box>
                </Box>
              )
            }
          </Box>
        </Grid>
      </Box>
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