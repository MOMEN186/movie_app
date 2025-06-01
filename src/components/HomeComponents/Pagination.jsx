import React from "react";

function Pagination({ current, setCurrent, pages }) {

  const getPageNumbers = () => {
    const total = pages;
    const maxButtons = 5;
    if (total <= maxButtons) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (current >= total - 2) {
      return [
        total - 4,
        total - 3,
        total - 2,
        total - 1,
        total,
      ];
    }
    return [
      current - 2,
      current - 1,
      current,
      current + 1,
      current + 2,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Page navigation example">
      <ul
        className="pagination justify-content-center flex-nowrap overflow-auto"
        style={{ width: "600px" }}
      >
        {/* Prev button */}
        <li
          className={
            "page-item bg-warning" + (current <= 1 ? " disabled" : "")
          }
          onClick={() => {
            if (current > 1) {
              setCurrent(current - 1);
            }
          }}
          aria-disabled={current <= 1}
        >
          <span className="page-link text-warning">Prev</span>
        </li>

        {/* Page-number buttons */}
        {pageNumbers.map((pageNum) => (
          <li
            key={pageNum}
            className={
              "page-item bg-warning" + (pageNum === current ? " active" : "")
            }
            onClick={() => {
              if (pageNum !== current) {
                setCurrent(pageNum);
              }
            }}
          >
            <span className="page-link text-warning">{pageNum}</span>
          </li>
        ))}

        {/* Next button */}
        <li
          className={
            "page-item bg-warning" + (current >= pages ? " disabled" : "")
          }
          onClick={() => {
            if (current < pages) {
              setCurrent(current + 1);
            }
          }}
          aria-disabled={current >= pages}
        >
          <span className="page-link text-warning">Next</span>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
