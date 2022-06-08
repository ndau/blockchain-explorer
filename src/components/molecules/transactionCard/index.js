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
import { Text, Collapsible, Box } from 'grommet'
import Anchor from '../../atoms/anchor' 
import { Expand, Contract } from 'grommet-icons'
import Card from '../../atoms/card'
// import TransactionDetails from '../../organisms/transactionDetails'
// import TransactionDetails from '../../organisms/txDetails'
import DetailsCard from '../../molecules/detailsCard'
import TruncatedText from '../../atoms/truncatedText'
import { getTransaction } from '../../../helpers/fetch'
import './style.css'

class TransactionCard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      transaction: {}
    }

    this.getTransaction()
  }

  render () {
    const { transaction } = this.state
    const { open } = this.props

    if (!transaction) {
      return (
        <Card
          header={
            <header>
              <Text>No transaction data was retrieved.</Text>
            </header>
          }
          pad='15px'
        />
      )
    }

    const { hash, type } = transaction

    return (
      <Card
        header={
          <header>
            <Box>
              <Text truncate as='article'>
                <Text style={{ float: 'right' }}>
                  {open ? (
                    <Contract
                      style={{ cursor: 'pointer' }}
                      size='12px'
                      color='#777'
                      onClick={this.toggleActiveState}
                    />
                  ) : (
                    <Expand
                      size='12px'
                      color='#777'
                      style={{ cursor: 'pointer' }}
                      onClick={this.toggleActiveState}
                    />
                  )}
                </Text>
                <Text weight='bold' header>
                  Transaction
                  <Text>
                    {hash && (
                      <Anchor
                        href={`/transaction/${window.encodeURIComponent(hash)}`}
                      >
                        {` `}
                        <TruncatedText value={hash} className='txHash' />
                      </Anchor>
                    )}
                  </Text>
                </Text>
              </Text>
              {!open && type && (
                <Box lanimation='fadeIn'>
                  <Text size='xsmall'>{type} Transaction</Text>
                </Box>
              )}
            </Box>
          </header>
        }
        background='#0b1f3a'
        opacity='0.3'
        pad='15px'
        
      >
        <Collapsible open={open} >
          <Box
          height="xlarge"
            margin={{ top: '10px' }}
            animation={
              open
                ? 'fadeIn'
                : {
                    type: 'fadeOut',
                    delay: 0,
                    duration: 100
                  }
            }
          >
            <DetailsCard data={transaction} />
          </Box>
        </Collapsible>
      </Card>
    )
  }

  componentDidUpdate (prevProps) {
    if (this.props.transactionHash !== prevProps.transactionHash) {
      this.getTransaction()
    }
  }

  getTransaction = () => {
    const { transactionHash } = this.props

    getTransaction(transactionHash).then(transaction => {
      this.setState({ transaction })
    })
  }

  toggleActiveState = event => {
    event.stopPropagation()
    const { open, index, setActiveTransaction } = this.props
    
    return open ? setActiveTransaction(null) : setActiveTransaction(index)
  }
}

export default TransactionCard
