import React from "react";
import { MovieCard } from "./MovieCard";
import Spinners from "./Spinners";
import Pagination from "./Unused/Pagination";
import TvShowCard from "./TvShowCard";
import { useEffect } from "react";

export const MovieResult = (props) => {
  const { shows, isLoading, category } = props;

  useEffect(() => {
    console.log("hellllo", shows);
  }, [shows]);

  return (
    <>
     
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {isLoading ? (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {" "}
            <Spinners />{" "}
          </div>
        ) : (
          shows?.map((show) => (
            <div className="col" key={show?.id}>
              {category === "movie" ? (
                <MovieCard mcard={show}></MovieCard>
              ) : (
                <TvShowCard mcard={show}></TvShowCard>
              )}
            </div>
          ))
        )}
      </div>

      <hr />
    </>
  );
};
