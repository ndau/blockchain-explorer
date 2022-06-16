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
import axios from "axios";
import { Box, Heading, Text, Grid, ResponsiveContext } from "grommet";
import Age from "../../atoms/age";
import Dashboard from "../../templates/dashboard";
import BlockchainSearch from "../../molecules/blockchainSearch";
import LatestBlocks from "../../organisms/latestBlocks";
import TransactionsList from "../../organisms/transactionsList";
import LatestTransactions from "../../organisms/LatestTransactions/LatestTransactions";
import PriceCurve from "../../organisms/priceCurve";
import { formatTime } from "../../../helpers/format";
import { POLL_INTERVAL } from "../../../constants";
import {
  getNodeStatus,
  getCurrentOrder,
  getBlocks,
  pollForBlocks,
  getNodeEndpoint,
} from "../../../helpers/fetch";

const BLOCK_LIST_LENGTH = 5;

const LastUpdated = (props) => {
  const lastUpdated = props.lastUpdated;

  return (
    <Box align="center" margin={{ bottom: "large" }}>
      <Text
        color="#343E49"
        size="xsmall"
        margin={{ left: "small" }}
        style={{ fontStyle: "italic" }}
      >
        {"LAST UPDATED "}
        <Age timestamp={lastUpdated} recent="JUST NOW" suffix="AGO" />,{" "}
        {formatTime(lastUpdated)}
      </Text>
    </Box>
  );
};

const bigScreenGrid = [
  { name: "latestBlocks", start: [0, 0], end: [0, 0] },
  { name: "latestTransactions", start: [1, 0], end: [1, 0] },
];

const smallScreenGrid = [
  { name: "latestBlocks", start: [0, 0], end: [0, 0] },
  { name: "latestTransactions", start: [0, 1], end: [0, 1] },
];

const bigScreenRows = ["large"];
const smallScreenRows = ["500px", "medium"];

const bigScreenColumns = ["40vw", "40vw"];
const smallScreenColumns = ["90vw"];

class NdauDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: null,
      latestBlockHeight: 1,
      priceInfo: null,
      hideEmpty: true,
      lastUpdated: new Date(),
      latestFiveTransactions: [],
    };

    this.getData();
  }

  render() {
    const { blocks, priceInfo = {}, lastUpdated } = this.state;
    return (
      <ResponsiveContext.Consumer>
        {(screenSize) => (
          <Dashboard browserHistory={this.props.history} selectNode>
            <Box margin={{ bottom: "large",top: screenSize==="small" ? "4%":"" }} >
              <Heading alignSelf="left" size="small" textAlign="left">
                The Ndau Blockchain Explorer
              </Heading>

              <Box align="left" margin={{ bottom: "xsmall" }}>
                <BlockchainSearch />
              </Box>

              <LastUpdated lastUpdated={lastUpdated} />

              <PriceCurve priceInfo={priceInfo} />
            </Box>

            <Grid
            justifyContent="center"
              rows={screenSize === "small" ? smallScreenRows : bigScreenRows}
              columns={
                screenSize === "small" ? smallScreenColumns : bigScreenColumns
              }
              gap="medium"
              areas={screenSize === "small" ? smallScreenGrid : bigScreenGrid}

            >
              <Box gridArea="latestBlocks">
                <LatestBlocks blocks={blocks} range={BLOCK_LIST_LENGTH} />
              </Box>

              <Box gridArea="latestTransactions">
                <LatestTransactions
                  transactionHashes={this.state.latestFiveTransactions} //used
                  numberOfTransactions={5} //used
                  loading={this.state.latestFiveTransactions.length < 5} //used
                />
              </Box>
            </Grid>
          </Dashboard>
        )}
      </ResponsiveContext.Consumer>
    );
  }

  componentDidUpdate(prevProps) {
    const getURL = (location = {}) => {
      const { pathname, search } = location;
      return `${pathname}${search}`;
    };

    if (getURL(this.props.location) !== getURL(prevProps.location)) {
      this.getData();
    }
  }

  getData = () => {
    getNodeStatus().then((status) => {
      getCurrentOrder().then((priceInfo) => {
        if (!status) {
          this.setState({ priceInfo });
          return null;
        }

        const latestBlockHeight = status.latest_block_height;
        const limit = BLOCK_LIST_LENGTH;
        const hideEmpty = this.state.hideEmpty;

        getBlocks({ before: latestBlockHeight, filter: hideEmpty, limit }).then(
          async ({ blocks }) => {
            console.log(blocks,"blocks in dashboard");
            
            if (!blocks) {
              return null;
            }

            let latestFiveTransactions = [];
            let i = 0;
            while (latestFiveTransactions.length < 5) {
              try {
                let blockHeight = blocks[i].height;
                const nodeEndpoint = await getNodeEndpoint();
                const blockEndpoint = `${nodeEndpoint}/block/transactions/${blockHeight}`;
                let result = await axios.get(blockEndpoint);
                for (let j = 0; j < result.data.length; j++) {
                  latestFiveTransactions.push(result.data[j]);
                }
                i++;
              } catch (e) {
                console.error(e);
                break;
              }
              // }
            }

            this.setState(
              {
                blocks,
                latestBlockHeight,
                priceInfo,
                latestFiveTransactions,
              },
              () => {
                this.startPolling({
                  after: this.state.latestBlockHeight,
                  filter: hideEmpty,
                  success: this.resetData,
                });
              }
            );
          }
        );
      });
      return status;
    });
  };

  componentWillUnmount() {
    this.endPolling();
  }

  startPolling = ({ after, filter, success }) => {
    this.endPolling();

    this.pollInterval = window.setInterval(
      pollForBlocks({ after, filter, success }),
      POLL_INTERVAL
    );
  };

  endPolling = () => {
    if (this.pollInterval) {
      window.clearInterval(this.pollInterval);
    }
  };

  resetData = (newBlocks, latestBlockHeight, newPriceInfo) => {
    if (newBlocks && newBlocks.length > 0) {
      const { blocks = [] } = this.state;

      const latestBlocks = [...newBlocks, ...blocks].slice(0, 5);

      this.setState(({ priceInfo }) => {
        return {
          blocks: latestBlocks,
          latestBlockHeight,
          priceInfo: newPriceInfo || priceInfo,
          lastUpdated: new Date(),
        };
      });
    }
  };
}

export default NdauDashboard;
