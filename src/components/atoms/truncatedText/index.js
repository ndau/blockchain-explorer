import React, { Component } from 'react'
import { Drop, Box, Text, ResponsiveContext, TextArea, Button } from 'grommet'
import { Copy } from 'grommet-icons'
import { truncate } from '../../../helpers'

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
    const { showFullWord } = this.state

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
                <Text 
                  className={className} 
                  style={{display: "inline"}} 
                  color={showFullWord ? "#ffe7c6" : ""}
                >
                  {truncate(value)}
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
                    >
                      <Box align="center" onClick={this.copyToClipboard} >
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
                            lineHeight: '14px',
                            fontSize: "16px",
                            fontWeight: "normal",
                            resize: "none",
                            textAlign: "center",
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
}

export default TruncatedText;