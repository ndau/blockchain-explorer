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
import TransactionsList from '../../organisms/transactionsList'
import Value from '../../molecules/value'
import Card from '../../atoms/card'
import '../detailsCard/style.css'

class BlockCard extends Component {
  render () {
    const { block, active, txLoading } = this.props

    if (!block) {
      return <h3>Loading...</h3>
    }

    const { raw, ...blockDetails } = block

    const { transactionHashes, height, numberOfTransactions } = blockDetails

    const notDisplayed = [
      'transactions',
      'numberOfTransactions',
      'transactionHashes',
      'timestamp'
    ]
    return (
      <Card background='transparent' pad={{ horizontal: '0' }}>
        <Box>
          <Collapsible open={active}>
            {Object.keys(blockDetails).map((property, index) => {
              if (notDisplayed.includes(property)) {
                return null
              }
              const value = blockDetails[property]
              return (
                <Box key={index} className='detailField' round='xsmall'>
                  <Text key={index}>
                    <b>{property}: </b>
                    {<Value value={value} rawValue={raw[property]} />}
                  </Text>
                </Box>
              )
            })}
          </Collapsible>
          <TransactionsList
            transactionHashes={transactionHashes}
            numberOfTransactions={numberOfTransactions}
            blockHeight={height}
            active={active}
            loading={txLoading}
          />
        </Box>
      </Card>
    )
  }
}

export default BlockCard
