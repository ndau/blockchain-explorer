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
import { Calendar } from "grommet";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./styles.css";
import { addDays } from "date-fns";
import { DateRangePicker as ReactDateRangePicker } from "react-date-range";

class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    const { startDate, endDate } = this.props;
    console.log(startDate, "startDateProps");
    console.log(endDate, "endDateProps");

    this.state = {
      date: new Date().toISOString(),
      dates: null,
      open: null,
      startDate: startDate,
      endDate: endDate,
      rangeState:
        startDate && endDate
          ? [
              {
                startDate: startDate.toDate(),
                endDate: endDate.toDate(),
                key: "selection",
              },
            ]
          : [
              {
                startDate: new Date(),
                endDate: addDays(new Date(), 7),
                key: "selection",
              },
            ],
    };
  }

  render() {
    return (
      <>
        <ReactDateRangePicker
          onChange={(item) => {
            this.onSelect(item.selection);
          }}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={this.state.rangeState}
          direction="horizontal"
          preventSnapRefocus={true}
          calendarFocus="backwards"
        />
      </>
    );
  }

  componentDidUpdate(prevProps) {
    const { startDate, endDate } = this.props;
    if (startDate !== prevProps.startDate || endDate !== prevProps.endDate) {
      this.setState({
        rangeState:
          [
            {
              startDate: startDate.toDate(),
              endDate: endDate.toDate(),
              key: "selection",
            },
          ]
        
      });
    }
  }

  onSelect = (arg) => {
    this.setState({ rangeState: [arg] });
    console.log(arg.startDate, "arg.startDate");
    this.props.onSetRange({ startDate: arg.startDate, endDate: arg.endDate });

    // if (Array.isArray(arg)) {
    //   this.setState(
    //     {
    //       dates: arg,
    //       date: null,
    //     },
    //     () => {
    //       this.props.onSetRange({
    //         startDate: arg[0][0],
    //         endDate: arg[0][1],
    //       });
    //     }
    //   );
    // } else {
    //   this.setState(
    //     {
    //       dates: null,
    //       date: arg,
    //     },
    //     () => {
    //       this.props.onSetRange({
    //         startDate: arg,
    //         endDate: arg,
    //       });
    //     }
    //   );
    // }
  };
}

export default DateRangePicker;
