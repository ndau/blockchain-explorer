import React, { Component } from 'react'
import { Box, TextInput } from 'grommet'
import { validateEndpoint } from '../../../helpers'

class SuggestionsInput extends Component {
  state = { value: "", valid: null };

  render() {
    const { value } = this.state;
    const { suggestions } = this.props
    return (
        <Box align="end" pad="none">
          <Box width="medium">
            <TextInput
              value={value}
              dropHeight="small"
              onChange={this.onChange}
              onSelect={this.onSelect}
              suggestions={suggestions || []}
              placeholder="Enter a node endpoint"
            />
          </Box>
        </Box>
    );
  }

  onChange = event => {
    this.setState({ 
      value: event.target.value 
    }, () => this.onValueChange(this.state.value))
  };

  onSelect = event => {
    this.setState({
      value: event.suggestion 
    }, () => this.onValueChange(this.state.value))
  };

  onValueChange = nodeEndpoint => {
    if(!nodeEndpoint || nodeEndpoint.length === 0) {
      return this.setState({ valid: false });
    }
  
    validateEndpoint(nodeEndpoint)
      .then(valid => {
        this.setState({ valid });
        if (valid) {
          this.props.onValueChange(nodeEndpoint)
        }
      })
  }
}

export default SuggestionsInput