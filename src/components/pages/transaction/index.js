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
import { Box, Text } from 'grommet';
import Anchor from '../../atoms/anchor'
import Details from '../../templates/details'
import DetailsCard from '../../molecules/detailsCard'
import { getTransaction } from '../../../helpers/fetch'
import FavouriteButton from '../../organisms/FavouriteButton/FavouriteButton';

class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transaction: {},
      blockHeight: null,
    }

    this.getData();
  }

  render() {
    const { transaction } = this.state;
    const blockHeight = transaction && transaction.blockHeight
    
    if (!transaction) {
      return (
        <Details browserHistory={this.props.history} notFound/>
      );
    }

    return (
      <Details browserHistory={this.props.history}>
        <Box margin={{bottom: "20px"}}>
          <Text>
            <Text size="large">
              Transaction{' '}
              <Text weight="bold" as="em" style={{wordWrap: "break-word"}}>
                {transaction && transaction.hash}
              </Text>
              <FavouriteButton bookmarkVal={transaction.hash} bookmarkType="transaction"/>
            </Text>
            
            {
              blockHeight &&
              <Text as="span" style={{float: "right"}}>
                Block <Anchor href={`/block/${blockHeight}`}>{`#${blockHeight}`}</Anchor>
              </Text>
            }
          </Text>
        </Box>
        
        <DetailsCard data={transaction} />
      </Details>
    )
  }

  getData = () => {
    const { blockHeight, transactionHash } = this.props.match.params;
    getTransaction(transactionHash)
      .then(transaction => {
        this.setState({ transaction, blockHeight })
      })
  }

  componentDidUpdate(prevProps) {
    const getURL = (location={}) => {
      const {pathname, search} = location
      return `${pathname}${search}`
    }

    if (getURL(this.props.location) !== getURL(prevProps.location)) {
      this.getData();
    }
  }
}

export default Transaction
