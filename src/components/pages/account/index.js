/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import FavouriteButton from "../../organisms/FavouriteButton/FavouriteButton";
import React, { Component } from "react";
import { Box, Text, Collapsible, CheckBox, Spinner, Button } from "grommet";
import Details from "../../templates/details";
import DetailsCard from "../../molecules/detailsCard";
import AccountTimeline from "../../organisms/accountTimeline";
import { getAccount, getAccountHistory } from "../../../helpers/fetch";

class Account extends Component {
  displaystring;
  constructor(props) {
    super(props);

    this.state = {
      account: {},
      history: 0,
      hideDetails: false,
      valid: false,
      loading: false,
    };
  }

  render() {
    const { account, history, hideDetails } = this.state;
    const showDetails = !hideDetails;

    console.log(this.state, "State");

    return (
      <Details browserHistory={this.props.history} notFound={!account}>
        {/* {true ? ( */}
        {this.state.account ? (
          <>
            <Box margin={{ bottom: "20px" }}>
              <Text size="large">
                {/* hide empty toggle is not fully functional */}

                <Text size="large">
                  Account{" "}
                  <Text
                    weight="bold"
                    as="em"
                    style={{ wordWrap: "break-word" }}
                  >
                    {account && account.address}
                  </Text>
                  {account && (
                    <FavouriteButton
                      bookmarkVal={account.address}
                      bookmarkType="account"
                    />
                  )}
                  <Text
                    size="xsmall"
                    color="#aaa"
                    weight="normal"
                    style={{ float: "right" }}
                  >
                    <CheckBox
                      toggle
                      checked={hideDetails}
                      label="hide details"
                      onChange={this.toggleShowDetails}
                      reverse
                      name="small"
                    />
                  </Text>
                </Text>
              </Text>
            </Box>

            <Collapsible open={showDetails}>
              <Box
                animation={
                  showDetails
                    ? "fadeIn"
                    : {
                        type: "fadeOut",
                        delay: 0,
                        duration: 100,
                      }
                }
              >
                {/* ACCOUNT DETAILS */}
                <DetailsCard data={account} keywordMap={this.keywordMap} />
              </Box>
            </Collapsible>

            <Box animation="fadeIn">
              <Text>
                <b>History{showDetails && ":"}</b>
              </Text>
            </Box>
            <Box
              style={
                showDetails
                  ? {
                      margin:
                        "10pndapcbexsq2zh9i7m2ze3rqr5wzp8fb2jvqw2zsh5nufbct5x 0px 0px 15px",
                      paddingLeft: "11px",
                      borderLeft: "1px solid rgba(255,255, 255, 0.3)",
                    }
                  : {}
              }
            >
              <AccountTimeline
                events={history && [...history].reverse()}
                balance={account && account.balance}
                fill={hideDetails}
                getAccountData={this.getData}
                loading={this.state.loading}
                setLoadingTrueFunc={this.setLoadingTrue}
                setLoadingFalseFunc={this.setLoadingFalse}
              />
            </Box>
          </>
        ) : this.state.history === 0 ? (
          <Box align="center">
            <Spinner size="medium" color="#F29A1D" />
          </Box>
        ) : (
          "All else"
        )}
      </Details>
    );
  }

  setLoadingTrue = () => {
    this.setState({ loading: true });
  };

  setLoadingFalse = () => {
    this.setState({ loading: false });
  };

  getData = (fromDate, toDate) => {
    this.setState({ loading: true });

    const { accountAddress: address } = this.props.match.params;

    getAccount(address)
      .then((account) => {
        this.setState({ account });

        return account && account.address;
      })
      .then((address) => {
        if (!address) {
          this.setState({ loading: false });
          return;
        }

        getAccountHistory(address, fromDate, toDate).then((history) => {
          console.log(history, "history");
          console.log(this.state.account, "this.state.account");

          if ((history && history.length === 0) || history[0] === null) {
            this.setState({
              history: null,
              valid: true,
              loading: false,
            });
            return;
          }

          this.setState({
            history,
            loading: false,
            valid: history.length ? true : false,
          });

          return;
        });
      });
  };

  componentDidMount() {
    this.getData();
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

  toggleShowDetails = () => {
    this.setState(({ hideDetails }) => {
      return { hideDetails: !hideDetails };
    });
  };

  keywordMap = {
    address: "address",
    balance: "balance",
    currencySeatDate: "currencySeat",
    delegationNode: "node",
    incomingRewardsFrom: "rewards",
    lastEAIUpdate: "EAI",
    lastWAAUpdate: "WAA",
    lock: "lock",
    rewardsTarget: "reward",
    sequence: "sequence",
    recourseSettings: "recourse",
    holds: "recourse",
    stake: "stake",
    validationKeys: "validationKey",
    validationScript: "validationScript",
    weightedAverageAge: "WAA",
  };
}

export default Account;
