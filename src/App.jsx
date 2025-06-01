import "./App.css";
import MovieDetails from "./pages/MovieDetails";
import TvShowDetails from "./pages/TvShowDetails"
import FavList from "./pages/FavList";
import { Routes, Route } from "react-router-dom";
import Header from "./components/HeaderComponents/Header";
import Home from "./pages/Home";
import SearchResultWrapper from "./components/SearchComponents/SearchResultWrapper";
import { Provider } from 'react-redux';
import { store } from './app/store';
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <div className="container my-3 d-flex">
          <Routes>          
            <Route path="/tvshow" element={<Home category="tv" />} />
            <Route path="/" element={<Home category="movie" />} />   
            <Route path="/watchlist" element={<FavList />} /> 
            <Route path="/search/:category/:query" element={<SearchResultWrapper />} /> 
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv/:id" element={<TvShowDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;
