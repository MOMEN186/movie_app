import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { MovieCard } from "../components/MovieCard";
import Spinners from "../components/Spinners";

import { getHomeResult } from "../api/home";
import { MovieResult } from "../components/MovieResult";
import Pagination from "../components/Pagination";

import { useAppSelector } from "../hooks/useRedux";
import { getMovies } from "../api/Movies";

export default function Home({ category }) {
  const [movies, setMovie] = useState();
  const [isLoading, setLoading] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);


  
  const language = useAppSelector((state) => state.language.value);

  useEffect(() => {
    const URL = category === "movie" ? "/movie/now_playing" : "/tv/popular" ;
          
    setLoading(true);
    console.log(URL);
    getHomeResult(URL,page)
      .then((res) => {
        console.log("res",res.data);
        setMovie(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, [category,page,language]);


  
  useEffect(() => {
    console.log("movieeees",movies);
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
