import  { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/useRedux';
import { MovieCard } from '../components/HomeComponents/MovieCard';
import NavBar from '../components/HeaderComponents/NavBar';
import { getLikedMovies } from '../api/Movies';

function FavList() {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const watchlist = useAppSelector((state) => state.watchList.value);
  const language = useAppSelector((state) => state.language.value);

  useEffect(() => {
    const fetchWatchlistItems = async () => {
      setLoading(true);
      try {
        const results = await getLikedMovies(watchlist);
        console.log(results)
        setWatchlistItems(results.filter(item => item !== null));
          setLoading(false);
      } catch (error) {
        console.error('Error fetching watchlist items:', error);
      }
  
    };

    fetchWatchlistItems();
  }, [watchlist,language]);


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