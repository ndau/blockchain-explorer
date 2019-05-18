import React from 'react'
import { Box, Text } from "grommet"
import TruncatedText from "../../atoms/truncatedText"
import Keyword from '../../molecules/keyword'
import { humanizeNumber } from '../../../helpers/format'

const Value = ({value}) => {
  if (value !== 0 && !value) {
    return null;
  }
  const type = typeof value
  switch (type) {
    case 'object':
      return <Values value={value} isArray={Array.isArray(value)} />;
    case 'string':
      if(!isNaN(Date.parse(value))) {
        return value
      }

      return <TruncatedText value={value} />;
    case 'number':
      return humanizeNumber(value)
    default:
      return value;
  }
}

const Values = ({value, isArray}) => {
  if (isArray) {
    return (
      <Box  
        style={{
          margin: "5px 0px 0px 15px",
          paddingLeft: "11px",
          borderLeft: "1px solid rgba(255,255, 255, 0.3)"
        }}
      >
      {
        value.map((item, index) => {
          return item && (
            <Text key={index}>
              <Value value={item} />
            </Text>
          )
        })
      }
      </Box>
    )
  }

  return (
    <Box  
      style={{
        margin: "5px 0px 0px 15px",
        paddingLeft: "11px",
        borderLeft: "1px solid rgba(255,255, 255, 0.3)"
      }}
    >
      {
        Object.keys(value).map((item, index) => {
          const itemValue = value[item];
          return itemValue && (
            <Text key={index}>
              <Keyword label={item} />: <Value value={itemValue} />
            </Text>
          )
        })
      }
    </Box>
  );
}

export default Value