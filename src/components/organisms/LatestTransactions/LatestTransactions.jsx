import { useState } from "react";

import TransactionCard from "../../molecules/transactionCard";
import { Box, Text, Anchor } from "grommet";

const LatestTransations = (props) => {
  const [activeTransactionIndexState, setActiveTransactionIndexState] =
    useState(null);

  const setActiveTransactionIndex = (index) => {
    if (index !== activeTransactionIndexState) {
      setActiveTransactionIndexState(index);
    }
  };

  let transactionHashes = props.transactionHashes;
  let numberOfTransactions = props.numberOfTransactions;
  return (
    <>
      <Box margin={{ bottom: "large" }}>
        <Text>
          <Text weight="bold">Latest Transactions</Text>
          <Text style={{ float: "right" }}>
            <Anchor href="blocks/" label="View all transactions" />
          </Text>
        </Text>
      </Box>

      {numberOfTransactions &&
        transactionHashes.map((hash, index) => (
          <Box
            key={index}
            margin={{ vertical: "20px" }}
          >
            <TransactionCard
              transactionHash={hash}
              open={index === activeTransactionIndexState}
              index={index}
              setActiveTransaction={setActiveTransactionIndex}
            />
          </Box>
        ))}
    </>
  );
};

export default LatestTransations;
