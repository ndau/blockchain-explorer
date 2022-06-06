import { Grid, Box, Text, ResponsiveContext } from "grommet";
import { humanizeNumber } from "../../../../helpers/format";
import useScript from "../../../../helpers/hooks/useScript";
import "./StasticsBox.css";

const StatBox = (props) => {
  let gridArea = props.gridArea;
  return (
    <Box
      justify="center"
      align="center"
      gridArea={gridArea}
      background="#132A47"
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
  return (
    <Text weight="lighter" size="small" color="#7B8898">
      {props.children}
    </Text>
  );
};

const bigScreenGrid = [
  { name: "ndauIssued", start: [0, 0], end: [0, 0] },
  { name: "nextIssuedPrice", start: [1, 0], end: [1, 0] },
  { name: "sibInEffect", start: [0, 1], end: [0, 1] },
  { name: "ndauInCirculation", start: [1, 1], end: [1, 1] },
  { name: "currentMarketPrice", start: [2, 0], end: [2, 1] },
];

const smallScreenGrid = [
  { name: "ndauIssued", start: [0, 0], end: [0, 0] },
  { name: "nextIssuedPrice", start: [1, 0], end: [1, 0] },
  { name: "sibInEffect", start: [0, 1], end: [0, 1] },
  { name: "ndauInCirculation", start: [1, 1], end: [1, 1] },
  { name: "currentMarketPrice", start: [0, 2], end: [1, 2] },
];

const bigScreenRows = ["xsmall", "xsmall"];

const smallScreenRows = ["xxsmall", "xxsmall", "xxsmall"];

const bigScreenColumns = ["200px", "200px", "280px"];

const smallScreenColumns = ["small", "small"];

const StatisticsPanel = (props) => {
  useScript("https://widget.nomics.com/embed.js");

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
        <>
          <Grid
            justifyContent="center"
            rows={screenSize === "small" ? smallScreenRows : bigScreenRows}
            columns={
              screenSize === "small" ? smallScreenColumns : bigScreenColumns
            }
            gap="xxsmall"
            areas={screenSize === "small" ? smallScreenGrid : bigScreenGrid}
          >
            <StatBox gridArea="ndauIssued">
              <LabelText>Ndau Issued: </LabelText>
              <StatText>{humanizeNumber(totalNdauIssued, 0)}</StatText>
            </StatBox>

            <StatBox gridArea="nextIssuedPrice" background="#132A47">
              <LabelText>Next Issued Price:</LabelText>
              <StatText>{humanizeNumber(nextIssuePrice, 4, 4)} $</StatText>
            </StatBox>

            <StatBox gridArea="sibInEffect" background="#132A47">
              <LabelText>SIB IN EFFECT: </LabelText>
              <StatText>{humanizeNumber(sib * 10, 2, 2)} %</StatText>
            </StatBox>

            <StatBox gridArea="ndauInCirculation" background="#132A47">
              <LabelText>NDAU IN CIRCULATION: </LabelText>
              <StatText>{humanizeNumber(totalNdau, 0)}</StatText>
            </StatBox>

            <StatBox gridArea="currentMarketPrice" background="#132A47">
              <LabelText>CURRENT MARKET PRICE:</LabelText>
              <StatText>{humanizeNumber(marketPrice, 4, 4)} $</StatText>
            </StatBox>
          </Grid>

          <div className="widget">
          <div
            className="nomics-ticker-widget"
            data-name="Ndau"
            data-base="XND"
            data-quote="USD"
          />
          </div>
        </>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default StatisticsPanel;
