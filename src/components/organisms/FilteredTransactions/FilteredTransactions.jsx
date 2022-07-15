import PaginatedTransactions from "./PaginatedTransactions/PaginatedTransactions";
import { useEffect, useState } from "react";
import { Heading, Box, Spinner, Text } from "grommet";
import { getTransaction } from "../../../helpers/fetch";

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
        console.log(unfilteredEventsArr, "unfilteredEventsArr");
        setUnfilteredEventsState(unfilteredEventsArr);
        localStorage.removeItem("unfilteredEvents");
      }
    }

    function setTypeFiltersFromLocalStorage() {
      const typeFiltersString = localStorage.getItem("typeFilters");

      if (typeFiltersString) {
        const typeFiltersArr = typeFiltersString.split(",");
        console.log(typeFiltersArr, "typeFiltersArr");
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
          (transaction) =>
            filtersAppliedState.includes(transaction.type.replace(/ /g, ""))
        );
        console.log(filteredTransactions, "filteredTransactions");
        return filteredTransactions;
      }

      async function getTransactionsWithProgress(transactionHashes = []) {
        const transactionRequests = transactionHashes.map((hash) => {
          return getTransaction(hash);
        });

        function getTransactionsWithCallback(proms, progress_cb) {
          let d = 0;
          progress_cb(0);
          for (const p of proms) {
            p.then(() => {
              d++;
              progress_cb((d * 100) / proms.length);
            });
          }
          return Promise.all(proms);
        }

        return getTransactionsWithCallback(transactionRequests, (p) => {
          if (p) {
            if (p - fetchingPercentageState.toFixed(2) > 0.5) {
              console.log(p, "p");
              setFetchingPercentageState(p.toFixed(2));
            }
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
        console.log(detailedTransactions, "detailedTransactions");
        return detailedTransactions;
      }
    }
  }, [unfilteredEventsState]);

  return (
    <Box>
      <Heading level={2} textAlign="center" fill>
        Filtered Transactions
      </Heading>
      {isLoadingState ? (
        <Box align="center">
          <Spinner size="medium" color="#F29A1D" />
          <br></br>
          {fetchingPercentageState}
          {unfilteredEventsState && unfilteredEventsState.length > 550 ? (
            <Text>
              Filtering a very large amount of data. There may be significant
              wait
            </Text>
          ) : (
            unfilteredEventsState &&
            unfilteredEventsState.length > 150 && (
              <Text>
                Filtering a large amount of data. There may be some wait
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
