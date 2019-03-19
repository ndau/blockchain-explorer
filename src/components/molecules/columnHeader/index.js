import React from 'react'
import { Box } from 'grommet';
import './style.css'

const TableHeader = ({ children })=> {
  return (
    <Box className="tableHeader">{children}</Box>
  )
}

export default TableHeader;