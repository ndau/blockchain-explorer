import React, { Component } from 'react'
import { Box } from 'grommet'
import Navbar from '../../organisms/navbar'

import style from './style.css'

class Details extends Component {
  render() {
    return(
      // <main >
      <Box className={style.dashboard}
        // columns={["flex"]}
        // rows={["auto", "flex"]}
        // areas={[
        //   { name: "header", start: [0, 0], end: [0, 0] },
        //   { name: "details", start: [1, 0], end: [1, 0] },
        // ]}
        // fill
      >
        <Box gridArea="header">
          <Navbar selectNode={this.props.selectNode} />
        </Box>
      
        {/* TODO: Back button */}

        <Box gridArea="details" pad={{ horizontal: "medium", vertical: "large" }}>
          {this.props.children}
        </Box>
      </Box>
      // </main>
    );
  }
}

export default Details