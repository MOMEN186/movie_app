import React, { createContext, useState, useContext, useEffect } from 'react';
import { getMovies } from '../api/Movies'; // تأكدي من المسار الصحيح لدالة getMovies

const TvShowsContext = createContext();

export const TvShowsProvider = ({ children }) => {
  const [tvShows, setTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // هنا ممكن نفلتر الأنواع اللي عايزاها بالظبط تاني لو API_CONFIG مش كافي
  const desiredTvRecommendationGenres = [16, 99, 10762]; // Animation, Documentary, Kids
  const excludedGenres = [18, 28, 35, 80, 9648, 10749, 53, 878, 12, 14, 27, 36, 37, 10752];

  const fetchAndFilterTvShows = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let page = 1;
      let allFilteredShows = [];
      const seenIds = new Set();
      const MAX_PAGES_TO_FETCH = 5; // ممكن تزوديها لو عايزة قاعدة بيانات أكبر للمسلسلات

      while (page <= MAX_PAGES_TO_FETCH && allFilteredShows.length < 500) { // Limit total items for performance
        const response = await getMovies("tv", "Arabic", page); // استخدمي اللغة المناسبة هنا
        const rawShows = response.data.results || [];

        const filteredBatch = rawShows.filter(item => {
          const hasDesired = item.genre_ids?.some(g => desiredTvRecommendationGenres.includes(g));
          const hasExcluded = item.genre_ids?.some(g => excludedGenres.includes(g));

          return (
            !seenIds.has(item.id) &&
            !item.adult &&
            hasDesired &&
            !hasExcluded
          );
        });

        filteredBatch.forEach(item => {
          allFilteredShows.push(item);
          seenIds.add(item.id);
        });

        if (rawShows.length === 0) break; // لو مفيش نتائج في الصفحة، وقف جلب
        page++;
      }
      setTvShows(allFilteredShows);
    } catch (err) {
      console.error("Failed to fetch and filter TV shows:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndFilterTvShows();
  }, []); // [] عشان تتنفذ مرة واحدة لما المكون يتعمل له mount

  return (
    <TvShowsContext.Provider value={{ tvShows, isLoading, error, refreshTvShows: fetchAndFilterTvShows }}>
      {children}
    </TvShowsContext.Provider>
  );
};

export const useTvShows = () => useContext(TvShowsContext);