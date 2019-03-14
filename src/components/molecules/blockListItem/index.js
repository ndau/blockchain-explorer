import React, { Component } from 'react'
import { Anchor, Text, Box, Collapsible } from "grommet"
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
                  <Contract size="15px" color="#aaa" onClick={this.unsetAsActiveBlock}/> 
                  : 
                  <Expand size="15px" color="#aaa" onClick={this.setAsActiveBlock}/>
                }
              </Text>

              <Text size="large">
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
          </header>
        )}
        onClick={this.setAsActiveBlock}
        pad="medium"
        background={active ? "#0b1f3a" : "#0f2748"}
        margin="xsmall"
        animation={["slideDown", "fadeIn"]}
      >
        <Box>
          {
            !active &&
            <Box>
              <Text size="small">
                { numberOfTransactions ? `${numberOfTransactions} ` : 'No '}
                transaction{numberOfTransactions !== 1 && 's'}
              </Text>
            </Box>
          }

          <Collapsible open={active}>
            <BlockDetails block={block} />
          </Collapsible> 
        </Box> 
      </Card>
    );
  }


  setAsActiveBlock = (event) => {
    event.stopPropagation();
    const { setAsActiveBlock } = this.props
    setAsActiveBlock && setAsActiveBlock()
  }

  unsetAsActiveBlock = (event) => {
    event.stopPropagation();
    const { unsetAsActiveBlock } = this.props
    unsetAsActiveBlock && unsetAsActiveBlock()
  }
}

export default BlockListItem;