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
    const  { value, className } = this.props
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
                    >
                      <Box align="center" onClick={this.copyToClipboard}>
                        <Stack fill>
                          <TextArea 
                            value={value}
                            size="small"
                            plain
                            fill
                            ref={this.fullWord}
                            resize="vertical"
                            onChange={()=>{}}
                            spellCheck={false}
                            style={{
                              padding: 0,
                              lineHeight: '18px',
                              fontSize: "16px",
                              fontWeight: "normal",
                              resize: "none",
                              textAlign: "center",
                            }}
                          /> 
                          <Box height="100%" fill></Box>
                        </Stack>
                         
                      </Box>
                      <Box 
                        align="center" 
                        onClick={this.copyToClipboard}
                      >
                        <Box style={{ cursor: "pointer" }}>
                          <Copy size="18px" color="#f99d1c"/>
                        </Box>
                      </Box>
                    </Box>
                  </Drop>
                )}
              </Box>
              : 
              <Text className={className} style={{wordWrap: "break-word"}}>
                {value}
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
    event.target.focus();

    this.setState({ copied: true });
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
    const { value } = this.props
    if ((typeof value !== "string") || (value.indexOf(" ") !== -1) || (!isNaN(new Date(value).getDate()))) {
      return null
    }
    return truncate(value)
  }
}

export default TruncatedText;