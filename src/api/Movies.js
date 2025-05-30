import axios from "axios";
import { API_CONFIG } from "./config";
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
    console.log(res.data)
    return res;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}