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
import { Box, Heading, Text, Grid } from "grommet";
import Age from "../../atoms/age";
import Dashboard from "../../templates/dashboard";
import BlockchainSearch from "../../molecules/blockchainSearch";
import LatestBlocks from "../../organisms/latestBlocks";
import PriceCurve from "../../organisms/priceCurve";
import {
  getNodeStatus,
  getCurrentOrder,
  getBlocks,
  pollForBlocks,
} from "../../../helpers/fetch";
import { formatTime } from "../../../helpers/format";
import { POLL_INTERVAL } from "../../../constants";

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

class NdauDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: null,
      latestBlockHeight: 1,
      priceInfo: null,
      hideEmpty: true,
      lastUpdated: new Date(),
    };

    this.getData();
  }

  render() {
    const { blocks, priceInfo = {}, lastUpdated } = this.state;
    return (
      <Dashboard browserHistory={this.props.history} selectNode>
        <Box margin={{ bottom: "large" }}>
          <Heading alignSelf="center" size="small" textAlign="center">
            The Ndau Blockchain Explorer
          </Heading>

          <Box align="center" margin={{ bottom: "xsmall" }}>
            <BlockchainSearch />
          </Box>

          <LastUpdated lastUpdated={lastUpdated} />

          <PriceCurve priceInfo={priceInfo} />
        </Box>
        <Grid
          rows={["large"]}
          columns={[["xsmall","large"], ["xsmall","large"]]}
          gap="medium"
          areas={[
            { name: "latestBlocks", start: [0, 0], end: [0, 0] },
            { name: "latestTransactions", start: [1, 0], end: [1, 0] },
          ]}
        >
          <Box gridArea="latestBlocks">
            <LatestBlocks blocks={blocks} range={BLOCK_LIST_LENGTH} />
          </Box>

          <Box gridArea="latestTransactions">
            <LatestBlocks blocks={blocks} range={BLOCK_LIST_LENGTH} />
          </Box>
        </Grid>
      </Dashboard>
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
          ({ blocks }) => {
            if (!blocks) {
              return null;
            }

            this.setState(
              {
                blocks,
                latestBlockHeight,
                priceInfo,
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
