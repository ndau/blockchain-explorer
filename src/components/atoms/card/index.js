import React, { Component } from 'react'
import { Box } from "grommet";

class Card extends Component {
  render() {
    const { 
      pad, round, background, header, children, style={}, onClick, animation, margin 
    } = this.props;

    return (
      <Box
        pad={pad}
        background={{ color: background || "transparent", opacity: "strong" }}
        round={round || "xsmall"}
        margin={margin}
        style={style}
        onClick={onClick}
        animation={animation}
      >
        {header}
        {children}
      </Box>
    );
  }
}

export default Card;