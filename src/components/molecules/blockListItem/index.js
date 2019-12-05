import React, { Component } from 'react'
import { Text, Box } from "grommet"
import Anchor from '../../atoms/anchor'
import { Expand, Contract } from 'grommet-icons'
import Card from '../../atoms/card'
import Age from '../../atoms/age'
import BlockDetails from '../../organisms/blockDetails'

class BlockListItem extends Component {
  render() {
    const { block, active } = this.props;
    if (!block) {
      return <div></div>;
    }
  
    const {height, timestamp} = block;
    return (
      <Card
        header={(
          <header>
            <Text>
              <Text style={{float: 'right'}} >
                { 
                  active ? 
                  <Contract size="12px" color="#777"/> 
                  : 
                  <Expand size="12px" color="#777"/>
                }
              </Text>

              <Text size="medium">
                <b>Block </b>  
                <Anchor
                  href={`/block/${height}`}
                  label={`#${height}`}
                  onClick={event => event.stopPropagation()}
                />
              </Text>
              
              <Text size="xsmall" margin={{left: "medium"}} color="#aaa">
                <i><Age timestamp={timestamp} suffix="ago"/></i>
              </Text>
            </Text>
          </header>
        )}
        onClick={this.toggleActiveState}
        pad="15px"
        // background={active ? "#0b1f3a" : "#0f2748"}
        background={active ? "#0d2342" : "#0f2748"}
        margin="xsmall"
      >
        <Box 
          margin={{top: "10px"}}
        >
          <BlockDetails block={block} active={active} />
        </Box>
      </Card>
    );
  }

  toggleActiveState = (event) => {
    event.stopPropagation();
    const { active, setAsActiveBlock, unsetAsActiveBlock } = this.props
    return active ? unsetAsActiveBlock() : setAsActiveBlock()
  }
}

export default BlockListItem;