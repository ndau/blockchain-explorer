import React from 'react'
import { CheckBox, Box } from "grommet";

const ColumnHeader = ({ header, checkboxProps={} })=> {
  return (
    <span>
      {header}
      {
        checkboxProps &&
        <Box as="small">
          <CheckBox {...checkboxProps} />
        </Box>
      }
    </span>
  )
}

export default ColumnHeader;