/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Box, Text, Collapsible, CheckBox, Spinner } from 'grommet';

import FavouriteButton from '../../organisms/FavouriteButton/FavouriteButton';
import Details from '../../templates/details';
import DetailsCard from '../../molecules/detailsCard';
import AccountTimeline from '../../organisms/accountTimeline';
import { getAccount, getAccountHistory } from '../../../helpers/fetch';

const keywordMap = {
  address: 'address',
  balance: 'balance',
  currencySeatDate: 'currencySeat',
  delegationNode: 'node',
  incomingRewardsFrom: 'rewards',
  lastEAIUpdate: 'EAI',
  lastWAAUpdate: 'WAA',
  lock: 'lock',
  rewardsTarget: 'reward',
  sequence: 'sequence',
  recourseSettings: 'recourse',
  holds: 'recourse',
  stake: 'stake',
  validationKeys: 'validationKey',
  validationScript: 'validationScript',
  weightedAverageAge: 'WAA',
};

export async function loader({ params }) {
  const accountAddress = params.accountAddress;
  return await getAccount(accountAddress);
}

export default function Account(props) {
  const [history, setHistory] = useState('');
  const [hideDetails, setHideDetails] = useState(false);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const account = useLoaderData();
  const getData = (fromDate, toDate) => {
    setLoading(true);

    getAccountHistory(account.address, fromDate, toDate).then((historyResponseObj) => {
      if ((historyResponseObj.allItems && historyResponseObj.allItems.length === 0) || historyResponseObj[0] === null) {
        setHistory(null);
        setValid(true);
        setLoading(false);

        return;
      }

      setHistory(historyResponseObj);
      setValid(historyResponseObj.allItems.length > 0);
      setLoading(false);

      return;
    });
  };

  useEffect(() => {
    getData();
  }, [account]);

  // componentDidUpdate(prevProps) {
  //   const getURL = (location = {}) => {
  //     const { pathname, search } = location;
  //     return `${pathname}${search}`;
  //   };

  //   if (getURL(this.props.location) !== getURL(prevProps.location)) {
  //     this.getData();
  //   }
  // }

  return (
    <Details browserHistory={props.history} notFound={!account}>
      {/* {true ? ( */}
      {account ? (
        <>
          <Box margin={{ bottom: '20px' }}>
            <Text size="large">
              {/* hide empty toggle is not fully functional */}

              <Text size="large">
                Account{' '}
                <Text weight="bold" as="em" style={{ wordWrap: 'break-word' }}>
                  {account && account.address}
                </Text>
                {account && <FavouriteButton bookmarkVal={account.address} bookmarkType="account" />}
                <Text size="xsmall" color="#aaa" weight="normal" style={{ float: 'right' }}>
                  <CheckBox
                    toggle
                    checked={hideDetails}
                    label="hide details"
                    onChange={() => setHideDetails(!hideDetails)}
                    reverse
                    name="small"
                  />
                </Text>
              </Text>
            </Text>
          </Box>

          <Collapsible open={!hideDetails}>
            <Box
              animation={
                !hideDetails
                  ? 'fadeIn'
                  : {
                      type: 'fadeOut',
                      delay: 0,
                      duration: 100,
                    }
              }
            >
              {/* ACCOUNT DETAILS */}
              <DetailsCard data={account} keywordMap={keywordMap} />
            </Box>
          </Collapsible>

          <Box animation="fadeIn">
            <Text>
              <b>History{!hideDetails && ':'}</b>
            </Text>
          </Box>
          <Box
            style={
              !hideDetails
                ? {
                    margin: '0px 0px 0px 15px',
                    paddingLeft: '11px',
                    borderLeft: '1px solid rgba(255,255, 255, 0.3)',
                  }
                : {}
            }
          >
            <AccountTimeline
              events={history}
              balance={account && account.balance}
              fill={hideDetails}
              getAccountData={getData}
              loading={loading}
              setLoadingTrueFunc={() => setLoading(true)}
              setLoadingFalseFunc={() => setLoading(false)}
            />
          </Box>
        </>
      ) : (
        history === 0 && (
          <Box align="center">
            <Spinner size="medium" color="#F29A1D" />
          </Box>
        )
      )}
    </Details>
  );
}
