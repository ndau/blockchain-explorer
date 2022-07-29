import { Text } from "grommet";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import FilteredTransactionCard from "./FilteredTransactionCard/FilteredTransactionCard";
import "./PaginatedTransactions.modules.css";

function DisplayedTransactions(props) {
  const currentPageTransactions = props.currentPageTransactions;
  const lastPreviousTransaction = props.lastPreviousTransaction;
  return (
    <>
      {currentPageTransactions && currentPageTransactions.length > 0 ? (
        currentPageTransactions.map(
          (transaction, index, currentPageTransactionsArr) => {
            let previousEventVal = currentPageTransactionsArr[index + 1];

            if (index === currentPageTransactionsArr.length - 1) {
              previousEventVal = lastPreviousTransaction;
            }
            return (
              <FilteredTransactionCard
                key={JSON.stringify(transaction) + index}
                transaction={transaction}
              />
            );
          }
        )
      ) : (
        <Text textAlign="center">
          No Transactions Found For That Filter Set
        </Text>
      )}
    </>
  );
}

export default function PaginatedTransactions(props) {
  const totalTransactionsRecieved = props.totalTransactionsToDisplay;


  const itemsPerPage = props.itemsPerPage;

  const [totalTxsRecievedState, setTotalTxsRecievedState] = useState(null);
  const [currentTransactionsState, setCurrentTransactionsState] =
    useState(null);
  const [pageCountState, setPageCountState] = useState(0);
  const [lastPreviousTransactionState, setLastPreviousTransactionState] =
    useState(null);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffsetState, setItemOffsetState] = useState(0);

  useEffect(() => {
    setTotalTxsRecievedState(totalTransactionsRecieved);
  }, []);

  useEffect(() => {
    if (
      JSON.stringify(totalTransactionsRecieved) !==
      JSON.stringify(totalTxsRecievedState)
    ) {
      setTotalTxsRecievedState(totalTransactionsRecieved);
      setItemOffsetState(0);
    }
  }, [totalTransactionsRecieved]);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffsetState + itemsPerPage;
    if (totalTxsRecievedState) {
      setCurrentTransactionsState(
        totalTxsRecievedState.slice(itemOffsetState, endOffset)
      );

      setPageCountState(Math.ceil(totalTxsRecievedState.length / itemsPerPage));
      setLastPreviousTransactionState(totalTxsRecievedState[endOffset]);
    }
  }, [itemOffsetState, itemsPerPage, totalTxsRecievedState]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % totalTransactionsRecieved.length;
    setItemOffsetState(newOffset);
  };

  return (
    <>
      <DisplayedTransactions
        currentPageTransactions={currentTransactionsState}
        itemsPerPage={itemsPerPage}
        lastPreviousTransaction={lastPreviousTransactionState}
      />

      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCountState}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        previousClassName="prevPagination"
        nextClassName="nextPagination"
        containerClassName="containerPagination"
        pageClassName="pagePagination"
        activeClassName="activePagePagination"
      />
    </>
  );
}
