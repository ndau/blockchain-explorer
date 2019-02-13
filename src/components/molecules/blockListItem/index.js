import React, { Component } from 'react'
import { Anchor, Text, Box } from "grommet"
import Card from '../../atoms/card'

class BlockListItem extends Component {
  render() {
    const { height, numberOfTransactions, age, active, setAsActiveBlock } = this.props;
    return (
      <Card
        header={(
          <header>
            <Text>
              Block <Anchor href={`/block/${height}/${window.location.search}`} label={`#${height}`}/>
            </Text>
            
            <Text size="xsmall" style={{float: 'right'}}>
              {age}
            </Text>
          </header>
        )}
        onClick={setAsActiveBlock}
        background={active && "dark-2"}
        pad="small"
      >
        <Box>
          <Text>
            {
              numberOfTransactions ?
              <Anchor 
                href={`/block/${height}/transactions/${window.location.search}`} 
                label={`${numberOfTransactions} `} 
              />
              :
              'No '
            }
            transaction{numberOfTransactions !== 1 && 's'}
          </Text>
        </Box> 
      </Card>
    );
  }
}

export default BlockListItem;