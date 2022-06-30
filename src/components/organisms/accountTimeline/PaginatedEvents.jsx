import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import "./styles.css";

// Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function DisplayedEvents(props) {
  const DisplayedEventsArray = props.DisplayedEventsArray;
  const itemsPerPage = props.itemsPerPage;
  return (
    // <h3>Hello</h3>
    <>
      {DisplayedEventsArray &&
        DisplayedEventsArray.map((item) => <div>{item.Balance}</div>)}
    </>
  );
}

export default function PaginatedEvents(props) {
  const totalEventsRecieved = props.totalEventsToDisplay;
  const itemsPerPage = props.itemsPerPage;

  // We start with an empty list of items.
  const [currentEventsState, setCurrentEventsState] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentEventsState(totalEventsRecieved.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(totalEventsRecieved.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % totalEventsRecieved.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <DisplayedEvents
        DisplayedEventsArray={currentEventsState}
        itemsPerPage={itemsPerPage}
      />

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
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
