import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
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
    const fetchCartoonContent = (isTV = false) => {
      const mediaType = isTV ? 'tv' : 'movie';
      let url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${API_KEY}&with_genres=16&page=${id || 1}`;
  
      // Add kid-friendly filters
      if (isTV) {
        // For TV shows (TV-Y, TV-G, TV-PG)
        url += '&include_adult=false&certification.lte=TV-PG&certification_country=US';
      } else {
        // For movies (G, PG, PG-13)
        url += '&include_adult=false&certification.lte=PG&certification_country=US';
      }
  
      return axios.get(url);
    };
  
    setLoading(true);
  
    if (path.length === 0) {
      // Fetch kid-friendly animated MOVIES
      fetchCartoonContent(false)
        .then(res => {
          setMovie(res.data.results);
          setTotalPages(res.data.total_pages);
        })
        .catch(error => console.error("Error fetching cartoons:", error))
        .finally(() => setLoading(false));
    } else {
      // Fetch kid-friendly animated TV SHOWS
      fetchCartoonContent(true)
        .then(res => {
          setMovie(res.data.results);
          setTotalPages(res.data.total_pages);
        })
        .catch(error => console.error("Error fetching animated TV:", error))
        .finally(() => setLoading(false));
    }
  }, [id, path]);

  return (
    <div>
      <br />
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {isLoading ? (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
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
        style={{ height: "300px", display: "flex", justifyContent: "center" }}
      >
        <Pagination path={path} pages={totalPages} id />
      </div>
    </div>
  );
}