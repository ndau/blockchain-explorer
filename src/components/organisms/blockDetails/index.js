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
import BlockCard from '../../molecules/blockCard'
import { getTransactionHashes } from '../../../helpers/fetch'

class BlockDetails extends Component {
  constructor (props) {
    super(props)
    this.state = { transactionHashes: [], firstFetch: true, txLoading: false }
  }
  componentDidMount () {
    if (this.props.block) {
      this.setTransactionHashes(this.props.block)
    }
  }

  render () {
    const { transactionHashes, txLoading } = this.state
    const { block, active } = this.props
    if (!block) {
      return null
    }

    const data = {
      ...block,
      transactionHashes
    }

    return (
        <BlockCard block={data} active={active} txLoading={txLoading} />
    )
  }

  setTransactionHashes (block) {
    if (block && block.numberOfTransactions > 0) {
      this.setState({ txLoading: true })
      getTransactionHashes(block.height).then(transactionHashes => {
        this.setState({ transactionHashes, txLoading: false })
      })
    }
  }

  componentDidUpdate (prevProps) {
    const { block } = this.props
    if (JSON.stringify(block) !== JSON.stringify(prevProps.block)) {
      this.setTransactionHashes(block)
    }
  }
}

export default BlockDetails
