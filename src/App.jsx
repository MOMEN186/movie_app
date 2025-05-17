import "./App.css";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import TvShow from "./pages/TvShow";
import FavList from "./pages/FavList";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

function App() {

  useEffect(()=>{console.log("app.jsx")},[])
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tvshow/:id" element={<TvShow />} />
        <Route path="/watchlist" element={<FavList />} />
      </Routes>
    </div>
  );
}

export default App;
