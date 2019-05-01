import React, { Component } from 'react'
import { Text, Box, Collapsible } from "grommet"
import { Expand, Contract } from 'grommet-icons'
import Card from '../../atoms/card'
import Age from '../../atoms/age'
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
    const amount = accountEvent.raw.balance - formattedPreviousEvent.raw.balance

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
                <i><Age timestamp={timestamp} /></i>
              </Text>

              <Text size="medium" color={amount > 0?'green':'red'} margin={{left: "medium"}}>
                <b>{amount > 0?'+':''}{convertNapuToNdau(amount)}</b>
              </Text>
              
              {/* <Text size="xsmall" margin={{left: "medium"}} color="#aaa">
                <i><Age timestamp={timestamp} /></i>
              </Text> */}
            </Text>

            {/* {
              !active &&
              <Box animation="fadeIn">
                <Text size="small">
                  {timestamp}
                </Text>
              </Box>
            } */}
          </header>
        )}
        onClick={this.toggleActiveState}
        pad="15px"
        // background="#293e63"
        animation={["slideDown", "fadeIn"]}
      >
        <Collapsible open={active}>
          <Box animation={active ? "fadeIn" : "fadeOut"}  margin={{top: "10px"}}>
            <Box 
              key={index} margin={{bottom: "small"}}
              // background="#293e63"
            > 
              <Text>
                <b>amount: </b> 
                {convertNapuToNdau(amount)}
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