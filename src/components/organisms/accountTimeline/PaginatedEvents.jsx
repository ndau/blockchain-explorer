import { Box } from "grommet";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import TimelineEvent from "../../molecules/timelineEvent";
import "./PaginatedEvents.modules.css";

function DisplayedEvents(props) {
  const currentPageEvents = props.currentPageEvents;
  const lastPreviousEvent = props.lastPreviousEvent;

  return (
    <>
      {currentPageEvents && currentPageEvents.length ? (
        currentPageEvents.map((event, index, currentPageEventsArr) => {
          let previousEventVal = currentPageEventsArr[index + 1];

          if (index === currentPageEventsArr.length - 1) {
            previousEventVal = lastPreviousEvent;
          }
          return (
            <TimelineEvent
              key={JSON.stringify(event) + index}
              index={index}
              event={event}
              previousEvent={previousEventVal}
              oldestTransactionInRangeMinusOne={
                props.oldestTransactionInRangeMinusOne
              }
            />
          );
        })
      ) : (
        <Box align="center">No transactions found for this time period</Box>
      )}
    </>
  );
}

export default function PaginatedEvents(props) {
  const totalEventsRecieved = props.totalEventsToDisplay;

  const itemsPerPage = props.itemsPerPage;

  const oldestTransactionInRangeMinusOne =
    props.oldestTransactionInRangeMinusOne;

  const [totalEventRecievedState, setTotalEventRecievedState] = useState(null);
  const [currentEventsState, setCurrentEventsState] = useState(null);
  const [pageCountState, setPageCountState] = useState(0);
  const [lastPreviousEventState, setLastPreviousEventState] = useState(null);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffsetState, setItemOffsetState] = useState(0);

  useEffect(() => {
    setTotalEventRecievedState(totalEventsRecieved);
  }, []);

  useEffect(() => {
    if (
      JSON.stringify(totalEventsRecieved) !==
      JSON.stringify(totalEventRecievedState)
    ) {
      setTotalEventRecievedState(totalEventsRecieved);
      setItemOffsetState(0);
    }
  }, [totalEventsRecieved]);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffsetState + itemsPerPage;
    if (totalEventRecievedState) {
      setCurrentEventsState(
        totalEventRecievedState.slice(itemOffsetState, endOffset)
      );

      setPageCountState(
        Math.ceil(totalEventRecievedState.length / itemsPerPage)
      );
      setLastPreviousEventState(totalEventRecievedState[endOffset]);
    }
  }, [itemOffsetState, itemsPerPage, totalEventRecievedState]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % totalEventsRecieved.length;
    setItemOffsetState(newOffset);
  };

  return (
    <>
      <DisplayedEvents
        currentPageEvents={currentEventsState}
        itemsPerPage={itemsPerPage}
        lastPreviousEvent={lastPreviousEventState}
        oldestTransactionInRangeMinusOne={oldestTransactionInRangeMinusOne}
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
