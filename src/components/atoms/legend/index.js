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
import { Box, Text } from 'grommet'
import Keyword from '../../molecules/keyword'
import './style.css'

class Legend extends Component {
  render () {
    const { label, value, inactive, keyword } = this.props
    return (
      <Box
        style={{
          opacity: inactive ? '0.1' : '1',
          transition: 'opacity 0.3s',
          height: '25px'
        }}
        direction='row'
      >
        <Box
          className='legendLabel'
          style={{ textAlign: 'right', marginRight: '3px', minWidth: '135px' }}
        >
          <Text
            size='small'
            color='#ffe7c6'
            style={{
              marginTop: keyword && -3,
              marginLeft: keyword && 10
            }}
          >
            {keyword && (
              <Text margin={{ right: 'xxsmall' }}>
                <Keyword keyword={keyword} size='small' />
              </Text>
            )}
            {label}:
          </Text>
        </Box>
        <Box className='legendValue'>
          <Text size='small' weight='bold'>
            {value}
          </Text>
        </Box>
      </Box>
    )
  }
}

export default Legend
