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
import { Box } from "grommet";
import moment from "moment";
import TimelineEvent from "../../molecules/timelineEvent";
import TimelineChart from "../../molecules/timelineChart";
import TimelineFilter from "../../organisms/timelineFilter";
import { getTransaction } from "../../../helpers/fetch";
import { TRANSACTION_TYPES } from "../../../constants";

// Default to show all transaction types
const DEFAULT_TYPE_FILTERS = Object.values(TRANSACTION_TYPES);

class AccountTimeline extends Component {
  constructor(props) {
    super(props);

    const { filterStartDate, filterEndDate } = this.getDateRange(3);
    this.state = {
      events: props.events,
      typeFilters: DEFAULT_TYPE_FILTERS,
      filterStartDate,
      filterEndDate,
      filterRange: "Last 3 months",
      selectedEvent: null,
      activeEvent: null,
    };

    this.filteredEvents = props.events;
  }

  render() {
    const { events, balance } = this.props;
    if (!events) {
      return null;
    }

    const {
      typeFilters,
      filterStartDate,
      filterEndDate,
      filterRange,
      selectedEvent,
      activeEvent,
    } = this.state;

    const filteredEvents = this.filterEvents() || events;
    const displayedEvents = selectedEvent ? [selectedEvent] : filteredEvents;
    const borderStyle = "1px dashed rgba(255,255,255,0.1)";

    return (
      <Box>
        {events.length > 1 && (
          <Box margin={{ bottom: "20px" }}>
            <TimelineChart
              events={[...events, this.initialEvent]}
              filteredEvents={filteredEvents}
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
            filteredEventsCount={filteredEvents && filteredEvents.length}
            typeFilters={typeFilters}
            selectFilterRange={this.selectFilterRange}
            setFilterRange={this.setFilterRange}
            toggleFilter={this.toggleFilter}
            selectedEvent={selectedEvent}
          />
        </Box>

        <Box onMouseLeave={this.clearActiveEvent}>
          {displayedEvents.map((event, index) => {
            const { activeEvent, selectedEvent } = this.state;
            const isActive = activeEvent && activeEvent.TxHash === event.TxHash;
            const isSelected =
              selectedEvent && selectedEvent.TxHash === event.TxHash;

            return (
              <Box key={index} onMouseEnter={() => this.setActiveEvent(event)}>
                <Box
                  round="xsmall"
                  style={{
                    border: isActive
                      ? "1px dashed rgba(255,255,255,0.3)"
                      : borderStyle,
                  }}
                  background="rgba(255,255,255,0.05)"
                >
                  <TimelineEvent
                    event={event}
                    previousEvent={this.getPreviousEvent(event)}
                    index={index}
                    selected={isSelected}
                  />
                </Box>

                {index !== events.length - 1 && (
                  <Box
                    alignSelf="center"
                    border="right"
                    height="20px"
                    width="0"
                    style={{ borderRight: borderStyle }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  componentDidUpdate = async (prevProps) => {
    const { events } = this.props;
    if (
      (!prevProps.events && this.props.events) ||
      JSON.stringify(events) !== JSON.stringify(prevProps.events)
    ) {
      await this.getEventTransactions();
    }
  };

  getPreviousEvent = (currentEvent) => {
    const { events } = this.props;
    const isFirstEvent =
      JSON.stringify(currentEvent) ===
      JSON.stringify(events[events.length - 1]);

    return isFirstEvent ? this.initialEvent : events[currentEvent.index + 1];
  };

  filterEvents = () => {
    const { events, typeFilters } = this.state;

    if (!events || events.length === 0 || events[0]===null) {
      console.log("return not events");
      return [];
    }

    const { filterStartDate, filterEndDate } = this.state;
    this.filteredEvents = events.filter((event) => {
      const eventDate = moment(event.Timestamp);
      const isWithinFilterRange =
        eventDate.isAfter(filterStartDate) && eventDate.isBefore(filterEndDate);
      const transactionType = event.transaction && event.transaction.raw.type;
      const isSelected =
        transactionType && typeFilters.includes(transactionType);

      return isWithinFilterRange && isSelected;
    });

    return this.filteredEvents;
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
