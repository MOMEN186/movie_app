import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { MovieCard } from "../components/MovieCard";
import Spinners from "../components/Spinners";
import TvShowCard from "../components/TvShowCard";
import { getHomeResult } from "../api/home";
import { MovieResult } from "../components/MovieResult";
import Pagination from "../components/Pagination";

export function Home({ category }) {
  const [movies, setMovie] = useState();
  const [isLoading, setLoading] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);


  

  useEffect(() => {
    const URL = category === "movie" ? "/movie/now_playing" : "/tv/popular" ;
          
    setLoading(true);
    console.log(URL);
    getHomeResult(URL,page)
      .then((res) => {
        setMovie(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, [category,page]);


  
  useEffect(() => {
    console.log(movies);
  }, [movies,page]);



  return (
     <div>
        

        <MovieResult shows={movies} isLoading={isLoading}  category={category}/>
        <div style={{ height: "300px", display: "flex", justifyContent: "center" }}>
         <Pagination current={page} setCurrent={setPage} pages={totalPages} />
        </div> 

      </div>
  );
}
