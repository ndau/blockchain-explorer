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
import { Text, Box, Collapsible } from 'grommet'
import { Expand, Contract } from 'grommet-icons'
import Card from '../../atoms/card'
import Age from '../../atoms/age'
import Anchor from '../../atoms/anchor'
import TransactionsList from '../../organisms/transactionsList'
import { formatAccountEvent, convertNapuToNdau } from '../../../helpers/format'

class TimelineEvent extends Component {
  state = { active: false }
  render () {
    if (!this.props.event) {
      return null
    }

    const { event, previousEvent, index, selected } = this.props
    const { active: activeState } = this.state
    const active = selected || activeState
    const accountEvent = formatAccountEvent(event)
    const { balance, timestamp, transactionHash, blockHeight } = accountEvent

    const formattedPreviousEvent = previousEvent
      ? formatAccountEvent(previousEvent)
      : accountEvent
    const napuAmount =
      accountEvent.raw.balance - formattedPreviousEvent.raw.balance
    const ndauAmount = convertNapuToNdau(napuAmount)

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

              <Text size='xsmall' color='#aaa'>
                <i>
                  <Age timestamp={accountEvent.raw.timestamp} suffix='ago' />
                </i>
              </Text>

              <Text
                size='medium'
                color={
                  napuAmount === 0
                    ? 'rgba(255,255,255, 0.7)'
                    : napuAmount < 0
                    ? 'rgba(255,0,0,0.7)'
                    : 'rgba(0,255,0,0.7)'
                }
                margin={{ left: 'medium' }}
              >
                <b>
                  {napuAmount === 0 ? '' : napuAmount < 0 ? '-' : '+'}
                  {napuAmount === 0 ? '--' : ndauAmount}
                </b>
              </Text>
            </Text>
          </header>
        }
        pad='15px'
        animation='fadeIn'
      >
        <Collapsible open={active}>
          <Box
            margin={{ top: '10px' }}
            animation={
              active
                ? 'fadeIn'
                : {
                    type: 'fadeOut',
                    delay: 0,
                    duration: 100
                  }
            }
          >
            <Box key={index} margin={{ bottom: 'small' }}>
              <Text>
                <b>amount: </b>
                {ndauAmount}
              </Text>
              <Text>
                <b>current balance: </b>
                {balance}
              </Text>
              <Text>
                <b>previous balance: </b>
                {formattedPreviousEvent.balance}
              </Text>
              <Text>
                <b>time: </b>
                {timestamp}
              </Text>
              <Text>
                <b>block: </b>
                <Anchor href={`/block/${blockHeight}`}>#{blockHeight}</Anchor>
              </Text>
              <Text>
                {/* transaction:  */}
                {/* <TransactionsList
                  transactionHashes={[transactionHash]}
                  blockHeight={blockHeight}
                /> */}
              </Text>
            </Box>
          </Box>
        </Collapsible>
      </Card>
    )
  }

  toggleActiveState = event => {
    event.stopPropagation()
    this.setState(({ active }) => {
      return { active: !active }
    })
  }
}

export default TimelineEvent
