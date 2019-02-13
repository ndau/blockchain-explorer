import React, { Component } from 'react'
import { Grid, Box } from 'grommet'
import Navbar from '../../organisms/navbar'
import style from './style.css'

class Dashboard extends Component {
  render() {
    const { topLeft, topRight, bottom, browserHistory, selectNode } = this.props;
    return(
      <Box as="main" className={style.dashboard}>
        <Grid
          fill
          columns={["flex", "flex"]}
          rows={["auto", "auto", "flex"]}
          areas={[
            { name: "header", start: [0, 0], end: [1, 0] },
            { name: "topLeft", start: [0, 1], end: [0, 1] },
            { name: "topRight", start: [1, 1], end: [1, 1] },
            { name: "bottom", start: [0, 2], end: [1, 2] },
          ]}
        >
          <Box gridArea="header">
            <Navbar
              browserHistory={browserHistory}
              selectNode={selectNode}
            />
          </Box>
          <Box gridArea="topLeft" pad={{ horizontal: "medium", vertical: "medium" }}>
            {topLeft}
          </Box>
          <Box gridArea="topRight" pad={{ horizontal: "medium", vertical: "medium" }}>
            {topRight}
          </Box>
          <Box gridArea="bottom" pad={{ horizontal: "medium", vertical: "medium" }}>
            {bottom}
          </Box>
        </Grid>
      </Box>
    );
  }
}

export default Dashboard