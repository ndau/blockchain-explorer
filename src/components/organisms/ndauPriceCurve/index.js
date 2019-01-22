import React from 'react'
import { Box } from 'grommet'
import PriceCurve from '../../molecules/priceCurve'

class NdauPriceCurve extends React.Component {
  render() {
    const { ndauSold } = this.props;
    if (!ndauSold) {
      return <div />;
    }

    return (
      <Box size="xsmall" overflow="hidden">
        <PriceCurve {...this.props} ndauSold={ndauSold} useLogYAxis />
      </Box>
    );
  }
}

export default NdauPriceCurve;