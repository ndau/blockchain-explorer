import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import TimelineEvent from "../../molecules/timelineEvent";
import "./styles.css";

// Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function DisplayedEvents(props) {
  const currentPageEvents = props.currentPageEvents;
  const lastPreviousEvent = props.lastPreviousEvent;
  console.log(lastPreviousEvent, "lastPreviousEvent");
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
  console.log(totalEventsRecieved, "totalEventsRecieved");

  const itemsPerPage = props.itemsPerPage;

  const [currentEventsState, setCurrentEventsState] = useState(null);
  const [pageCountState, setPageCountState] = useState(0);
  const [lastPreviousEventState, setLastPreviousEventState] = useState(null);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffsetState, setItemOffsetState] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffsetState + itemsPerPage;
    console.log(`Loading items from ${itemOffsetState} to ${endOffset}`);

    setCurrentEventsState(
      totalEventsRecieved.slice(itemOffsetState, endOffset)
    );

    setPageCountState(Math.ceil(totalEventsRecieved.length / itemsPerPage));
    setLastPreviousEventState(totalEventsRecieved[endOffset]);
  }, [itemOffsetState, itemsPerPage, totalEventsRecieved]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
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
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCountState}
        previousLabel="< previous"
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
