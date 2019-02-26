import React from 'react'
import { Text } from 'grommet'

function TruncatedText({value}) {
 
  const truncate = (value) => { 
    
    if (!value || !isNaN(Date.parse(value)) || typeof value === 'object' && !Array.isArray(value)) {
      return value
    }

    const text = Array.isArray(value) ? value[0] : value;
    if (!text || text.length < 17 || !isNaN(Date.parse(value))) {
      return text
    }

    const length = text.length;
    return `${text.slice(0, 8)}...${text.slice(length - 8, length)}`
  }

  return (
    <Text>{truncate(value)}</Text>
  );
}

export default TruncatedText;