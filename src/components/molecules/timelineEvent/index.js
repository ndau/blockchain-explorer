import React, { Component } from 'react'
import { Text, Box, Collapsible } from "grommet"
import { Expand, Contract } from 'grommet-icons'
import Card from '../../atoms/card'
import Age from '../../atoms/age'
import Anchor from '../../atoms/anchor'
import TransactionList from '../../organisms/transactionsList'
import { formatAccountEvent, convertNapuToNdau } from '../../../helpers/format'

class TimelineEvent extends Component {
  state = { active: false}
  render() {
    if (!this.props.event) {
      return <div></div>;
    }

    const { event, previousEvent, index } = this.props
    const { active } = this.state
    const accountEvent = formatAccountEvent(event)
    const {
      balance,
      timestamp,
      transactionHash,
      blockHeight,
    } = accountEvent;
     
    const formattedPreviousEvent = previousEvent ? formatAccountEvent(previousEvent) : accountEvent
    const napuAmount = accountEvent.raw.balance - formattedPreviousEvent.raw.balance
    const ndauAmount = convertNapuToNdau(napuAmount)

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

              <Text size="xsmall" color="#aaa">
                <i><Age timestamp={accountEvent.raw.timestamp} suffix="ago" /></i>
              </Text>

              <Text 
                size="medium" 
                color={napuAmount > 0 ? 'green' :'rgba(255,0,0,0.7)'} 
                margin={{left: "medium"}}
              >
                <b>{napuAmount > 0?'+':'-'}{ndauAmount}</b>
              </Text>
            </Text>
          </header>
        )}
        onClick={this.toggleActiveState}
        pad="15px"
        animation="fadeIn"
      >
        <Collapsible open={active}>
          <Box 
            margin={{top: "10px"}}
            animation={active ? "fadeIn" : {
              "type": "fadeOut",
              "delay": 0,
              "duration": 100,
            }}
          >
            <Box 
              key={index} margin={{bottom: "small"}}
            > 
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
                <b>time: </b>{timestamp}
              </Text>
              <Text>
                <b>block: </b>
                <Anchor href={`/block/${blockHeight}`}>
                  #{blockHeight}
                </Anchor>
                
              </Text>
              <Text>
                {/* transaction:  */}
                <TransactionList transactionHashes={[transactionHash]} blockHeight={blockHeight}/>
              </Text>
            </Box>
          </Box>
        </Collapsible>
      </Card>
    );
  }

  toggleActiveState = (event) => {
    event.stopPropagation();
    this.setState(({active}) => {
      return { active: !active }
    })
  }
}

export default TimelineEvent;