import axiosInstance from './config';
import { API_KEY } from './config';

export const getSearchResult = (MovieName,page,category) => axiosInstance.get(`/search/${category}`,{ params :{api_key : API_KEY ,query: MovieName, page: page}});

