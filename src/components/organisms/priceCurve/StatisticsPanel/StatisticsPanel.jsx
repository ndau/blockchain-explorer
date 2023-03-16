import React from 'react';
import { Grid, Box, Text, ResponsiveContext } from 'grommet';

import EconomicsStatBox from './EconomicsStatBox/EconomicsStatBox';
import WidgetBox from './WidgetBox/WidgetBox';

const StatBox = (props) => {
  let gridArea = props.gridArea;
  let justify = props.justify;
  let align = props.align;

  return (
    <Box justify={justify ?? 'center'} align={align ?? 'center'} gridArea={gridArea}>
      {props.children}
    </Box>
  );
};

const bigScreenGrid = [
  { name: 'EconomicsStat', start: [0, 0], end: [1, 0] },
  { name: 'Graph', start: [0, 1], end: [1, 1] },
  { name: 'staked', start: [0, 2], end: [1, 2] },
];

const smallScreenGrid = [
  { name: 'EconomicsStat', start: [0, 0], end: [1, 0] },
  { name: 'staked', start: [0, 1], end: [0, 1] },
];

const bigScreenRows = ['small', 'small', 'small'];
const smallScreenRows = ['xsmall', 'xxsmall'];

const bigScreenColumns = ['large', 'small'];
const smallScreenColumns = ['1/2', '1/2'];

const StatisticsPanel = (props) => {
  const { totalNdau, marketPrice, sib, active, totalNdauIssued, nextIssuePrice } = props;

  return (
    <ResponsiveContext.Consumer>
      {(screenSize) => (
        <Grid
          style={{ width: '100%' }}
          gap=" small"
          rows={screenSize === 'small' ? smallScreenRows : bigScreenRows}
          columns={screenSize === 'small' ? smallScreenColumns : bigScreenColumns}
          areas={screenSize === 'small' ? smallScreenGrid : bigScreenGrid}
        >
          <StatBox justify="center" align="center" gridArea="EconomicsStat">
            <EconomicsStatBox
              totalNdau={totalNdau}
              marketPrice={marketPrice}
              sib={sib}
              active={active}
              totalNdauIssued={totalNdauIssued}
              nextIssuePrice={nextIssuePrice}
            />
          </StatBox>

          {screenSize !== 'small' && (
            <StatBox justify="center" align="center" gridArea="Graph">
              <WidgetBox />
            </StatBox>
          )}
        </Grid>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default StatisticsPanel;
