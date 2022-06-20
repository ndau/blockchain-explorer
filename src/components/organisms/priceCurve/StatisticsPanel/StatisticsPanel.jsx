import { Grid, Box, Text, ResponsiveContext } from "grommet";
import { humanizeNumber } from "../../../../helpers/format";

import EconomicsStatBox from "./EconomicsStatBox/EconomicsStatBox";
import WidgetBox from "./WidgetBox/WidgetBox";
import KeyMetricsBox from "./KeyMetricsBox/KeyMetricsBox";

const StatBox = (props) => {
  let gridArea = props.gridArea;
  let justify = props.justify;
  let align = props.align;
  return (
    <Box
      justify={justify ?? "center"}
      align={align ?? "center"}
      gridArea={gridArea}
    >
      {props.children}
    </Box>
  );
};

const bigScreenGrid = [
  { name: "EconomicsStat", start: [0, 0], end: [1, 0] },
  { name: "Graph", start: [0, 1], end: [0, 2] },
  { name: "staked", start: [1, 1], end: [1, 1] },
  { name: "numOfAccounts", start: [1, 2], end: [1, 2] },
];

const smallScreenGrid = [
  { name: "EconomicsStat", start: [0, 0], end: [1, 0] },
  { name: "staked", start: [0, 1], end: [0, 1] },
  { name: "numOfAccounts", start: [1, 1], end: [1, 1] },
];

const bigScreenRows = ["small", "small", "small"];

const smallScreenRows = ["small", "xsmall"];

const bigScreenColumns = ["large", "small"];

const smallScreenColumns = ["small", "small"];

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
          gap="small"
          rows={screenSize === "small" ? smallScreenRows : bigScreenRows}
          columns={
            screenSize === "small" ? smallScreenColumns : bigScreenColumns
          }
          areas={screenSize === "small" ? smallScreenGrid : bigScreenGrid}
        >
          <StatBox justify="start" align="start" gridArea="EconomicsStat">
            <EconomicsStatBox
              totalNdau={totalNdau}
              marketPrice={marketPrice}
              sib={sib}
              active={active}
              totalNdauIssued={totalNdauIssued}
              nextIssuePrice={nextIssuePrice}
            />
          </StatBox>

          {screenSize !== "small" && (
            <StatBox gridArea="Graph">
              <WidgetBox />
            </StatBox>
          )}

          <StatBox gridArea="staked">Staked</StatBox>

          <StatBox gridArea="numOfAccounts">numOfAccounts</StatBox>
        </Grid>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default StatisticsPanel;
