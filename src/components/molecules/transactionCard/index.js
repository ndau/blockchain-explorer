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
import Anchor from "../../atoms/anchor";
import { Expand, Contract } from "grommet-icons";
import Card from "../../atoms/card";
import DetailsCard from "../../molecules/detailsCard";
import TruncatedText from "../../atoms/truncatedText";
import Age from "../../atoms/age";
import { getTransaction } from "../../../helpers/fetch";
import moment from "moment";
import "./style.css";

class TransactionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transaction: {},
    };

    this.getTransaction();
  }

  render() {
    const { transaction } = this.state;
    const { open, border } = this.props;

    if (!transaction) {
      return (
        <Card
          header={
            <header>
              <Text>No transaction data was retrieved.</Text>
            </header>
          }
          pad="small"
        />
      );
    }

    const { hash, type, timestamp } = transaction;

    return (
      <Card
        header={
          <header>
            <Box direction="row" width="large" justify="between" align="center">
              <Box
                background="#012D5A"
                width="30px"
                height="30px"
                justify="center"
                align="center"
              >
                <Text color="#8096AD">TX</Text>
              </Box>

              <Box size="small">
                {hash && (
                  <>
                    <Anchor
                      href={`/transaction/${window.encodeURIComponent(hash)}`}
                    >
                      <Box width="xsmall">
                        <Text weight="lighter" size="small" truncate={true}>
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
        border={border}
      >
    
      </Card>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.transactionHash !== prevProps.transactionHash) {
      this.getTransaction();
    }
  }

  getTransaction = () => {
    const { transactionHash } = this.props;

    getTransaction(transactionHash).then((transaction) => {
      this.setState({ transaction });
    });
  };

  toggleActiveState = (event) => {
    event.stopPropagation();
    const { open, index, setActiveTransaction } = this.props;

    return open ? setActiveTransaction(null) : setActiveTransaction(index);
  };
}

export default TransactionCard;
