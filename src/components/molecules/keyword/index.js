import React, { Component } from 'react';
import { Drop, Text, Box } from 'grommet';
import { KEYWORDS } from '../../../keywords'

class Keyword extends Component {
  constructor(props) {
    super(props);
    const formattedLabel = props.label
      .replace(/([^A-Z]*)([A-Z]*)([A-Z])([^A-Z]*)/g, '$1 $2 $3$4')
      .replace(/ +/g, ' ');

    this.label = formattedLabel[0].toUpperCase() + formattedLabel.slice(1);


    this.ref = React.createRef();
    this.explanation = KEYWORDS[props.keyword]

    this.state = {
      showExplanation: false,
    }
  }

  render() {
    const { showExplanation } = this.state;
    const labelText = <Text weight="bold" >{this.label}</Text>
     
    if (!this.explanation) {
      return labelText
    }

    return (
      <Box style={{display: "inline-flex"}}>
        <Box
          ref={this.ref}
          onMouseOver={() => this.setState({ showExplanation: true })}
          onMouseOut={() => this.setState({ showExplanation: false })}
          style={{borderBottom: "2px #f99d1c dashed"}}
        >
          {labelText}
        </Box>
        {
          this.ref.current && showExplanation && (
          <Drop
            align={{ top: "bottom" }}
            target={this.ref.current}
            plain
          >
            <Box
              pad="small"
              background="rgba(255,255,255, 0.95)"
              width="400px"
            >
              <Text color="#000">{this.explanation}</Text>
            </Box>
          </Drop>
        )}
        
      </Box>
    );
  }
}

export default Keyword;
