import React, { Component } from 'react'
import { Box, Text } from "grommet"
import TruncatedText from "../../atoms/truncatedText"
import Card from '../../atoms/card';

const Value = ({value}) => {
  if (!value) {
    return null;
  }
  const type = typeof value;

  switch (type) {
    case 'object':
      return <SubDetails value={value} isArray={Array.isArray(value)} />;
    case 'string':
      if(!isNaN(Date.parse(value))) {
        return value
      }
      return <TruncatedText value={value} />;
    default:
      return value;
  }
}

const SubDetails = ({value, isArray}) => {
  if (isArray) {
    return value.map((item, index) => {
      return (
        <Text key={index}>
          <Value value={value[item]} />
        </Text>
      )
    });
  }

  return (
    <Box  margin={{left: "20px"}}>
      {
        Object.keys(value).map((item, index) => {
          return (
            <Text key={index}>
              {item}: <Value value={value[item]} />
            </Text>
          )
        })
      }
    </Box>
  );
}

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
              if(value === 0 || value) {
                return (
                  <Text as="section" key={index}>
                    <b>
                      {
                        item
                          .replace(/([^A-Z]*)([A-Z]*)([A-Z])([^A-Z]*)/g, '$1 $2 $3$4')
                          .replace(/ +/g, ' ')
                      }:
                    </b> <Value value={value} />
                  </Text>
                )
              }
            })
          }
        </Box> 
      </Card>
    );
  }
}

export default DetailsCard;