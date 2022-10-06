/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import UserContextProvider from "./context/context";
import { Grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import { dark as grommetDarkTheme } from "grommet/themes";
import Routes from "./Routes";
import "normalize.css";
import "./components/organisms/priceCurve/StatisticsPanel/WidgetBox/WidgetBox.css";
import "../src/"

const ndauStyleGuide = {
  global: {
    colors: {
      background: "#0a1724",
      text: {
        dark: "#fff",
        light: "#fff",
      },
    },
    drop: {
      background: "#132844",
      extend: {
        fontSize: "small",
      },
    },
    font: {
      family: "Titillium Web",
    },
    input: {
      weight: 500,
    },
    elevation: {
      dark: {
        none: "none",
        xsmall: "0px 1px 2px rgba(0, 0, 0, 0.20)",
        small: "0px 2px 4px rgba(0, 0, 0, 0.20)",
        medium: "0px 4px 8px rgba(0, 0, 0, 0.20)",
        large: "0px 8px 16px rgba(0, 0, 0, 0.20)",
        xlarge: "0px 12px 24px rgba(0, 0, 0, 0.20)",
      },
    },
  },
  anchor: {
    color: "#f99d1c",
  },

  checkBox: {
    color: {
      dark: "#f99d1c",
    },
    hover: {
      border: {
        color: null,
      },
    },
    toggle: {
      color: {
        dark: "#aaa",
      },
    },
    size: "18px",
  },
  formField: {
    error: {
      color: "#B25",
      size: "10px",
      margin: {
        vertical: "xxsmall",
      },
    },
  },
};

const ndauTheme = deepMerge(grommetDarkTheme, ndauStyleGuide);

function App(props) {
  return (
    <Grommet full theme={ndauTheme}>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </Grommet>
  );
}

export default App;
