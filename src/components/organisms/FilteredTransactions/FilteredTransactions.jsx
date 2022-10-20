import PaginatedTransactions from "./PaginatedTransactions/PaginatedTransactions";
import { useEffect, useState } from "react";
import { Heading, Box, Spinner, Text } from "grommet";
import { getTransaction } from "../../../helpers/fetch";
import pLimit from "p-limit";

const FilteredTransactions = (props) => {
  const [filtersAppliedState, setFiltersAppliedState] = useState(null);
  const [unfilteredEventsState, setUnfilteredEventsState] = useState(null);
  const [filteredTransactionsState, setFilteredTransactionsState] =
    useState(null);
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [fetchingPercentageState, setFetchingPercentageState] = useState(0);

  useEffect(() => {
    setIsLoadingState(true);
    function setUnfilteredEventsFromLocalStorage() {
      const unfilteredEventsString = localStorage.getItem("unfilteredEvents");
      if (unfilteredEventsString) {
        const unfilteredEventsArr = JSON.parse(unfilteredEventsString);
        setUnfilteredEventsState(unfilteredEventsArr);
        localStorage.removeItem("unfilteredEvents");
      }
    }

    function setTypeFiltersFromLocalStorage() {
      const typeFiltersString = localStorage.getItem("typeFilters");

      if (typeFiltersString) {
        const typeFiltersArr = typeFiltersString.split(",");
        setFiltersAppliedState(typeFiltersArr);
        localStorage.removeItem("typeFilters");
      }
    }

    setUnfilteredEventsFromLocalStorage();
    setTypeFiltersFromLocalStorage();
  }, []);

  useEffect(() => {
    if (unfilteredEventsState) {
      setFilteredTransactions();

      async function setFilteredTransactions() {
        const filteredTransactions = await filterTransactionsByType();
        setFilteredTransactionsState(filteredTransactions);
        setIsLoadingState(false);
      }

      async function filterTransactionsByType() {
        let detailedTransactions = await getTransactionDetails();
        const filteredTransactions = detailedTransactions.filter(
          (transaction, index) => {
            if (transaction) {
              return filtersAppliedState.includes(
                transaction.type.replace(/ /g, "")
              );
            } else {
              return null;
            }
          }
        );
        return filteredTransactions;
      }

      async function getTransactionsWithProgress(transactionHashes = []) {
        const limit = pLimit(10);
        const transactionRequests = transactionHashes.map((hash) => {
          return limit(() => getTransaction(hash));
        });

        function getTransactionsWithCallback(proms, progress_cb) {
          let d = 0;
          let prevPercentage;
          progress_cb(0);
          for (const p of proms) {
            if (d === 0) {
              prevPercentage = 0;
            }
            p.then(() => {
              d++;
              let newPercentage = (d * 100) / proms.length;
              if (newPercentage - prevPercentage > 1) {
                progress_cb((d * 100) / proms.length);
                prevPercentage = newPercentage;
              }
            });
          }
          return Promise.all(proms);
        }

        return getTransactionsWithCallback(transactionRequests, (p) => {
          if (p) {
            setFetchingPercentageState(p.toFixed(2));
          }
        });
      }

      async function getTransactionDetails() {
        const TransactionHashesArr = unfilteredEventsState.map(
          (event) => event.TxHash
        );
        const detailedTransactions = await getTransactionsWithProgress(
          TransactionHashesArr
        );
        return detailedTransactions;
      }
    }
  }, [unfilteredEventsState]);

  return (
    <Box basis="full" fill={true} height={{ min: "100vh", max: "101vh" }}>
      <Heading level={2} textAlign="center" fill>
        Filtered Transactions
      </Heading>
      {isLoadingState ? (
        <Box align="center">
          <Spinner size="medium" color="#F29A1D" />
          <br></br>
          {fetchingPercentageState} % Done
          {unfilteredEventsState && unfilteredEventsState.length > 750 ? (
            <Text>
              Filtering a very large amount of data. Thank you for your patience
            </Text>
          ) : (
            unfilteredEventsState &&
            unfilteredEventsState.length > 250 && (
              <Text>
                Filtering a large amount of data. Thank you for your patience.
              </Text>
            )
          )}
        </Box>
      ) : (
        <PaginatedTransactions
          itemsPerPage={10}
          totalTransactionsToDisplay={filteredTransactionsState}
        />
      )}
    </Box>
  );
};

export default FilteredTransactions;
