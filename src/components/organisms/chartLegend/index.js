import React, { Component } from 'react'
import { Box, ResponsiveContext } from "grommet"
import Legends from '../../molecules/legends'
import { humanizeNumber } from '../../../helpers/format'

class ChartLegend extends Component {
  render() {
    const { 
      totalNdau, marketPrice, sib, active, totalNdauIssued, nextIssuePrice
    } = this.props;

    return (
      <Box>
        <ResponsiveContext.Consumer>
          {size => size === "small" ? (
            <Box className="mobileLegend">
              <Legends 
                info={[
                  {
                    label: "ndau in circulation",
                    value: humanizeNumber(totalNdau, 0),
                    inactive: active
                  },
                  {
                    label: "current market price",
                    value: `${humanizeNumber(marketPrice, 2, 2)} USD`,
                    inactive: active
                  },
                  {
                    label: "SIB in effect",
                    value: (sib === 0 || sib ? `${sib}%` : "--"),
                    inactive: active
                  },
                  {
                    label: "ndau issued",
                    value: humanizeNumber(totalNdauIssued, 0)
                  },
                  {
                    label: "next issued price", 
                    value: `${humanizeNumber(nextIssuePrice, 2, 2)} USD`
                  }
                ]}
              />
            </Box>
          ) : (
            <Box className="legend" direction="row" align="end">
              <Box>
                <Legends
                  info={[
                    {
                      label: "SIB in effect",
                      value: (sib === 0 || sib ? `${sib}%` : "--"),
                      inactive: active
                    },
                  ]}
                />
              </Box>
              <Box>
                <Legends
                  info={[
                    {
                      label: "ndau issued",
                      value: humanizeNumber(totalNdauIssued, 0)
                    },
                    {
                      label: "ndau in circulation",
                      value: humanizeNumber(totalNdau, 0),
                      inactive: active
                    }
                  ]}
                />
              </Box>

              <Box>
                <Legends 
                  info={[
                    {
                      label: "next issued price", 
                      value: `${humanizeNumber(nextIssuePrice, 2, 2)} USD`
                    },
                    {
                      label: "current market price",
                      value: `${humanizeNumber(marketPrice, 2, 2)} USD`,
                      inactive: active
                    },
                  ]}
                />
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>  
      </Box>
    );
  }
}

export default ChartLegend;