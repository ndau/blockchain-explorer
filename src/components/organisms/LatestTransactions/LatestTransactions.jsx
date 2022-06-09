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
    <div style={{ borderLeft: "2px solid #F9972C", paddingLeft: "5%" }}>
      <Box round={{size:"xsmall",corner:"top"}} pad="5px" background="#093D60" justify="center">
        <Anchor
          color="white"
          href="/"
          label="LATEST TRANSACTIONS"
          alignSelf="center"
        />
      </Box>

      {numberOfTransactions &&
        transactionHashes.map((hash, index) => (
          <div
            style={{
              backgroundColor: "#132A47",
              padding: "10px",
            }}
          >
            <TransactionCard
              transactionHash={hash}
              open={index === activeTransactionIndexState}
              index={index}
              setActiveTransaction={setActiveTransactionIndex}
            />
          </div>
        ))}
    </div>
  );
};

export default LatestTransations;
