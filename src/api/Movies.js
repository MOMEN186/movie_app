import axios from "axios";
import { API_CONFIG, API_KEY } from "./config";
import { languageMap } from "./config";

function getEndpoint(category) {
  if (category === "movie")
    return "https://api.themoviedb.org/3/discover/movie";
  else return "https://api.themoviedb.org/3/tv/popular";
}

function getDetailsEndPoint(category) {
   if (category=== "movie") {
      return  `https://api.themoviedb.org/3/movie/`;
    } else{
    return  `https://api.themoviedb.org/3/tv/`;
    }
}

export async function getMovies(category, language, page) {
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

  const endpoint = getEndpoint(category);

  try {
    const res = await axios.get(endpoint, axiosConfig);
    return res;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function getMovieDetails(id) {
  const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

  const result = await axios.get(api);
  return result;
}

export async function getMovieRecommendations(id) {
  const recommendApi = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`;

  const result = await axios.get(recommendApi);
  return result;
}

export async function getMovieReviews(id) {
  const reviewsApi = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`;
  const result = await axios.get(reviewsApi);
  return result;
}

export async function getTvShowDetails(id) {
  const api = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;
  const result = await axios.get(api);
  return result;
}

export async function getTvShowRecommendations(id) {
  const recommendApi = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}`;
  const result = await axios.get(recommendApi);
  return result;
}

export async function getTvShowReviews(id) {
  const reviewsApi = `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${API_KEY}`;
  const result = await axios.get(reviewsApi);
  return result;
}

export async function getLikedMovies(watchlist, language) {
  const tmdbLanguage = languageMap[language] || "en-US";

  const itemPromises = watchlist.map(async (item) => {
    const endpoint = getDetailsEndPoint(item.mediaType)+item.id;
    const axiosConfig = {
      params: {
        ...API_CONFIG,
        language: tmdbLanguage,
        id: item.id,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(endpoint, axiosConfig);
      return { ...response.data, mediaType: item.mediaType };
    } catch (error) {
      console.error(
        `Failed to fetch ${item.mediaType} with ID ${item.id}:`,
        error
      );
      return null;
    }
  });

  const results = await Promise.all(itemPromises);
  return results;
}
