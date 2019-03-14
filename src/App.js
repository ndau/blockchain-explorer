import React, { Component } from 'react';
import { Grommet } from 'grommet';
import { deepMerge } from "grommet/utils";
import {  dark as grommetDarkTheme } from 'grommet/themes';
import routes from './routes'

const ndauStyleGuide = {
  global: {
    colors: {
      background: "#0a1724",  // "#0f2748", 
    },
    drop: {
      background: "#132844",
      shadowSize: 'xxsmall',
    },
    font: {
      family: "Titillium Web",
    },
    input: {
      weight: 500,
    },
  },
  anchor: {
    color: "#f99d1c",
  },
  checkBox: {
    color: {
      dark: "#f99d1c"
    },
    hover: {
      border: {
        color: null
      }
    },
    toggle: {
      color: {
        dark: "#aaa"
      }
    },
    size: "18px"
  }
}

const ndauTheme = deepMerge(grommetDarkTheme, ndauStyleGuide);

class App extends Component {
  render() {
    return (
      <Grommet full theme={ndauTheme}>
        {routes}
      </Grommet>
    );
  }
}

export default App;
