import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";
import { add, remove } from "../../features/WatchList/WatchListSlice";
import { useNavigate } from "react-router-dom";

export function MovieCard({ movie, mediaType = 'movie' }) {
  const watchList = useAppSelector((state) => state.watchList.value);
  const dispatch = useAppDispatch();
  const isLike = watchList.some(item => item.id === movie.id && item.mediaType === mediaType);
  const navigate = useNavigate();


  console.log(movie)
  const handleLike = () => {
    if (isLike) {
    
      dispatch(remove({ id: movie.id, mediaType }));
    } else {
      dispatch(add({ id: movie.id, mediaType }));
    }
  };
  
  const viewDetails = () => {
    navigate(`/${mediaType}/${movie.id}`);
  };

  return (
    <div className="card h-100">
      <div className="position-relative" style={{ height: "300px" }}>
        <h5 className="text-start position-absolute top-0 start-0 m-2">
          <span className="badge text-bg-warning">
            {mediaType === 'movie' ? 'Movie' : 'TV Show'}
          </span>
        </h5>
        <img
          src={`https://www.themoviedb.org/t/p/w1280/${movie?.backdrop_path}`}
          className="card-img-top img-fluid"
          alt="Movie Poster"
          style={{
            height: "300px",
            objectFit: "cover",
            width: "100%",
            background: "#eee"
          }}
        />
      </div>

      <div className="card-body text-dark">        
        <div className="d-flex justify-content-between">
          <h4 className="card-title text-start">
            {mediaType === 'movie' ? movie?.title || movie.original_language : movie?.name}
          </h4>
          <button onClick={handleLike} className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="gold"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              {isLike ? (
                <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15C-7.534 4.736 3.562-3.248 8 1.314z" />
              ) : (
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <p className="card-text mx-3">
        {movie.overview && movie.overview.length > 100
          ? movie.overview.slice(0, 100) + "...."
          : movie.overview}
      </p>

      <div className="mb-3 d-flex justify-content-center">
        <button 
          className="btn btn-outline-dark bg-warning text-dark mx-5 px-5 rounded-5" 
          onClick={viewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
}