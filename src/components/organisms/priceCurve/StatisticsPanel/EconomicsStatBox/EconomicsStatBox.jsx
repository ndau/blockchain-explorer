import { Grid, Box, Text, ResponsiveContext } from "grommet";
import { humanizeNumber } from "../../../../../helpers/format";
import globeImg from "../../../../../img/globe.png";
import "./EconomicsStatBox.css";

const StatBox = (props) => {
  let gridArea = props.gridArea;
  let background = props.background;
  return (
    <Box
      justify="center"
      align="center"
      gridArea={gridArea}
      background={background || "#132A47"}
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
  const screenSize = props.screenSize === "small";

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

const smallScreenRows = ["xxsmall", "xxsmall", "xsmall"];

const bigScreenColumns = ["280px", "280px", "380px"];

const smallScreenColumns = ["xsmall", "small"];

const EconomicsStatBox = (props) => {
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
            rows={screenSize === "small" ? smallScreenRows : bigScreenRows}
            columns={
              screenSize === "small" ? smallScreenColumns : bigScreenColumns
            }

            areas={screenSize === "small" ? smallScreenGrid : bigScreenGrid}
            back
          >
            <StatBox gridArea="ndauIssued">
              <LabelText>Ndau Issued: </LabelText>
              <StatText>{humanizeNumber(totalNdauIssued, 0)}</StatText>
            </StatBox>

            <StatBox gridArea="nextIssuedPrice">
              <LabelText>Next Issued Price:</LabelText>
              <StatText>{humanizeNumber(nextIssuePrice, 4, 4)} $</StatText>
            </StatBox>

            <StatBox gridArea="sibInEffect">
              <LabelText>SIB IN EFFECT: </LabelText>
              <StatText>{humanizeNumber(sib * 10, 2, 2)} %</StatText>
            </StatBox>

            <StatBox gridArea="ndauInCirculation">
              <LabelText>NDAU IN CIRCULATION: </LabelText>
              <StatText>{humanizeNumber(totalNdau, 0)}</StatText>
            </StatBox>

            <StatBox
              gridArea="currentMarketPrice"
              background={{size:screenSize ==="small" ? "50%":"70%",position: "center", color: "#132A47", image: `url(${globeImg})` }}
            >
              <Box
                margin={{ top: screenSize === "small" ? "15%" : "30%" }}
                justify="center"
                align="center"
              >
                <LabelText>CURRENT MARKET PRICE:</LabelText>
                <StatText>{humanizeNumber(marketPrice, 4, 4)} $</StatText>
              </Box>
            </StatBox>
          </Grid>
        </>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default EconomicsStatBox;
