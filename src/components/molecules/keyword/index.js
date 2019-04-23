import React, { Component } from 'react';
import { Drop, Text, Box, Anchor, ResponsiveContext, } from 'grommet';
import { Share } from 'grommet-icons'
import { KEYWORDS } from '../../../keywords'

class Keyword extends Component {
  constructor(props) {
    super(props);
    const formattedLabel = props.label
      .replace(/([^A-Z]*)([A-Z]*)([A-Z])([^A-Z]*)/g, '$1 $2 $3$4')
      .replace(/ +/g, ' ');

    this.label = formattedLabel[0].toUpperCase() + formattedLabel.slice(1);

    this.keywordDetails = KEYWORDS[props.keyword]

    this.state = {
      showExplanation: false,
    }

    this.ref = React.createRef();
  }

  render() {
    const { showExplanation } = this.state;
    const labelText = <Text weight="bold" >{this.label}</Text>
     
    if (!this.keywordDetails) {
      return labelText
    }

    const { endpoint, explanation } = this.keywordDetails;

    return (
      <Box style={{display: "inline-flex"}}>
        <Box
          ref={this.ref}
          onClick={() => this.setState({ showExplanation: true })}
          style={{borderBottom: "1px #f99d1c dashed"}}
        >
          <Text color={showExplanation ? "#ffe7c6" : "#fff"}>
            {labelText}
          </Text>
        </Box>



        <ResponsiveContext.Consumer>
          {
            viewPort => (
              
            this.ref.current && showExplanation && (
              <Drop
                align={{ top: "bottom" }}
                target={this.ref.current}
                plain
                onClickOutside={() => this.setState({ showExplanation: false })}
              >
                <Box
                  pad="15px"
                  background="rgba(255,255,255, 0.95)"
                  width={viewPort === 'small' ? "100vw" : "500px"}
                  round="xsmall"
                >
                  <Text color="#000">{explanation}</Text>
    
                  <Box pad={{top: "10px"}} align="center">     
                    <Anchor href={endpoint} target="_blank">
                      <Share size="18px" color="#f99d1c"/>
                    </Anchor>
                  </Box>
                </Box>
              </Drop>
            )
            )
          }
        </ResponsiveContext.Consumer>
      </Box>
    );
  }
}

export default Keyword;
