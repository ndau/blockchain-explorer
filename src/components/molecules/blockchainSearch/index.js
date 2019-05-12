import React, { Component } from 'react'
import { Box, TextInput, Menu, Text, Stack } from 'grommet'
import qs from 'query-string'
import { Search } from 'grommet-icons'
import { NODE_ENDPOINTS } from '../../../constants'
import { getNodeStatus } from '../../../helpers/fetch'

class BlockchainSearch extends Component {
  constructor(props) {
    super(props);
    const query = qs.parse(window.location.search);
    this.state = {
      currentNode: query.node,
      invalidNode: null,
      searchTerm: '',
      searchType: null,
      invalidType: null
    }
  }
  
  render() {
    const { searchTerm, invalidType, invalidNode } = this.state;
    const { currentNode } = this.state;
    const nodes = [
      {
        label:"mainnet",
        onClick: () => this.changeNode("mainnet"),
      },
      {
        label:"testnet",
        onClick: () => this.changeNode("testnet")
      },
      {
        label:"devnet",
        onClick: () => this.changeNode("devnet")
      },
    ]
    const invalidEntry = invalidType || invalidNode
    const selectableNodes = nodes && nodes.filter(node => node && node.label !== currentNode)

    return (
      <Box 
        round="large" 
        border
        width="large"
        direction="row"
        align="center" 
        style={{
          borderColor: invalidEntry ? "rgba(255,0,0,0.5)" : "rgba(255,255,255,0.2)",
          background: invalidEntry ? "rgba(255,0,0,0.1)" : ""
        }}
      >   
        <Stack fill>
          {
            invalidEntry &&
            <Box 
              justify="end" 
              height="44px" 
              align="center"
              animation={{type: "fadeIn", delay: 0, duration: 300 }}
            >
              {
                invalidNode ? (
                  <Text color="red" size="xsmall" weight="bold">
                    {invalidNode || "node"} is down!
                  </Text>
                ) : (
                  <Text color="red" size="xsmall" weight="bold">
                    invalid entry!
                  </Text>
                )
              }
            </Box>
          }

          <Box justify="center" height="100%">
            <TextInput
              type="search" 
              value={searchTerm}
              onChange={this.changeSearchTerm}
              plain
              size="small"
              placeholder="search for blocks, transactions or accounts..."
            />
          </Box>
        </Stack>

        <Box 
          background="rgba(0, 0, 0, 0.06)"
          pad={{right: "15px", left: "5px"}}
        >
          <Menu
            size="small"
            items={selectableNodes}
            label={
              <Text color="#ddd" size="small">
                {currentNode || "choose node"}
              </Text>
            }
          />
        </Box>

        <Box 
          onClick={this.onSearch} 
          pad={{right: "20px", left: "15px"}}
          justify="center"
          style={{
            height: "44px",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "0 100% 100% 0"
          }}
        >
          <Search color="rgba(255,255,255,0.7)"/>
        </Box>
      </Box>
    )
  }

  changeNode = ( selectedNode ) => {
    const { browserHistory } = this.props; 
    const nodeEnpoints = NODE_ENDPOINTS[selectedNode]
    getNodeStatus(nodeEnpoints)
      .then(status => {
        if(status && browserHistory) {
          browserHistory.push({
            path: `${window.location.origin}${window.location.pathname}`,
            search: `?node=${selectedNode}`
          })
    
          this.setState({ currentNode: selectedNode, invalidNode: false })
        }
        else {
          this.setState({ invalidNode: selectedNode })
        }
      })
  }

  changeSearchTerm = (event) => {
    const { value } = event.target;
    this.setState({ 
      searchTerm: value && value.trim(), 
      invalidType: null,
      invalidNode: null
    })
  }

  onSearch = () => {
    const searchType = this.termType()
    return this.setState({ 
      searchType,
      invalidType: searchType ? false : true
    }, this.goToURL)   
  }

  termType = () => {
    const { searchTerm } = this.state 
    if(!searchTerm) {
      return null
    }  

    const term = searchTerm.trim()
    const isInteger = Number(term)
    const termLength = searchTerm.length
    
    if(isInteger && isInteger < 10000000) {
      return 'blockHeight'
    }

    if(termLength === 48 && searchTerm.slice(0,2) === 'nd') {
      return 'address'
    }

    if(termLength === 22) {
      return 'transactionHash'
    }

    return null
  }

  goToURL = () => {
    const { searchTerm , searchType } = this.state
    const query = window.location.search;

    if (searchType === "blockHeight") {
      return window.location.href = `/block/${searchTerm}/${query}`
    }

    if (searchType === "address") {
      return window.location.href = `/account/${searchTerm}/${query}`
    }
  
    if (searchType === "transactionHash") {
      return window.location.href = `/transaction/${searchTerm}/${query}`
    }
  }
}

export default BlockchainSearch;