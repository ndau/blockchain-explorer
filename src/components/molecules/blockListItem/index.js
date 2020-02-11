/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from 'react'
import { Text, Box } from 'grommet'
import Anchor from '../../atoms/anchor'
import { Expand, Contract } from 'grommet-icons'
import Card from '../../atoms/card'
import Age from '../../atoms/age'
import BlockDetails from '../../organisms/blockDetails'

class BlockListItem extends Component {
  render () {
    const { block, active } = this.props
    if (!block) {
      return <div></div>
    }

    const { height, timestamp } = block
    return (
      <Card
        header={
          <header>
            <Text>
              <Text style={{ float: 'right' }}>
                {active ? (
                  <Contract
                    style={{ cursor: 'pointer' }}
                    onClick={this.toggleActiveState}
                    size='12px'
                    color='#777'
                  />
                ) : (
                  <Expand
                    style={{ cursor: 'pointer' }}
                    onClick={this.toggleActiveState}
                    size='12px'
                    color='#777'
                  />
                )}
              </Text>

              <Text size='medium'>
                <b>Block </b>
                <Anchor
                  href={`/block/${height}`}
                  label={`#${height}`}
                  onClick={event => event.stopPropagation()}
                />
              </Text>

              <Text size='xsmall' margin={{ left: 'medium' }} color='#aaa'>
                <i>
                  <Age timestamp={timestamp} suffix='ago' />
                </i>
              </Text>
            </Text>
          </header>
        }
        pad='15px'
        // background={active ? "#0b1f3a" : "#0f2748"}
        background={active ? '#0d2342' : '#0f2748'}
        margin='xsmall'
      >
        <Box margin={{ top: '10px' }}>
          <BlockDetails block={block} active={active} />
        </Box>
      </Card>
    )
  }

  toggleActiveState = event => {
    event.stopPropagation()
    const { active, setAsActiveBlock, unsetAsActiveBlock } = this.props
    return active ? unsetAsActiveBlock() : setAsActiveBlock()
  }
}

export default BlockListItem
