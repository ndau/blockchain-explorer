import React, { Component } from 'react'
import { Grid, Box } from 'grommet'
import Navbar from '../../organisms/navbar'

class Main extends Component {
  render() {
    return(
      <main>
          <Grid
            columns={["flex"]}
            rows={["auto", "flex", "auto"]}
            areas={[
              { name: "header", start: [0, 0], end: [0, 0] },
              { name: "main", start: [0, 1], end: [0, 1] },
              { name: "footer", start: [0, 2], end: [0, 2] },
            ]}
            fill
          >
            <Box gridArea="header">
              <Navbar />
            </Box>
          
            {/* TODO: Back button */}

            <Box gridArea="main" pad={{ horizontal: "medium", vertical: "medium" }}>
              {this.props.children}
            </Box>

            <Box gridArea="footer">
            </Box>
          </Grid>
      </main>
    );
  }
}

export default Main