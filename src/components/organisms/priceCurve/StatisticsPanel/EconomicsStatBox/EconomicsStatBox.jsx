import React from 'react';
import axios from 'axios';

import { Grid, Box, Text, ResponsiveContext } from 'grommet';
import { humanizeNumber } from '../../../../../helpers/format';

import api from '../../../../../api';
import './EconomicsStatBox.css';

const StatBox = (props) => {
  let gridArea = props.gridArea;
  let background = props.background;
  return (
    <Box
      onClick={() => {
        window.open(props.link, '_blank');
      }}
      justify="center"
      align="center"
      gridArea={gridArea}
      background={background || '#132A47'}
      border={true}
    >
      {props.children}
    </Box>
  );
};

const StatText = (props) => {
  return (
    <Text weight="bold" size="medium" color="#FFF">
      {props.children}
    </Text>
  );
};

const LabelText = (props) => {
  const screenSize = props.screenSize === 'small';

  return (
    <Text weight="lighter" size="small" color="#7B8898">
      {props.children}
    </Text>
  );
};

const bigScreenGrid = [
  { name: 'ndauIssued', start: [0, 0], end: [0, 0] },
  { name: 'nextIssuedPrice', start: [1, 0], end: [1, 0] },
  { name: 'sibInEffect', start: [0, 1], end: [0, 1] },
  { name: 'ndauInCirculation', start: [1, 1], end: [1, 1] },
  { name: 'currentMarketPrice', start: [2, 0], end: [2, 0] },
  { name: 'numberOfAccount', start: [2, 1], end: [2, 1] },
];

const smallScreenGrid = [
  { name: 'ndauIssued', start: [0, 0], end: [0, 0] },
  { name: 'nextIssuedPrice', start: [1, 0], end: [1, 0] },
  { name: 'sibInEffect', start: [0, 1], end: [0, 1] },
  { name: 'ndauInCirculation', start: [1, 1], end: [1, 1] },
  { name: 'currentMarketPrice', start: [0, 2], end: [0, 2] },
  { name: 'numberOfAccount', start: [1, 2], end: [1, 2] },
];

const bigScreenRows = ['xsmall', 'xsmall', 'xxsmall'];

const smallScreenRows = ['xxsmall', 'xxsmall', 'xxsmall'];

const bigScreenColumns = ['1/3', '1/3', '1/3'];
const smallScreenColumns = ['1/2', '1/2'];

const EconomicsStatBox = (props) => {
  const { totalNdau, marketPrice, sib, active, totalNdauIssued, nextIssuePrice } = props;
  const [numOfAccounts, setNumOfAccounts] = React.useState(0);

  React.useEffect(() => {
    axios.get(`${api}/numOfAccounts`).then((val) => {
      setNumOfAccounts(val.data.numOfAccounts);
    });
  }, []);

  return (
    <ResponsiveContext.Consumer>
      {(screenSize) => (
        <>
          <Grid
            style={{ width: '100%' }}
            rows={screenSize === 'small' ? smallScreenRows : bigScreenRows}
            columns={screenSize === 'small' ? smallScreenColumns : bigScreenColumns}
            areas={screenSize === 'small' ? smallScreenGrid : bigScreenGrid}
            back
          >
            <StatBox
              gridArea="ndauIssued"
              link="https://ndau.io/knowledge-base/how-is-ndau-issued-based-on-supply-and-demand/
"
            >
              <LabelText>NDAU ISSUED: </LabelText>
              <StatText>{humanizeNumber(totalNdauIssued, 0)}</StatText>
            </StatBox>

            <StatBox
              gridArea="nextIssuedPrice"
              link="https://ndau.io/knowledge-base/what-is-the-target-price-curve-s-curve/"
            >
              <LabelText>NEXT ISSUED PRICE:</LabelText>
              <StatText>${humanizeNumber(nextIssuePrice, 4, 4)}</StatText>
            </StatBox>

            <StatBox
              gridArea="sibInEffect"
              link="https://ndau.io/knowledge-base/what-is-sib-protection-and-how-does-it-help-balance-ndaus-monetary-policy/"
            >
              <LabelText>SIB IN EFFECT: </LabelText>
              <StatText>{humanizeNumber(sib * 10, 2, 2)} %</StatText>
            </StatBox>

            <StatBox
              gridArea="ndauInCirculation"
              link="https://ndau.io/knowledge-base/why-is-ndau-in-circulation-greater-than-ndau-issued/"
            >
              <LabelText>NDAU IN CIRCULATION: </LabelText>
              <StatText>{humanizeNumber(totalNdau, 0)}</StatText>
            </StatBox>

            <StatBox
              gridArea="currentMarketPrice"
              link="https://ndau.io/knowledge-base/what-is-market-price-and-how-is-it-recorded-on-the-ndau-blockchain/"
            >
              <LabelText>CURRENT MARKET PRICE:</LabelText>
              <StatText>${humanizeNumber(marketPrice, 4, 4)} </StatText>
            </StatBox>

            <StatBox
              gridArea="numberOfAccount"
              link="https://ndau.io/knowledge-base/what-is-market-price-and-how-is-it-recorded-on-the-ndau-blockchain/"
            >
              <LabelText>NUMBER OF ACCOUNTS:</LabelText>
              <StatText>{humanizeNumber(numOfAccounts, 4, 0)} </StatText>
            </StatBox>
          </Grid>
        </>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default EconomicsStatBox;
