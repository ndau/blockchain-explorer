import { Grid, Box, Text, ResponsiveContext } from "grommet";
import { useHistory } from "react-router-dom";
import { humanizeNumber } from "../../../../../helpers/format";
import globeImg from "../../../../../img/globe.png";
import "./EconomicsStatBox.css";

const StatBox = (props) => {
  let gridArea = props.gridArea;
  let background = props.background;
  const history=useHistory();
  return (
    <Box
    onClick={()=>{
    window.open(props.link, "_blank");
    }
  }
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

const smallScreenColumns = ["30vw", "50vw"];

const EconomicsStatBox = (props) => {
  const {
    totalNdau,
    marketPrice,
    sib,
    active,
    totalNdauIssued,
    nextIssuePrice,
  } = props;
const history=useHistory();
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
            <StatBox gridArea="ndauIssued" link="https://ndau.io/knowledge-base/how-is-ndau-issued-based-on-supply-and-demand/
">
              <LabelText>NDAU ISSUED: </LabelText>
              <StatText>{humanizeNumber(totalNdauIssued, 0)}</StatText>
            </StatBox>

            <StatBox gridArea="nextIssuedPrice" link="https://ndau.io/knowledge-base/what-is-the-target-price-curve-s-curve/">
              <LabelText>NEXT ISSUED PRICE:</LabelText>
              <StatText>${humanizeNumber(nextIssuePrice, 4, 4)}</StatText>
            </StatBox>

            <StatBox gridArea="sibInEffect" link="https://ndau.io/knowledge-base/what-is-sib-protection-and-how-does-it-help-balance-ndaus-monetary-policy/">
              <LabelText>SIB IN EFFECT: </LabelText>
              <StatText>{humanizeNumber(sib * 10, 2, 2)} %</StatText>
            </StatBox>

            <StatBox gridArea="ndauInCirculation" link="https://ndau.io/knowledge-base/why-is-ndau-in-circulation-greater-than-ndau-issued/
">
              <LabelText>NDAU IN CIRCULATION: </LabelText>
              <StatText>{humanizeNumber(totalNdau, 0)}</StatText>
            </StatBox>

            <StatBox
              gridArea="currentMarketPrice"
              background={{
                size: screenSize === "small" ? "30vh" : "70%",
                position: screenSize === "small" ? "50% 0vh" : "center",
                color: "#132A47",
                image: `url(${globeImg})`,
              }}
            >
              <Box
                margin={{ top: screenSize === "small" ? "10vh" : "30%" }}
                justify="center"
                align="center"
              >
                <LabelText>CURRENT MARKET PRICE:</LabelText>
                <StatText>${humanizeNumber(marketPrice, 4, 4)} </StatText>
              </Box>
            </StatBox>
          </Grid>
        </>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default EconomicsStatBox;
