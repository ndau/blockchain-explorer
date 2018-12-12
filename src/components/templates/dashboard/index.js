import React, { Component } from 'react'
import { Grid, Box } from 'grommet'
import Navbar from '../../organisms/navbar'
// import Container from '../../atoms/container'

import style from './style.css'

class Dashboard extends Component {
  render() {
    return(
      <div className={style.dashboard}>
          <Grid
            columns={["flex", "flex"]}
            rows={["auto", "flex"]}
            areas={[
              { name: "header", start: [0, 0], end: [1, 0] },
              { name: "main", start: [0, 1], end: [1, 1] }
            ]}
            background="#555"
          >
            <Box gridArea="header">
              <Navbar />
            </Box>

            <Box gridArea="main" pad={{ horizontal: "medium", vertical: "medium" }}>
              {/* TEMP */}
              <h1>...dashboard content</h1>
              {/* TEMP. */}
            </Box>
          </Grid>
      </div>
    );
  }
}

export default Dashboard