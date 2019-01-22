import React, { Component } from 'react';
import { Grommet } from 'grommet';
import {  dark as grommetDarkTheme } from 'grommet/themes';
import routes from './routes'

class App extends Component {
  render() {
    return (
      <Grommet full theme={grommetDarkTheme}>
        {routes}
      </Grommet>
    );
  }
}

export default App;
