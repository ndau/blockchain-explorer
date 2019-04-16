import React, { Component } from 'react'
import { Text, Box, Collapsible } from "grommet"
import Anchor from '../../atoms/anchor'
import { Expand, Contract } from 'grommet-icons'
import Card from '../../atoms/card'
import Age from '../../atoms/age'
import BlockDetails from '../../organisms/blockDetails'
import { makeURLQuery } from '../../../helpers';

class BlockListItem extends Component {
  render() {
    const {block, active } = this.props;
    if (!block) {
      return <div></div>;
    }
  
    const {height, numberOfTransactions, timestamp} = block;
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
                  href={`/block/${height}/${makeURLQuery()}`}
                  label={`#${height}`}
                  onClick={event => event.stopPropagation()}
                />
              </Text>
              
              <Text size="xsmall" margin={{left: "medium"}} color="#aaa">
                <i><Age timestamp={timestamp} /></i>
              </Text>
            </Text>

            {
              !active &&
              <Box animation="fadeIn">
                <Text size="small">
                  { numberOfTransactions ? `${numberOfTransactions} ` : 'No '}
                  transaction{numberOfTransactions !== 1 && 's'}
                </Text>
              </Box>
            }
          </header>
        )}
        onClick={this.toggleActiveState}
        pad="15px"
        background={active ? "#0b1f3a" : "#0f2748"}
        margin="xsmall"
        animation={["slideDown", "fadeIn"]}
      >
        <Collapsible open={active}>
          <Box animation={active ? "fadeIn" : "fadeOut"}>
            <BlockDetails block={block} />
          </Box>
        </Collapsible>
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