import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks/useRedux';
import { MovieCard } from '../components/HomeComponents/MovieCard';
import NavBar from '../components/HeaderComponents/NavBar';

function FavList() {
  const watchlist = useAppSelector((state) => state.watchList.value);

  useEffect(() => { console.log(watchlist) }, [watchlist])
  
  return (
    <div className="container">
      <NavBar />
      <h2 className="my-4">My Watchlist</h2>
      {
       watchlist.length === 0 ? (
        <div className="text-center my-5">
          <h3>Your watchlist is empty</h3>
          <p>Start adding movies and TV shows to your watchlist to see them here!</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {watchlist.map(item => (
            <div key={item.movie.id} className="col">
              <MovieCard movie={item.movie} mediaType={item.mediaType} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavList;