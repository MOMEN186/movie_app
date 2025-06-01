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
function getConfig(language) {
      return  {
      params: {
        ...API_CONFIG,
        language: language,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
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

export async function getMovieDetails({id, category,query, language}) {

    const tmdbLanguage = languageMap[language] || "en-US";
  let endpoint = getDetailsEndPoint(category) + id;
  if (query!==undefined && query?.length>0) endpoint += `/${query}`;

  try {
      const result = await axios.get(endpoint,getConfig(tmdbLanguage));
    return result;
  }
  catch (e) {
    console.log(e);
  }
}





export async function getLikedMovies(watchlist, language) {
  const tmdbLanguage = languageMap[language] || "en-US";

  const itemPromises = watchlist.map(async (item) => {
    const endpoint = getDetailsEndPoint(item.mediaType)+item.id;

    try {
      const response = await axios.get(endpoint,getConfig(tmdbLanguage));
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
