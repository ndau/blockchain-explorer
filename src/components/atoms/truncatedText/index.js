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
import { 
  Drop, Box, Text, ResponsiveContext, TextArea, Stack
} from 'grommet'
import { Copy } from 'grommet-icons'
import { truncate } from '../../../helpers'

class TruncatedText extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showFullWord: false
    }
    
    this.truncatedWord = this.truncateWord()
    this.ref = React.createRef();
    this.fullWord = React.createRef();
  }

  render() {
    const  { value, className, size="medium",weight } = this.props
    const { showFullWord } = this.state
    
    return (
      <ResponsiveContext.Consumer>
          {
            width => (
              width === "small" && this.truncatedWord ? 
              <Box 
                onClick={(event)=> {
                  event.stopPropagation();
                  this.setFullWordState(true)
                }} 
                ref={this.ref}
                style={{display: "inline-flex"}}
              >
                <Text 
                  className={className} 
                  style={{display: "inline"}} 
                  color={showFullWord ? "#ffe7c6" : ""}
                  size={size}
                >
                  {this.truncatedWord}
                </Text>

                {
                  this.ref.current && showFullWord && (
                  <Drop
                    align={{ top: "bottom" }}
                    target={this.ref.current}
                    plain
                    onClickOutside={this.setFullWordState}
                  >
                    <Box
                      pad="15px"
                      background="rgba(255,255,255, 0.95)"
                      width="100vw"
                      round="xsmall"
                      onClick={this.copyToClipboard}
                    >
                        <Stack interactiveChild="last" fill >
                          <TextArea 
                            value={value}
                            plain
                            ref={this.fullWord}
                            onChange={()=>{}}
                            focusIndicator={false}
                            spellCheck={false}
                            color="#444"
                            fill
                            style={{
                              padding: 0,
                              fontSize: "medium",
                              color: "black",
                              fontWeight: "normal",
                              resize: "none",
                              textAlign: "center",
                            }}
                          /> 
                          <Box fill onClick={event => event.stopPropagation()}></Box>
                        </Stack>
                         
                        <Box align="center">
                          <Copy size="18px" color="#f99d1c" style={{ cursor: "pointer" }}/> 
                        </Box>
                      </Box>
                  </Drop>
                )}
              </Box>
              : 
              <Text className={className} style={{wordWrap: "break-word"}} weight={weight}>
                {value.toUpperCase()}
              </Text>
            )
          }
      </ResponsiveContext.Consumer>
    );
  }

  copyToClipboard = event => {
    event.stopPropagation();
    this.fullWord.current.select();
    document.execCommand('copy');
  };

  toggleFullWordState = (event) => {
    event.stopPropagation();
    this.setState(({showFullWord}) => {
      return {
        showFullWord: showFullWord ? false : true
      }
    })
  }

  setFullWordState = (bool) => {
    this.setState({ showFullWord: bool })
  }

  truncateWord = () => {
    const { value, maxLength } = this.props
    if (typeof value !== "string" || (value.indexOf(" ") !== -1) || (!isNaN(new Date(value).getDate()))) {
      return null
    }
    return truncate(value, maxLength)
  }
}

export default TruncatedText;
