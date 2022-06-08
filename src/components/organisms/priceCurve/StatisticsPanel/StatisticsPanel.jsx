import { Grid, Box, Text, ResponsiveContext } from "grommet";
import { humanizeNumber } from "../../../../helpers/format";

import EconomicsStatBox from "./EconomicsStatBox/EconomicsStatBox";
import WidgetBox from "./WidgetBox/WidgetBox";
import TransactionsStatBox from "./TransactionsStatBox/TransactionsStatBox";

const StatBox = (props) => {
  let gridArea = props.gridArea;
  return (
    <Box justify="center" align="center" gridArea={gridArea}>
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
  return (
    <Text weight="lighter" size="small" color="#7B8898">
      {props.children}
    </Text>
  );
};

const bigScreenGrid = [
  { name: "EconomicsStat", start: [0, 0], end: [1, 0] },
  { name: "Graph", start: [0, 1], end: [0, 1] },
  { name: "TransactionsStat", start: [1, 1], end: [1, 1] },
];

const smallScreenGrid = [
  { name: "EconomicsStat", start: [0, 0], end: [0, 0] },
  { name: "Graph", start: [0, 1], end: [0, 1] },
  { name: "TransactionsStat", start: [0, 2], end: [0, 2] },
];

const bigScreenRows = ["small", "medium"];

const smallScreenRows = ["xsmall", "xsmall", "xxsmall"];

const bigScreenColumns = ["medium", "small"];

const smallScreenColumns = ["medium"];

const StatisticsPanel = (props) => {
  const {
    totalNdau,
    marketPrice,
    sib,
    active,
    totalNdauIssued,
    nextIssuePrice,
  } = props;

  return (
    <ResponsiveContext.Consumer>
      {(screenSize) => (
        <Grid
          justifyContent="center"
          gap="small"
          rows={screenSize === "small" ? smallScreenRows : bigScreenRows}
          columns={
            screenSize === "small" ? smallScreenColumns : bigScreenColumns
          }
          areas={screenSize === "small" ? smallScreenGrid : bigScreenGrid}
        >
          <StatBox gridArea="EconomicsStat">
            <EconomicsStatBox
              totalNdau={totalNdau}
              marketPrice={marketPrice}
              sib={sib}
              active={active}
              totalNdauIssued={totalNdauIssued}
              nextIssuePrice={nextIssuePrice}
            />
          </StatBox>

          <StatBox gridArea="Graph">
            <WidgetBox />
          </StatBox>

          <StatBox gridArea="TransactionsStat">
            <TransactionsStatBox />
          </StatBox>
        </Grid>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default StatisticsPanel;
