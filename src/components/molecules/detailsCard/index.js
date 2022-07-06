/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

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
                <Box key={index} className="detailField" round="xsmall" pad="5px" margin="small ">
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
