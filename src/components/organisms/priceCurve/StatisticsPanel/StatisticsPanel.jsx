import axios from "axios";
import { Grid, Box, Text, ResponsiveContext } from "grommet";
import { humanizeNumber } from "../../../../helpers/format";

import EconomicsStatBox from "./EconomicsStatBox/EconomicsStatBox";
import WidgetBox from "./WidgetBox/WidgetBox";
import React from 'react';


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

const smallScreenColumns = ["40vw", "40vw"];

const StatisticsPanel = (props) => {
  const {
    totalNdau,
    marketPrice,
    sib,
    active,
    totalNdauIssued,
    nextIssuePrice,
  } = props;
  const [numOfAccounts,setNumOfAccounts]=React.useState(0);
React.useEffect(()=>{
axios.get("http://localhost:3001/api/numOfAccounts").then((val)=>{
  setNumOfAccounts(val.data.numOfAccounts);
})
},[])
  return (
    <ResponsiveContext.Consumer>
      {(screenSize) => (
        <Grid
          gap=" small"
          rows={screenSize === "small" ? smallScreenRows : bigScreenRows}
          columns={
            screenSize === "small" ? smallScreenColumns : bigScreenColumns
          }
          areas={screenSize === "small" ? smallScreenGrid : bigScreenGrid}
        >
          <StatBox
            justify={screenSize === "small" ? "center" : "start"}
            align={screenSize === "small" ? "center" : "start"}
            gridArea="EconomicsStat"
          >
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
          

          <StatBox gridArea="numOfAccounts" ><div style={{textAlign:"center"}}>Number of Accounts<br/>{numOfAccounts}</div></StatBox>
        </Grid>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default StatisticsPanel;
