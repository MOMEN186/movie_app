import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { remove } from '../features/WatchList/WatchListSlice';
import axios from 'axios';
import { API_KEY } from '../api/config';
import { MovieCard } from '../components/HomeComponents/MovieCard';
import NavBar from '../components/HeaderComponents/NavBar';
import { useNavigate } from 'react-router-dom';

function FavList() {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const watchlist = useAppSelector((state) => state.watchList.value);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchWatchlistItems = async () => {
      setLoading(true);
      try {
        const itemPromises = watchlist.map(async (item) => {
          const endpoint = item.mediaType === 'movie' ? 'movie' : 'tv';
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/${endpoint}/${item.id}?api_key=${API_KEY}`
            );
            return { ...response.data, mediaType: item.mediaType };
          } catch (error) {
            console.error(`Failed to fetch ${item.mediaType} with ID ${item.id}:`, error);
            return null;
          }
        });

        const results = await Promise.all(itemPromises);
        setWatchlistItems(results.filter(item => item !== null));
      } catch (error) {
        console.error('Error fetching watchlist items:', error);
      }
      setLoading(false);
    };

    fetchWatchlistItems();
  }, [watchlist]);

  const formatTitle = (item) => {
    if (item.mediaType === 'movie') {
      return item.title || item.original_title;
    }
    return item.name || item.original_name;
  };

  const handleItemClick = (item) => {
    const path = item.mediaType === 'movie' ? `/movie/${item.id}` : `/tvshow/${item.id}`;
    navigate(path);
  };

  const handleRemove = (e, item) => {
    e.stopPropagation();
    dispatch(remove({ id: item.id, mediaType: item.mediaType }));
  };

  return (
    <div className="container">
      <NavBar />
      <h2 className="my-4">My Watchlist</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : watchlistItems.length === 0 ? (
        <div className="text-center my-5">
          <h3>Your watchlist is empty</h3>
          <p>Start adding movies and TV shows to your watchlist to see them here!</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {watchlistItems.map(item => (
            <div key={item.id} className="col">
              <MovieCard movie={item} mediaType={item.mediaType} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavList;