import { useState } from "react";
import {Link} from 'react-router';
export default function TvShowCard(props) {
  console.log(props);
  const { mcard } = props;
  const [isLike, setIsLike] = useState(true);

  return (
    <div className="card w-150 mb-4 bg-secondary">
        <div className="position-relative " >


      <h5 className="text-start position-absolute top-0 start-0 m-2">
        <span className="badge text-bg-warning">Tv-Show</span>
      </h5>
      <Link to={`/tvShow/${mcard.id}`}>
      <img
        src={`https://www.themoviedb.org/t/p/w1280/${mcard?.backdrop_path}`}
        className="card-img-top img-fluid "
        alt="..."
      />
      </Link>
      

        </div>




      <div className="card-body text-light">
        <h4 className="card-title text-start ">{mcard?.name}</h4>
        <br />

        <div className="row d-flex text-start">
          <div className="col-8">{mcard?.first_air_date	}</div>
          <div className="col-4">
            <button className="btn btn-secondary" onClick={() => setIsLike(!isLike)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gold"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                {isLike === true ? (
                  <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15C-7.534 4.736 3.562-3.248 8 1.314z" />
                ) : (
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

