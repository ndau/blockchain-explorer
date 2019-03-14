import React from 'react'
import { Box } from 'grommet';
import './style.css'

const TableData = ({ children })=> {
  return (
    <Box className="tableData">
      {children}
    </Box>
  )
}

export default TableData;