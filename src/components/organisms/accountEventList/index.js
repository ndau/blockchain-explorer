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
import { Box } from 'grommet'
import TimelineEvent from '../../molecules/timelineEvent'

class AccountEventList extends Component {
  // constructor(props) {
  //   super(props)
  // }
  
  render() {
    const { events, activeEvent, selectedEvent } = this.props;
    if(!events) {
      return null
    }

    const borderStyle = "1px dashed rgba(255,255,255,0.1)"

    return (
      <Box onMouseLeave={this.clearActiveEvent}>
        {
          events.map((event, index) => {
            const isActive = activeEvent && ( activeEvent.TxHash === event.TxHash )
            const isSelected = selectedEvent && ( selectedEvent.TxHash === event.TxHash )

            return (
              <Box key={index} onMouseEnter={() => this.setActiveEvent(event)} >
                <Box 
                  round="xsmall"
                  style={{border: isActive ? "1px dashed rgba(255,255,255,0.3)" : borderStyle}}
                  background="rgba(255,255,255,0.05)"
                > 
                  <TimelineEvent 
                    event={event}
                    previousEvent={this.getPreviousEvent(event)}
                    index={index}
                    selected={isSelected}
                  />
                </Box>

                {
                  index !== events.length -1 &&
                  <Box 
                    alignSelf="center" 
                    border="right" 
                    height="20px" 
                    width="0"
                    style={{borderRight: borderStyle}}
                  />
                } 
              </Box>
            )
          })
        }
      </Box>
    );
  }

  // componentDidUpdate = async (prevProps) => {
  //   if(!prevProps.events && this.props.events) {
  //     await this.getEventTransactions()
  //   }
  // }
}

export default AccountEventList
