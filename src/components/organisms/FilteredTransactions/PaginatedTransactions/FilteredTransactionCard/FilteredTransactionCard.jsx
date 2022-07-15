/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from "react";
import { Text, Collapsible, Box, Avatar } from "grommet";
import Anchor from "../../../../atoms/anchor/index";
import Card from "../../../../atoms/card";
import Age from "../../../../atoms/age";
import moment from "moment";

const FilteredTransactionCard = ({ transaction }) => {
  const hash = transaction.hash;
  const type = transaction.type;
  const timestamp = transaction.timestamp;

  return (
    <div>
      {transaction ? (
        <Card
          header={
            <header>
              <Box
                direction="row"
                width="large"
                justify="between"
                align="center"
              >
                <Box
                  background="#012D5A"
                  width="30px"
                  height="30px"
                  justify="center"
                  align="center"
                  margin={{
                    right: "medium",
                  }}
                >
                  <Text color="#8096AD">TX</Text>
                </Box>

                <Box size="medium">
                  {hash && (
                    <>
                      <Anchor
                        openInNewTab
                        href={`/transaction/${window.encodeURIComponent(hash)}`}
                      >
                        <Box width="medium">
                          <Text weight="lighter" size="small">
                            {hash}
                          </Text>
                        </Box>
                      </Anchor>

                      {/* <TruncatedText value={hash} size="small" weight="lighter" /> */}
                    </>
                  )}
                </Box>

                <Text size="xsmall" color="#aaa">
                  {type} Transaction
                </Text>
                {timestamp && (
                  <Text size="10px" color="#aaa">
                    <i>
                      <Age
                        timestamp={moment(
                          timestamp,
                          "DD MMM YYYY. HH:mm zz"
                        ).valueOf()}
                        suffix="ago"
                      />
                    </i>
                  </Text>
                )}
              </Box>
            </header>
          }
          background="#132A47"
          opacity="0.3"
          height="80px"
          pad="medium"
          round="none"
          border="bottom"
        ></Card>
      ) : (
        <Card
          header={
            <header>
              <Text>No transaction data was retrieved.</Text>
            </header>
          }
          pad="small"
        />
      )}
    </div>
  );
};
export default FilteredTransactionCard;

//   render() {
//     const { open, border } = this.props;

//   getTransaction = () => {
//     const { transactionHash } = this.props;

//     getTransaction(transactionHash).then((transaction) => {
//       this.setState({ transaction });
//     });
//   };

//   toggleActiveState = (event) => {
//     event.stopPropagation();
//     const { open, index, setActiveTransaction } = this.props;

//     return open ? setActiveTransaction(null) : setActiveTransaction(index);
//   };
// }

// export default TransactionCard;
