import axios from "axios";
import { API_KEY } from "./config";

const languageMap = {
  "Arabic": "ar-SA",
  "English": "en-US", 
  "French": "fr-FR",
  "Chinese": "zh-CN"
};

export async function getMovies(category,language, page ) {
  
  const tmdbLanguage = languageMap[language] || "en-US";
  
  const axiosConfig = {
    params: {
      api_key: API_KEY,
      page: page,
      language: tmdbLanguage,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  const endpoint =
    category === "movie"
      ? "https://api.themoviedb.org/3/movie/now_playing"
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