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
import { Box, Text, Button } from "grommet";
import { StatusGood, Radial } from "grommet-icons";
import DateRangePicker from "../../molecules/dateRangePicker";
import { TRANSACTION_TYPES } from "../../../constants";

class Filters extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      typeFilters,
      filterStartDate,
      filterEndDate,
      filterRange,
      selectFilterRange,
      setFilterRange,
      toggleFilter,
      showFilters,
      noDateFilter,
      getAccountData,
    } = this.props;

    const transanctionTypes = Object.values(TRANSACTION_TYPES);
    //
    const unselectedTypes = transanctionTypes.filter(
      (filter) => !typeFilters.includes(filter)
    );
    const sortedTransanctionTypes = [...typeFilters, ...unselectedTypes];

    const daterangeFilters = !noDateFilter && [
      {
        label: "Last month",
        onClick: () => selectFilterRange(1, "Last month"),
      },
      {
        label: "Last 3 months",
        onClick: () => selectFilterRange(3, "Last 3 months"),
      },
      {
        label: "Last 6 months",
        onClick: () => selectFilterRange(6, "Last 6 months"),
      },
      {
        label: "Last year",
        onClick: () => selectFilterRange(12, "Last year"),
      },
    ];

    return (
      <Box
        style={{
          background: "rgba(255,255,255, 0.03)",
          visibility: showFilters ? "visible" : "hidden",
          transition: "visibilty 0.2s",
        }}
        align="center"
        width="100%"
        margin={{ bottom: "medium" }}
        pad={{ vertical: "medium" }}
        round="small"
      >
        <Box>
          {!noDateFilter && (
            <Box>
              <Box
                width="100%"
                style={{ borderBottom: "1px solid rgba(255,255,255, 0.3)" }}
              >
                <Text
                  size="xsmall"
                  alignSelf="end"
                  color="rgba(255,255,255, 0.5)"
                >
                  filter by date
                </Text>
              </Box>

              <Box pad={{ bottom: "medium" }}>
                <DateRangePicker
                  startDate={filterStartDate}
                  endDate={filterEndDate}
                  onSetRange={setFilterRange}
                  getAccountData={getAccountData}
                />
              </Box>
            </Box>
          )}

          <Box>
            {!noDateFilter &&
              daterangeFilters.map(({ label, onClick }, index) => {
                const IsSelected = filterRange === label;

                return (
                  <Box
                    key={index}
                    onClick={onClick}
                    direction="row"
                    justify="between"
                  >
                    <Text style={{ lineHeight: "18px", justifySelf: "center" }}>
                      {IsSelected ? (
                        <StatusGood size="18px" />
                      ) : (
                        <Radial color="#ccc" size="18px" />
                      )}
                      <Text size="small" margin={{ left: "xsmall" }}>
                        {label}
                      </Text>
                    </Text>
                  </Box>
                );
              })}

            <Box margin={{ bottom: "15px" }}>
              <Box
                width="100%"
                style={{ borderBottom: "1px solid rgba(255,255,255, 0.3)" }}
              >
                <Text
                  size="xsmall"
                  alignSelf="end"
                  color="rgba(255,255,255, 0.5)"
                >
                  filter by type
                </Text>
              </Box>
            </Box>

            {sortedTransanctionTypes.map((type, index) => {
              const IsSelected = typeFilters.includes(type);

              return (
                <Box key={index} onClick={() => toggleFilter(type)}>
                  <Text>
                    {IsSelected ? (
                      <StatusGood size="18px" />
                    ) : (
                      <Radial color="#ccc" size="18px" />
                    )}
                    <Text size="small" margin={{ left: "xsmall" }}>
                      {type && type.replace(/([a-z])([A-Z])/g, "$1 $2")}
                    </Text>
                  </Text>
                </Box>
              );
            })}

            <Box width="medium" alignSelf="center" margin={{ top: "medium" }}>
              <Button
                primary
                label="Filter by Type"
                onClick={this.openFilteredTransactionsInNewTab}
                disabled={this.props.loading}
                fill={true}
              ></Button>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  saveUnfilteredEventsInLocalStorage = () => {
    localStorage.setItem("unfilteredEvents", JSON.stringify(this.props.events));
  };

  saveTypeFiltersInLocalStorage = () => {
    localStorage.setItem("typeFilters", this.props.typeFilters);
  };

  openFilteredTransactionsInNewTab = () => {
    this.saveTypeFiltersInLocalStorage();
    this.saveUnfilteredEventsInLocalStorage();
    window.open("http://ec2-54-183-55-233.us-west-1.compute.amazonaws.com/filteredTransactions", "_blank");
  };

}

export default Filters;
