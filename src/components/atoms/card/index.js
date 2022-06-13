/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from 'react'
import { Box } from "grommet";

class Card extends Component {
  render() {
    const { 
      pad, 
      round, 
      background, 
      header, 
      children, 
      style={}, 
      onClick, 
      animation, 
      margin, 
      elevation,
      border
    } = this.props;

    return (
      <Box
        pad={pad}
        background={{ color: background || "transparent", opacity: "strong" }}
        round={round || "xsmall"}
        margin={margin}
        style={style}
        onClick={onClick}
        elevation={elevation}
        animation={animation}
        border={border}
      >
        {header}
        {children}
      </Box>
    );
  }
}

export default Card;
