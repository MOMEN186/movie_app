import { useState, useEffect } from "react";
import { MovieResult } from "../components/HomeComponents/MovieResult";
import Pagination from "../components/HomeComponents/Pagination";
import NavBar from "../components/HeaderComponents/NavBar";
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
  
    getMovies(category,language,page)
      .then((res) => {
        setMovie(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, [category,page,language]);



  return (
     <div>
        
        <div>
        <NavBar />
      </div>
        <MovieResult shows={movies} isLoading={isLoading}  category={category}/>
        <div style={{ height: "300px", display: "flex", justifyContent: "center" }}>
         <Pagination current={page} setCurrent={setPage} pages={totalPages} />
        </div> 

      </div>
  );
}