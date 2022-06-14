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
import { Text, Box } from "grommet";
import Anchor from "../../atoms/anchor";
import Card from "../../atoms/card";
import Age from "../../atoms/age";
import BlockDetails from "../../organisms/blockDetails";

class BlockListItem extends Component {
  constructor(props) {
    super(props);
    const { raw, ...blockDetails } = props.block;
    this.state = { numberOfTransactions: blockDetails.numberOfTransactions };
  }
  render() {
    const { block, active, border,exclude } = this.props;

    if (!block) {
      return <div></div>;
    }

    const { height, timestamp } = block;

    return (
      <Card
        header={
          <header>
            <Box direction="row">
              <Box
                background="#012D5A"
                width="30px"
                height="30px"
                margin={{ right: "small" }}
                justify="center"
                align="center"
              >
                <Text color="#8096AD">BK</Text>
              </Box>

              <Box direction="column">
                <Text size="small">
                  <Anchor
                    href={`/block/${height}`}
                    label={`${height}`}
                    onClick={(event) => event.stopPropagation()}
                  />
                </Text>

                <Text size="xsmall" color="#aaa">
                  <i>
                    {console.info({timestamp},"block timestamp")}
                    <Age timestamp={timestamp} suffix="ago" />
                  </i>

                </Text>
              </Box>

              
              <Text
                    size="xsmall"
                    color="#F89D1C"
                    textAlign="center"
                    margin={{ left: "large" }}
                  >
                    {this.state.numberOfTransactions} txn
                    {this.state.numberOfTransactions > 1 ? "s" : ""}
                  </Text>

              <Text>
                {/* {active ? (
                    <Contract
                      style={{ cursor: "pointer" }}
                      onClick={this.toggleActiveState}
                      size="12px"
                      color="#777"
                    />
                  ) : (
                    <Expand
                      style={{ cursor: "pointer" }}
                      onClick={this.toggleActiveState}
                      size="12px"
                      color="#777"
                    />
                  )} */}
              </Text>
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
        <BlockDetails exclude={exclude} block={block} active={active} />
      </Card>
    );
  }

  toggleActiveState = (event) => {
    event.stopPropagation();
    const { active, setAsActiveBlock, unsetAsActiveBlock } = this.props;
    return active ? unsetAsActiveBlock() : setAsActiveBlock();
  };
}

export default BlockListItem;
