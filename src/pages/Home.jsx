import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MovieCard } from "../components/MovieCard";
import Spinners from "../components/Spinners";
import Pagination from "../components/Pagination";
import { API_KEY } from "../../api/config";
import TvShowCard from "../components/TvShowCard";
export function Home({ path }) {
  const [movies, setMovie] = useState();
  const [isLoading, setLoading] = useState();
  const [totalPages, setTotalPages] = useState(1);
  



  const { id } = useParams();

  useEffect(() => {
    const URL =
      path.length === 0
        ? `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${
            id || 1
          }`
        : `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${
            id || 1
          }`;
    setLoading(true);
    console.log(URL);
    axios
      .get(URL)
      .then((res) => {
        setMovie(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, [id, path]);

  return (
    <div>
      <br />
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            {" "}
            <Spinners />{" "}
          </div>
        ) : (
          movies?.map((movie) => (
            <div className="col" key={movie?.id}>
              {path.length === 0 ? (
                <MovieCard mcard={movie}></MovieCard>
              ) : (
                <TvShowCard mcard={movie}></TvShowCard>
              )}
            </div>
          ))
        )}
      </div>

      <hr />
      <div
        style={{ height: "300px", display: "flex", justifyContent: "center" }}>
        <Pagination path={path} pages={totalPages} id />
      </div>
    </div>
  );
}