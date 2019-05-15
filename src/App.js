import React, { Component } from 'react';
import { Grommet } from 'grommet';
import { deepMerge } from "grommet/utils";
import {  dark as grommetDarkTheme } from 'grommet/themes';
import routes from './routes'

const ndauStyleGuide = {
  global: {
    colors: {
      background: "#0a1724", 
      text: {
        dark: '#fff',
        light: '#fff',
      }
    },
    drop: {
      background: "#132844",
      extend: {
        fontSize: "small"
      }
    },
    font: {
      family: "Titillium Web",
    },
    input: {
      weight: 500,
    },
    elevation: {
      dark: {
        none: 'none',
        xsmall: '0px 1px 2px rgba(0, 0, 0, 0.20)',
        small: '0px 2px 4px rgba(0, 0, 0, 0.20)',
        medium: '0px 4px 8px rgba(0, 0, 0, 0.20)',
        large: '0px 8px 16px rgba(0, 0, 0, 0.20)',
        xlarge: '0px 12px 24px rgba(0, 0, 0, 0.20)',
      },
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
