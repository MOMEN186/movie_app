import axios from "axios";
import { API_CONFIG ,API_KEY} from "./config";
import { languageMap } from "./config";


export async function getMovies(category,language, page ) {
  
  const tmdbLanguage = languageMap[language] || "en-US";
  
  const axiosConfig = {
    params: {
      ...API_CONFIG,
      page: page,
      language: tmdbLanguage,     
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  const endpoint =
    category === "movie"
      ? "https://api.themoviedb.org/3/discover/movie"

      : "https://api.themoviedb.org/3/tv/popular";


  try {
    const res = await axios.get(endpoint, axiosConfig);
    return res;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function getMovieDetails(id) {
    const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  
  const result = await axios.get(api);
  return result;
}

export async function getMovieRecommendations(id) {
  const recommendApi = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`;

  const result = await axios.get(recommendApi);
  return result;
}

export async function getMovieReviews(id) {
    const reviewsApi = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
  const result = await axios.get(reviewsApi);
  return result;

}