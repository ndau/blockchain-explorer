import React, { Component } from 'react'
import Navbar from '../../organisms/navbar'
import Container from '../../atoms/container'

import style from './style.css'

class Dashboard extends Component {
  
  render() {
    return(
      <div className={style.dashboard}>
        <Navbar />

        <Container>
          {/* TEMP */}
          <h1>...dashboard content</h1>
          {/* TEMP. */}
        </Container>
      </div>
    );
  }
}

export default Dashboard