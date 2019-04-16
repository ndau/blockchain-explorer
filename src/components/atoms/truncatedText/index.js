import React, { Component } from 'react'
import { Drop, Box, Text, ResponsiveContext, TextArea, Button } from 'grommet'
import { Copy } from 'grommet-icons'

class TruncatedText extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showFullWord: false
    }

    this.ref = React.createRef();
    this.fullWord = React.createRef();
  }

  render() {
    const  { value, className } = this.props
    return (
      <ResponsiveContext.Consumer>
          {
            width => (
              width === "small" ? 
              <Box 
                onClick={(event)=> {
                  event.stopPropagation();
                  this.setFullWordState(true)
                }} 
                ref={this.ref}
                style={{display: "inline-flex"}}
              >
                <Text className={className} style={{display: "inline"}}>
                  {this.truncate(value)}
                </Text>

                {
                  this.ref.current && this.state.showFullWord && (
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
                    >
                      {/* <Text color="#000" style={{wordWrap: "break-word", width: "100%"}} alignSelf="center"> */}
                      <Box align="center" onClick={this.copyToClipboard} >
                        <TextArea 
                          value={value}
                          size="small"
                          plain
                          fill
                          ref={this.fullWord}
                          resize="vertical"
                          onChange={()=>{}}
                          style={{
                            padding: 0,
                            lineHeight: '14px',
                            fontSize: "16px",
                            fontWeight: "normal",
                            resize: "none",
                            textAlign: "center"
                          }}
                        />
                          
                      </Box>
                      <Box 
                        pad={{vertical: "3px", horizontal: "5px"}} 
                        align="center" 
                        onClick={this.copyToClipboard} 
                        round
                      >
                        <Button
                          icon={<Copy size="18px" color="#f99d1c"/>}
                          style={{ padding: 0 }}
                        />
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
 
  truncate = (value) => { 
    if (!value || (typeof value === 'object' && !Array.isArray(value)) || !isNaN(Date.parse(value))) {
      return value
    }

    const text = Array.isArray(value) ? 
      value.find(item => typeof item === 'string') : value;

    if (!text || text.length < 17 || !isNaN(Date.parse(value))) {
      return text
    }

    const length = text.length;
    return `${text.slice(0, 8)}...${text.slice(length - 8, length)}`
  }
}

export default TruncatedText;