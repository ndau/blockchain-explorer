import React, { Component } from 'react';
import { Drop, Text, Box,  ResponsiveContext, } from 'grommet'
import { expandPeriod, expandTime } from '../../../helpers/format'

class ExpandedTime extends Component {
  constructor(props) {
    super(props);


    this.state = {
      showExpandedFormat: false,
    }

    this.ref = React.createRef();
  }

  setShowState = (expandedTime) => {
    if(expandedTime) {
      this.setState({ showExpandedFormat: true })
    }
  }

  render() {
    const { showExpandedFormat } = this.state
    const { value, rawValue} = this.props
    const isDate = !isNaN(Date.parse(value));
    const expandedTime = rawValue && (isDate ? expandTime(rawValue) : expandPeriod(rawValue))

    return (
      <Box style={{display: "inline-flex"}}>
        <Box
          ref={this.ref}
          onClick={event => {event.stopPropagation(); this.setShowState(expandedTime)}}
        >
          <Text color={showExpandedFormat ? "#ffe7c6" : "#fff"}>
            {value}
          </Text>
        </Box>



        <ResponsiveContext.Consumer>
          {
            viewPort => (
              
            this.ref.current && showExpandedFormat && (
              <Drop
                align={{ top: "bottom" }}
                target={this.ref.current}
                plain
                onClickOutside={() => this.setState({ showExpandedFormat: false })}
                elevation="medium"
              >
                <Box
                  pad="15px"
                  background="rgba(255,255,255, 0.95)"
                  width={viewPort === 'small' ? "100vw" : "500px"}
                  round="xsmall"
                  elevation="medium"
                >
                  <Text color="#000" alignSelf="center">{expandedTime}</Text>
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

export default ExpandedTime