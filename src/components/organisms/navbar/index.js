import React, { Component } from 'react'
import { Grid, Box } from 'grommet'

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.customStyle = {
      background: props.background || "#1c2227",
      color: "#ddd",
    };
  }
  
  render() {
    return(
      <div className="navbar" style={this.customStyle}>
        <Grid
          columns={["flex", "flex"]}
          rows={["auto"]}
          areas={[
            { name: "brand", start: [0, 0], end: [0, 0] },
            { name: "nav", start: [1, 0], end: [1, 0] }
          ]}
          as="header"
        > 
          <Box gridArea="brand" pad={{ horizontal: "medium", vertical: "auto" }}>
            <h1 className="brand">Oneiro</h1>
          </Box>

          <Box gridArea="nav" pad={{ horizontal: "medium", vertical: "auto" }}>
            <p className="tabd=s">ndau</p>
          </Box>
        </Grid>
      </div>
    )
  }
}

export default Navbar