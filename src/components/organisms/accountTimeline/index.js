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
import { Box, Spinner } from "grommet";
import moment from "moment";
import TimelineChart from "../../molecules/timelineChart";
import TimelineFilter from "../../organisms/timelineFilter";
import { getTransaction } from "../../../helpers/fetch";
import { TRANSACTION_TYPES } from "../../../constants";

import PaginatedEvents from "./PaginatedEvents";

// Default to show all transaction types
const DEFAULT_TYPE_FILTERS = Object.values(TRANSACTION_TYPES);

class AccountTimeline extends Component {
  constructor(props) {
    super(props);
    const { filterStartDate, filterEndDate } = this.getDateRange(1);
    this.state = {
      typeFilters: DEFAULT_TYPE_FILTERS,
      filterStartDate,
      filterEndDate,
      filterRange: "Last month",
      selectedEvent: null,
      activeEvent: null,
      displayedEventsState: null,
      getAccountData: props.getAccountData,
      filteredEventsState: [],
    };
  }

  filterEvents = (givenEvents) => {
    if (!givenEvents || givenEvents.length === 0 || givenEvents[0] === null) {
      return [];
    }

    const { filterStartDate, filterEndDate } = this.state;

    const filteredEventsTemp = givenEvents.filter((event) => {
      const eventDate = moment(event.Timestamp);
      const isWithinFilterRange =
        eventDate.isAfter(filterStartDate) && eventDate.isBefore(filterEndDate);

      return isWithinFilterRange;
    });

    return filteredEventsTemp;
  };

  render() {
    const { events, balance, getAccountData,isOldestInRangeFirstEntry } = this.props;

    const {
      typeFilters,
      filterStartDate,
      filterEndDate,
      filterRange,
      selectedEvent,
      activeEvent,
    } = this.state;

    return (
      <Box>
        {this.state.filteredEventsState.length > 1 && (
          <Box margin={{ bottom: "20px" }}>
            <TimelineChart
              events={[this.state.filteredEventsState, this.initialEvent]}
              filteredEvents={this.state.filteredEventsState || events}
              balance={balance}
              selectedEvent={selectedEvent}
              activeEvent={activeEvent}
              toggleSelectedEvent={this.toggleSelectedEvent}
            />
          </Box>
        )}

        <Box>
          <TimelineFilter
            events={events}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            filterRange={filterRange}
            filteredEventsCount={this.state.events && this.state.events.length}
            typeFilters={typeFilters}
            selectFilterRange={this.selectFilterRange}
            setFilterRange={this.setFilterRange}
            toggleFilter={this.toggleFilter}
            selectedEvent={selectedEvent}
            getAccountData={getAccountData}
            loading={this.props.loading}
          />
        </Box>
        {!this.props.loading ? (
          <Box onMouseLeave={this.clearActiveEvent}>
            <PaginatedEvents
              itemsPerPage={10}
              totalEventsToDisplay={this.state.filteredEventsState}
              isOldestInRangeFirstEntry={isOldestInRangeFirstEntry}
            />
          </Box>
        ) : (
          <Box align="center">
            <Spinner size="small" color="#F29A1D" />
          </Box>
        )}
      </Box>
    );
  }

  componentDidMount() {
    const filteredEventsDidMount = this.filterEvents(this.props.events);
    this.setState({ filteredEventsState: filteredEventsDidMount });
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
     
      const newEventsFiltered = this.filterEvents(this.props.events);
      this.setState({ filteredEventsState: newEventsFiltered });
    } else {
     
    }
  }

  getPreviousEvent = (currentEvent) => {
    const { events } = this.props;
    const isFirstEvent =
      JSON.stringify(currentEvent) ===
      JSON.stringify(events[events.length - 1]);

    return isFirstEvent ? this.initialEvent : events[currentEvent.index + 1];
  };

  getDateRange = (numberOfMonths) => {
    return {
      filterStartDate: moment(new Date()).subtract(numberOfMonths, "months"),
      filterEndDate: moment(new Date()),
    };
  };

  selectFilterRange = (numberOfMonths, filterRange) => {
    const { filterStartDate, filterEndDate } =
      this.getDateRange(numberOfMonths);

   
   
   
    this.props.getAccountData(
      filterStartDate.toISOString(),
      filterEndDate.toISOString()
    );

    this.setState({
      filterStartDate,
      filterEndDate,
      filterRange,
    });
  };

  setFilterRange = ({ startDate, endDate }) => {
    this.setState({
      filterStartDate: moment(startDate),
      filterEndDate: moment(endDate),
    });
  };

  getTransactionEvent = (event, index) => {
    return getTransaction(event.TxHash).then((transaction) => {
      event.transaction = transaction;
      event.index = index;

      return event;
    });
  };

  getEventTransactions = async () => {
    const { events } = this.props;

    await Promise.all(
      events.map((event, index) => this.getTransactionEvent(event, index))
    ).then((results) => {
      this.setState({ events: results });
    });
  };

  toggleFilter = (type) => {
    const { typeFilters } = this.state;
    let newTypeFilters = typeFilters;
    if (!typeFilters.includes(type)) {
      newTypeFilters = [...typeFilters, type];
    } else {
      newTypeFilters = [...typeFilters].filter((filter) => filter !== type);
    }

    this.setState({
      typeFilters: newTypeFilters,
    });
  };

  toggleSelectedEvent = (event) => {
    if (!event) {
      return;
    }

    this.setState(({ selectedEvent }) => {
      const newSelectedEvent =
        selectedEvent && selectedEvent.TxHash === event.TxHash ? null : event;
      return {
        selectedEvent: newSelectedEvent,
        activeEvent: newSelectedEvent,
      };
    });
  };

  setActiveEvent = (event) => {
    this.setState({ activeEvent: event });
  };

  clearActiveEvent = () => {
    this.setState({ activeEvent: null });
  };

  initialEvent = {
    Balance: 0,
  };
}

export default AccountTimeline;
