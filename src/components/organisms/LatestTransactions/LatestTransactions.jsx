import { useState } from "react";

import TransactionCard from "../../molecules/transactionCard";
import { Box, Text, Anchor, ResponsiveContext } from "grommet";

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
  let loading = props.loading;

  return (
    <ResponsiveContext.Consumer>
      {(screenSize) =>
        loading ? (
          <Box pad="xlarge" animation="pulse">
            <Text alignSelf="center" size="xsmall">
              Loading Transactions...
            </Text>
          </Box>
        ) : (
          <div
            style={{
              borderLeft: screenSize === "small" ? "" : "2px solid #F9972C",
              paddingLeft: screenSize === "small" ? "" : "5%",
            }}
          >
            <Box
              round={{ size: "xsmall", corner: "top" }}
              pad="5px"
              background="#093D60"
              justify="center"
            >
              <Anchor
                color="white"
                href="/"
                label="LATEST TRANSACTIONS"
                alignSelf="center"
              />
            </Box>

            {numberOfTransactions &&
              transactionHashes.map((hash, index) => (
                <TransactionCard
                  transactionHash={hash}
                  open={index === activeTransactionIndexState}
                  index={index}
                  setActiveTransaction={setActiveTransactionIndex}
                  border="bottom"
                />
              ))}
          </div>
        )
      }
    </ResponsiveContext.Consumer>
  );
};

export default LatestTransations;
