import { Grid, Box, Text, ResponsiveContext } from "grommet";

const StatBox = (props) => {
  let gridArea = props.gridArea;
  return (
    <Box height="100%" width="100%" gridArea={gridArea} background="#132A47">
      {props.children}
    </Box>
  );
};

const KeyMetricsBox = () => {
  const bigScreenRows = ["small", "medium"];

  const smallScreenRows = ["xsmall"];

  const bigScreenColumns = ["small"];

  const smallScreenColumns = ["xsmall", "xsmall"];

  const bigScreenGrid = [
    {
      name: "ndauStaked",
      start: [0, 0],
      end: [0, 0],
    },
    { name: "numberAccounts", start: [0, 1], end: [0, 1] },
  ];

  const smallScreenGrid = [
    { name: "ndauStaked", start: [0, 0], end: [0, 0] },
    { name: "numberAccounts", start: [1, 0], end: [1, 0] },
  ];

  return (
    <ResponsiveContext.Consumer>
      {(screenSize) => (
        <Grid
          justify="end"
          align="end"
          rows={screenSize === "small" ? smallScreenRows : bigScreenRows}
          columns={
            screenSize === "small" ? smallScreenColumns : bigScreenColumns
          }
          areas={screenSize === "small" ? smallScreenGrid : bigScreenGrid}
        >
          <StatBox gridArea="ndauStaked">
            <Text textAlign="center"> Ndau Staked</Text>
          </StatBox>

          <StatBox gridArea="numberAccounts">
            <Text textAlign="center"> Number of Accounts</Text>
          </StatBox>
        </Grid>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default KeyMetricsBox;
