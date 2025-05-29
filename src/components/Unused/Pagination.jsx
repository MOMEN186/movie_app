import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

function Pagination({ path, pages, id }) {
  const [current, setCurrent] = useState(1);

    
  return (
    <div>
      <nav aria-label="Page navigation example ">
        <ul
          className="pagination justify-content-center flex-nowrap overflow-auto"
          style={{ width: "600px" }}
        >
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
            <Link
              className="page-link text-warning"
              to={`${path}/${Math.max(current - 1, 1)}`}
              tabIndex={current <= 1 ? -1 : 0}
            >
              Prev
            </Link>
          </li>

          {Array.from({ length: 5 }, (_, i) => (
            <li
              onClick={() => {
                setCurrent(current + i);
              }}
              key={i + current }
              className="page-item bg-warning"
            >
              <Link
                className="page-link text-warning"
                to={`${path}/${i + current }`}
              >
                {i + current}
              </Link>
            </li>
          ))}
          <li
            onClick={() => {
              setCurrent(current + 1);
            }}
            className={
              "page-item bg-warning" + (current === pages ? " disabled" : "")
            }
          >
            <Link
              className="page-link text-warning"
              to={`${path}/${current + 1}`}
            >
              next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
