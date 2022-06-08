import { Grid, Box, Text, ResponsiveContext } from "grommet";

const StatBox = (props) => {
  let gridArea = props.gridArea;
  return (
    <Box
      gridArea={gridArea}
      background="#132A47"
    >
      {props.children}
    </Box>
  );
};

const TransactionsStatBox = () => {
  const rowsArr = ["xsmall", "xsmall"];
  const colsArr = ["small"];
  const grid = [
    {
      name: "txPerSec",
      start: [0, 0],
      end: [0, 0],
    },
    { name: "blockTime", start: [0, 1], end: [0, 1] },
  ];

  return (
    <Grid
      justifyContent="center"
      rows={rowsArr}
      columns={colsArr}
      gap="small"
      areas={grid}
    >
      <StatBox gridArea="txPerSec">
        <Text>Transactions Per Second</Text>
        <Text size="small">Number Of Transactions Processed in a Second</Text>
      </StatBox>

      <StatBox gridArea="blockTime">
        <Text>blockTime</Text>
      </StatBox>
    </Grid>
  );
};

export default TransactionsStatBox;
