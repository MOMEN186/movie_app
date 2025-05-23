import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MovieCard } from "../components/MovieCard";
import Spinners from "../components/Spinners";
import Pagination from "../components/Pagination";
import TvShowCard from "../components/TvShowCard";
import { useAppSelector } from "../hooks/useRedux";
import { getMovies } from "../api/Movies";

export default function Home({ path }) {
  const [movies, setMovie] = useState();
  const [isLoading, setLoading] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const { id } = useParams();

  const language = useAppSelector((state) => state.language.value);

  useEffect(() => {
    const fetchMovies = async () => {
      console.log(language)
      setLoading(true);
      const res = await getMovies(path,{page:id||1,language});
      setLoading(false);
      setMovie(res.data.results||[]);
      setTotalPages(res.data.total_pages);
    };
    fetchMovies();
  }, [id, path, language]);

  return (
    <div>
      <br />
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {isLoading ? (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Spinners />
          </div>
        ) : (
          movies?.map((movie) => (
            <div className="col" key={movie?.id}>
              {path.length === 0 ? (
                <MovieCard movie={movie}></MovieCard>
              ) : (
                <TvShowCard movie={movie}></TvShowCard>
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
