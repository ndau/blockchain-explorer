/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Box, Text } from 'grommet';
import Anchor from '../../atoms/anchor';
import Details from '../../templates/details';
import DetailsCard from '../../molecules/detailsCard';
import { getTransaction } from '../../../helpers/fetch';
import FavouriteButton from '../../organisms/FavouriteButton/FavouriteButton';

export async function loader({ params }) {
  const transactionHash = params.transactionHash;
  return await getTransaction(transactionHash);
}

export default function Transaction(props) {
  const transaction = useLoaderData();
  const blockHeight = transaction && transaction.blockHeight;

  if (!transaction) {
    return <Details browserHistory={props.history} notFound />;
  }

  return (
    <Details browserHistory={props.history}>
      <Box margin={{ bottom: '20px' }}>
        <Text>
          <Text size="large">
            Transaction{' '}
            <Text weight="bold" as="em" style={{ wordWrap: 'break-word' }}>
              {transaction && transaction.hash}
            </Text>
            <FavouriteButton bookmarkVal={transaction.hash} bookmarkType="transaction" />
          </Text>

          {blockHeight && (
            <Text as="span" style={{ float: 'right' }}>
              Block <Anchor href={`/block/${blockHeight}`}>{`#${blockHeight}`}</Anchor>
            </Text>
          )}
        </Text>
      </Box>

      <DetailsCard data={transaction} />
    </Details>
  );
}
