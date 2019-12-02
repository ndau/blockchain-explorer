import React, { Component } from 'react'
import { Box, Text } from "grommet"
import Value from '../../molecules/value'
import Card from '../../atoms/card';
import Keyword from '../../molecules/keyword'
import { KEYWORD_MAP } from '../../../constants'
import './style.css'

class DetailsCard extends Component {
  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    const {raw, ...details} = data
  
    return (
      <Card background="transparent">
        <Box>
          {
            Object.keys(details).map((item, index) => {
              const value = data[item]
              return (value === 0 || value) && (
                <Box key={index} className="detailField" round="xsmall">
                  <Text 
                    as="section"  
                    margin={{bottom: "5px"}}
                  >
                    <Text>
                      <Keyword label={item} keyword={KEYWORD_MAP[item]} />
                    </Text> 
                    {': '} 
                    <Value value={value} rawValue={raw[item]} />
                  </Text>
                </Box>
              )
            })
          }
        </Box> 
      </Card>
    );
  }
}

export default DetailsCard;