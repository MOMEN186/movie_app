import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import { MovieCard } from "./MovieCard";

export function MoviePages() {
  const [movies, setMovie] = useState();

  const params = useParams()
  console.log(params)

//   const [page, setPage] = useState();
    

  
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=c518f6c498a7f61fd433ed2a85544c50&page=5&page=${params.id}`
      )
      .then((res) => setMovie(res.data.results.slice(0,8)))
      // .then((res) => console.log(res.data.results))
      .catch((res) => console.log(res));

  }, [params]);

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {movies?.map((movie) => (
          <div className="col" key={movie?.id}>

            <MovieCard mcard={movie} ></MovieCard>




            {/* <div className="card  h-200">
              <img
                src={`https://www.themoviedb.org/t/p/w1280/${movie?.backdrop_path}`}
                className="card-img-top img-fluid "
                alt="..."
              />
              <div className="card-body">
                <h4 className="card-title text-start ">
                  {movie?.original_title}
                </h4>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div> */}
          </div>
        ))}
      </div>

      <hr />

      <nav aria-label="Page navigation example ">
        <ul className="pagination justify-content-center ">
          <li className="page-item ">
            <Link className="page-link" to="/moviepages/1" >
            Previous
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="/moviepages/2">
              2
            </Link>
          </li>
          <li className="page-item ">
            <Link className="page-link" to="/moviepages/3">
              3
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="/moviepages/4">
              4
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="/moviepages/5">
              5
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="/moviepages/6">
              6
            </Link>
          </li>


          <li className="page-item">
            <Link className="page-link" to="/moviepages/7">
              Next
            </Link>
          </li>
        </ul>
      </nav>



    </div>
  );
}


