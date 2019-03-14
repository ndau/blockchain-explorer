import React, { Component } from 'react'
import { Box } from "grommet";

class Card extends Component {
  render() {
    const { 
      pad, round, background, header, children, style={}, onClick, 
    } = this.props;

    return (
      <Box
        pad={ pad || "medium" }
        margin="xsmall"
        background={{ color: background || "dark-1", opacity: "strong" }}
        round={ round || "xsmall" }
        style={style}
      > 
        <div onClick={onClick}>
          {header}
          {children}
        </div>
      </Box>
    );
  }
}

export default Card;