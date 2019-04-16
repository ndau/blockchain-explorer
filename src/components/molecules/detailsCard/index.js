import React, { Component } from 'react'
import { Box, Text } from "grommet"
import TruncatedText from "../../atoms/truncatedText"
import Card from '../../atoms/card';
import Keyword from '../../molecules/keyword'

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
              <Keyword label={item} />: <Value value={value[item]} />
            </Text>
          )
        })
      }
    </Box>
  );
}

class DetailsCard extends Component {
  render() {
    const { data, keywordMap } = this.props;

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
                <Text as="section" key={index} margin={{top: "5px"}}>
                  <Keyword label={item} keyword={keywordMap[item]} /> {': '} <Value value={value} />
                </Text>
              )
            })
          }
        </Box> 
      </Card>
    );
  }
}

export default DetailsCard;