// src/pages/ShowDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { add, remove } from "../features/WatchList/WatchListSlice";

import StarRating from "../components/ShowDetailsComponents/StarRating";
import ReviewCarousel from "../components/ShowDetailsComponents/ReviewCarousel";
import MediaSlider from "../components/ShowDetailsComponents/MediaSlider";

import { getMovieDetails } from "../api/Movies";

function ShowDetails() {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);

  const dispatch = useAppDispatch();
  const watchlist = useAppSelector((state) => state.watchList.value);
  const language = useAppSelector((state) => state.language.value);

  const isLiked = item
    ? watchlist.some(
        (w) => w.id === item.id && w.mediaType === category
      )
    : false;

  // Common labels:
  const titleText = category === "movie" ? item?.title : item?.name;
  const dateText =
    category === "movie"
      ? item?.release_date
      : item?.first_air_date;

  const handleLike = () => {
    if (!item) return;
    if (isLiked) {
      dispatch(remove({ id: item.id, mediaType: category }));
    } else {
      dispatch(add({ id: item.id, mediaType: category }));
    }
  };

  useEffect(() => {
    if (!id || !category) return;

    async function fetchDetails() {
      try {
        // 1) Fetch main details
        const res = await getMovieDetails({
          id,
          query: "",
          language,
          category,
        });
        setItem(res.data);
      } catch (err) {
        console.error("Error fetching details:", err);
      }
    }

    async function fetchRecommendations() {
      try {
        const res = await getMovieDetails({
          id,
          query: "recommendations",
          language,
          category,
        });
        // TMDB’s recommendations endpoint returns { results: […] }
        setRecommendations(res.data.results || []);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      }
    }

    async function fetchReviews() {
      try {
        const res = await getMovieDetails({
          id,
          query: "reviews",
          language,
          category,
        });
        // TMDB’s reviews endpoint returns { results: […] }
        setReviews(res.data.results || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    }

    fetchDetails();
    fetchRecommendations();
    fetchReviews();
  }, [id, category, language]);

    
    useEffect(() => {
        console.log(recommendations)
    },[recommendations])
  return (
    <div className="container py-4">
      {item && (
        <>
          <div className="row mb-4">
            <div className="col-md-3 mb-4 mx-3">
              <img
                src={`https://www.themoviedb.org/t/p/w1280/${item.poster_path}`}
                className="img-fluid rounded shadow"
                alt={titleText}
              />
            </div>

            <div className="col-md-8 mx-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="mb-0">{titleText}</h2>
                <button className="btn btn-secondary p-2" onClick={handleLike}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="gold"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    {isLiked ? (
                      <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15C-7.534 4.736 3.562-3.248 8 1.314z" />
                    ) : (
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    )}
                  </svg>
                </button>
              </div>

              <p className="text-muted mb-3">{dateText}</p>

              <div className="mb-4">
                <StarRating
                  rating={item.vote_average}
                  voteCount={item.vote_count}
                />
              </div>

              <div className="mb-4">
                <p className="lead">{item.overview}</p>
              </div>

              <div className="mb-4">
                <h5 className="mb-2">Genres</h5>
                <div className="d-flex flex-wrap gap-2">
                  {item.genres?.map((genre) => (
                    <button
                      key={genre.id}
                      type="button"
                      className="btn btn-warning"
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                {category === "movie" ? (
                  <div className="d-flex gap-4">
                    <div>
                      <span className="fw-bold">Duration: </span>
                      <span>{item.runtime} Min</span>
                    </div>
                    <div>
                      <span className="fw-bold">Languages: </span>
                      <span>
                        {item.spoken_languages?.map((lang, idx) => (
                          <span key={lang.iso_639_1}>
                            {idx > 0 && ", "}
                            {lang.english_name}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="mb-1">
                      <strong>First Episode Date: </strong>
                      {item.first_air_date}
                    </p>
                    <p className="mb-1">
                      <strong>Seasons: </strong>
                      {item.number_of_seasons}
                      {"  "}
                      <strong>Episodes: </strong>
                      {item.number_of_episodes}
                    </p>
                    <p>
                      <strong>Languages: </strong>
                      {item.spoken_languages?.map((lang, idx) => (
                        <span key={lang.iso_639_1}>
                          {idx > 0 && ", "}
                          {lang.english_name}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  {item.production_companies
                    ?.filter((c) => c.logo_path)
                    .map((company) => (
                      <img
                        key={company.id}
                        src={`https://www.themoviedb.org/t/p/w200/${company.logo_path}`}
                        className="img-fluid"
                        style={{
                          width: "auto",
                          height: "2.5em",
                          maxWidth: "100px",
                        }}
                        alt={company.name}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>

          <hr />

          {/* Reviews Section */}
          {reviews.length === 0 ? (
            <div className="mb-4 p-3">
              <h4>There are no reviews yet.</h4>
            </div>
          ) : (
            <div className="row mb-4" style={{ marginLeft: "1em" }}>
              <ReviewCarousel reviews={reviews} title="Reviews" />
            </div>
          )}

          <hr />

          {/* Recommendations Slider */}
          <div className="row" style={{ marginLeft: "1em" }}>
            <MediaSlider
              recommendations={recommendations}
              mediaType={category}
              title="Recommendations"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ShowDetails;
