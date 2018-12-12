import React, { Component } from 'react';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import NdauDashboard from './components/pages/ndauDashboard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grommet theme={grommet}>
          <NdauDashboard />
        </Grommet>
      </div>
    );
  }
}

export default App;
