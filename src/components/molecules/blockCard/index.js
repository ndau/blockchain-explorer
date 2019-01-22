import React, { Component } from 'react'
import { Anchor, Text } from "grommet"
import Card from '../../atoms/card'

class BlockCard extends Component {
  render() {
    const { height, hash, transactions, age, active, setAsActiveBlock } = this.props;
    return (
      <Card
        header={(
          <header>
            <Text>
              Block <Anchor href={`/block/${height}`} label={`#${height}`}/>
            </Text>
            
            <Text size="xsmall" style={{float: 'right'}}>
              {age}
            </Text>
          </header>
        )}
        onClick={setAsActiveBlock}
        background={active && "dark-2"}
      >
        <section>
          <Text>
            {
              transactions ?
              <Anchor 
                href={`/blocks/${height}/transactions`} 
                label={`${transactions} `} 
              />
              :
              'No '
            }
            transaction{transactions !== 1 && 's'}
          </Text>
          <Text truncate as="article">
            <b>hash: </b> {hash}
          </Text>
        </section> 
      </Card>
    );
  }
}

export default BlockCard;