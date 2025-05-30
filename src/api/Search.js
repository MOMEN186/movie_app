import axiosInstance, { API_CONFIG } from './config';
import { languageMap } from './config';

export const getSearchResult = (MovieName,page,category,language) => axiosInstance.get(`/search/${category}`,{ params :{...API_CONFIG  ,query: MovieName, page: page,language:languageMap[language] || "en-US"}});

