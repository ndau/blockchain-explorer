import React, { Component } from 'react'
import Container from '../../atoms/container'
import Grid from '../../atoms/grid'
import Column from '../../atoms/column'

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.customStyle = {
      background: props.background || "#777",
    };
  }
  

  render() {
    return(
      <div className="navbar" style={this.customStyle}>
        <Container>
          <Grid>
            <Column start="1" end="span 2">
              <h1 className="brand">Oneiro</h1>
            </Column>

            <Column start="span 1" end="13">
              <h2 className="brand">ndau</h2>
            </Column>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default Navbar