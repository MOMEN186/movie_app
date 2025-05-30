import axios from 'axios';

export const API_KEY = import.meta.env.VITE_API_KEY;

export const languageMap = {
  "Arabic": "ar-EG",
  "English": "en-US", 
  "French": "fr-FR",
  "Chinese": "zh-CN"
};
export const API_CONFIG = {
      api_key: API_KEY,
      with_original_language : "ar" ,
      region : "EG" ,
      "primary_release_date.gte": "2020-01-01",
      "primary_release_date.lte": "2025-12-31"
};
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
});

export default axiosInstance;