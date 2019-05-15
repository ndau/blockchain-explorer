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
  
    return (
      <Card background="transparent">
        <Box>
          {
            Object.keys(data).map((item, index) => {
              const value = data[item]
              return (value === 0 || value) && (
                <Box key={index} className="detailField" round="xsmall">
                  <Text 
                    as="section"  
                    margin={{bottom: "10px"}}
                  >
                    <Text>
                      <Keyword label={item} keyword={KEYWORD_MAP[item]} />
                    </Text> 
                    {': '} 
                    <Value value={value} />
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