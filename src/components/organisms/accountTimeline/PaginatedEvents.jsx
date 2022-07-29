import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import TimelineEvent from "../../molecules/timelineEvent";
import "./PaginatedEvents.modules.css";

function DisplayedEvents(props) {
  const currentPageEvents = props.currentPageEvents;
  const lastPreviousEvent = props.lastPreviousEvent;

  return (
    <>
      {currentPageEvents &&
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
            />
          );
        })}
    </>
  );
}

export default function PaginatedEvents(props) {
  const totalEventsRecieved = props.totalEventsToDisplay;
  // console.log(totalEventsRecieved, "totalEventsRecieved");

  const itemsPerPage = props.itemsPerPage;

  const [totalEventRecievedState, setTotalEventRecievedState] = useState(null);
  const [currentEventsState, setCurrentEventsState] = useState(null);
  const [pageCountState, setPageCountState] = useState(0);
  const [lastPreviousEventState, setLastPreviousEventState] = useState(null);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffsetState, setItemOffsetState] = useState(0);

  useEffect(() => {
    console.log(totalEventsRecieved, "totalEventsRecieved useEffect");
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
    console.log(event, "clicked");
    const newOffset =
      (event.selected * itemsPerPage) % totalEventsRecieved.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffsetState(newOffset);
  };

  return (
    <>
      <DisplayedEvents
        currentPageEvents={currentEventsState}
        itemsPerPage={itemsPerPage}
        lastPreviousEvent={lastPreviousEventState}
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
