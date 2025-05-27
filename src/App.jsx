import "./App.css";
import MovieDetails from "./pages/MovieDetails";
import FavList from "./pages/FavList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { SearchBar } from "./components/SearchComponents/SearchBar";
import { SearchResult } from "./components/SearchComponents/SearchResult";

function App() {
  return (
    <>
        <Header />
        <div className="container my-5 d-flex">
         
          <Routes>          
            
            <Route path="/tvshow" element={<Home category="tv" />} />
            <Route path="/" element={<Home category="movie"  />} />   
            <Route path="/watchlist" element={<FavList />} /> 
            <Route path="/search/movie/:query" element={<SearchResult category="movie"/>} /> 
            <Route path="/search/tvshow/:query" element={<SearchResult category="tv" />} /> 
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
    </>
  );
}

export default App;
