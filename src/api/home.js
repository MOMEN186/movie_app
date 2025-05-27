import axiosInstance from './config';
import { API_KEY } from './config';

export const getHomeResult = (url,page) => axiosInstance.get(url,{ params :{api_key : API_KEY , page: page}});
