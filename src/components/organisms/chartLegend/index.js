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
import { Box, ResponsiveContext } from 'grommet'
import Legends from '../../molecules/legends'
import { humanizeNumber } from '../../../helpers/format'

class ChartLegend extends Component {
  render () {
    const {
      totalNdau,
      marketPrice,
      sib,
      active,
      totalNdauIssued,
      nextIssuePrice
    } = this.props

    return (
      <ResponsiveContext.Consumer>
        {screenSize =>
          screenSize === 'small' ? (
            <Box className='mobileLegend' align='center'>
              <Legends
                info={[
                  {
                    label: 'ndau in circulation',
                    value: humanizeNumber(totalNdau, 0),
                    inactive: active,
                    keyword: 'ndauInCirculation'
                  },
                  {
                    label: 'current market price',
                    value: `${humanizeNumber(marketPrice, 4, 4)} USD`,
                    inactive: active,
                    keyword: 'currentMarketPrice'
                  },
                  {
                    label: 'SIB in effect',
                    value: sib === 0 || sib ? `${humanizeNumber(sib*10, 2, 2)}%` : '--',
                    inactive: active
                  },
                  {
                    label: 'ndau issued',
                    value: humanizeNumber(totalNdauIssued, 0)
                  },
                  {
                    label: 'next issued price',
                    value: `${humanizeNumber(nextIssuePrice, 4, 4)} USD`
                  }
                ]}
              />
            </Box>
          ) : (
            <Box className='legend' direction='row' align='end'>
              <Box>
                <Legends
                  info={[
                    {
                      label: 'SIB in effect',
                      value: sib === 0 || sib ? `${humanizeNumber(sib*10, 2, 2)}%` : '--',
                      inactive: active,
                      keyword: 'SIB'
                    }
                  ]}
                />
              </Box>
              <Box>
                <Legends
                  info={[
                    {
                      label: 'ndau issued',
                      value: humanizeNumber(totalNdauIssued, 0)
                    },
                    {
                      label: 'ndau in circulation',
                      value: humanizeNumber(totalNdau, 0),
                      inactive: active,
                      keyword: 'ndauInCirculation'
                    }
                  ]}
                />
              </Box>

              <Box>
                <Legends
                  info={[
                    {
                      label: 'next issued price',
                      value: `${humanizeNumber(nextIssuePrice, 4, 4)} USD`
                    },
                    {
                      label: 'current market price',
                      value: `${humanizeNumber(marketPrice, 4, 4)} USD`,
                      inactive: active,
                      keyword: 'currentMarketPrice'
                    }
                  ]}
                />
              </Box>
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    )
  }
}

export default ChartLegend
