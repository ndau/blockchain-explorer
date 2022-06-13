import { Grid, Box, Text, ResponsiveContext } from "grommet";

const StatBox = (props) => {
  let gridArea = props.gridArea;
  return (
    <Box gridArea={gridArea} background="#132A47">
      {props.children}
    </Box>
  );
};

const TransactionsStatBox = () => {
  const bigScreenRows = ["xsmall", "xsmall"];

  const smallScreenRows = ["xsmall"];

  const bigScreenColumns = ["small"];

  const smallScreenColumns = ["xsmall", "xsmall"];

  const bigScreenGrid = [
    {
      name: "txPerSec",
      start: [0, 0],
      end: [0, 0],
    },
    { name: "blockTime", start: [0, 1], end: [0, 1] },
  ];

  const smallScreenGrid = [
    { name: "txPerSec", start: [0, 0], end: [0, 0] },
    { name: "blockTime", start: [1, 0], end: [1, 0] },
  ];

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
          <StatBox gridArea="txPerSec">
            <Text>Transactions Per Second</Text>
            {screenSize !== "small" && (
              <Text size="small">
                Number Of Transactions Processed in a Second
              </Text>
            )}
          </StatBox>

          <StatBox gridArea="blockTime">
            <Text>blockTime</Text>
          </StatBox>
        </Grid>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default TransactionsStatBox;
