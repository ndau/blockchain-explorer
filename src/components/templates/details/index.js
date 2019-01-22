import React, { Component } from 'react'
import { Grid, Box } from 'grommet'
import Navbar from '../../organisms/navbar'

import style from './style.css'

class DetailsCard extends Component{
  render() {
    const { data } = this.props;
    if (!data) {
      return <h3>Loading...</h3>;
    }
    
    return (
      <div>
        {
          Object.keys(data).map((property, i) => {
            return (
            <div key={i}>
              <b>{property}:</b> <span>{data[property]}</span>
            </div>
          )})
        }
      </div>
    )
  }
} 

class Details extends Component {
  render() {
    const { data } = this.props;
    return(
      <main className={style.dashboard}>
          <Grid
            columns={["flex", "flex"]}
            rows={["auto", "flex"]}
            areas={[
              { name: "header", start: [0, 0], end: [1, 0] },
              { name: "details", start: [0, 1], end: [0, 1] },
              { name: "subDetails", start: [1, 1], end: [1, 1] },
            ]}
            fill
          >
            <Box gridArea="header">
              <Navbar />
            </Box>
          
            {/* TODO: Back button */}

            <Box gridArea="details" pad={{ horizontal: "medium", vertical: "medium" }}>
              <h3>Block {data && data.height}</h3>
              <DetailsCard data={this.props.data} />
            </Box>
            <Box gridArea="subDetails" pad={{ horizontal: "medium", vertical: "medium" }}>
              {/* <DetailsCard data={this.props.data} /> */}
            </Box>
          </Grid>
      </main>
    );
  }
}

export default Details