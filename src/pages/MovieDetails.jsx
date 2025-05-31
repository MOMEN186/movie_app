import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router'
import {API_KEY} from '../api/config'
import axios from 'axios'
import StarRating from '../components/ShowDetailsComponents/StarRating'
import MovieSlider from '../components/ShowDetailsComponents/MovieSlider'
import MovieReview from '../components/ShowDetailsComponents/MovieReview'

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [isLike, setIsLike] = useState(true);
  

  const params = useParams()
  const api = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}`
  const recommendApi = `https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=${API_KEY}`
  const reviewsApi = `https://api.themoviedb.org/3/movie/${params.id}/reviews?api_key=${API_KEY}`

  
  useEffect(() => {
    axios.get(api)
    .then((res) => (setMovie(res.data)))
    .catch((err) => (console.log(err)))
  },[params.id])

  useEffect(() =>{
    axios.get(recommendApi)
    .then((res) => setRecommendations(res.data))
    .catch((err) => console.log(err))
  },[params.id])

  useEffect(() => {
    axios.get(reviewsApi)
    .then((res) => setReviews(res.data))
    .catch((err) => console.log(err))
  },[params.id])

  return (
    <div className="container py-4">
      <div className="row mb-5">
        <div className="col-md-3 mb-4 mx-3">
          <img 
            src={`https://www.themoviedb.org/t/p/w1280/${movie?.poster_path}`} 
            className="img-fluid rounded shadow"
            alt={movie?.original_title}
          />
        </div>
        
        <div className="col-md-8 mx-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="mb-0">{movie?.original_title}</h2>
            <button 
              className="btn btn-secondary p-2"
              onClick={() => setIsLike(!isLike)}
            >
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
          
          <p className="text-muted mb-3">{movie?.release_date}</p>
          
          <div className="mb-4">
            <StarRating rating={movie?.vote_average} voteCount={movie?.vote_count} />
          </div>
          
          <div className="mb-4">
            <p className="lead">{movie?.overview}</p>
          </div>
          
          <div className="mb-4">
            <h5 className="mb-2">Genres</h5>
            <div className="d-flex flex-wrap gap-2">
              {movie?.genres?.map((genre) => (
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
            <div className="d-flex gap-4">
              <div>
                <span className="fw-bold">Duration: </span>
                <span>{movie?.runtime} Min</span>
              </div>
              <div>
                <span className="fw-bold">Languages: </span>
                <span>
                  {movie?.spoken_languages?.map((language, index) => (
                    <span key={language.iso_639_1}>
                      {index > 0 && ', '}
                      {language.english_name}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="d-flex flex-wrap gap-3 align-items-center">
              {movie?.production_companies?.map((company) => (
                company.logo_path && (
                  <img 
                    key={company.id} 
                    src={`https://www.themoviedb.org/t/p/w200/${company.logo_path}`} 
                    className="img-fluid"
                    style={{width:"auto", height:"2.5em", maxWidth:"100px"}}
                    alt={company.name}
                  />
                )
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr/>
      {reviews?.results.length===0? <div className="mb-1 p-3">
        <h4>There is no reviews yet..</h4> <hr/>
      </div>: <div>
      <div className="row mb-4" style={{marginLeft:"1em"}}>
        <MovieReview reviews={reviews}/>
      </div>
      <hr/>
      </div>}
      
      
      <div className="row " style={{marginLeft:"1em"}}>

        <MovieSlider recommendations={recommendations}/>
      </div>
      
    </div>
  )
}

export default MovieDetails