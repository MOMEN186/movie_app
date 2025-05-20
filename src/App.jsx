import "./App.css";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import TvShow from "./pages/TvShow";
import FavList from "./pages/FavList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./pages/Header";
import { MoviePages } from "./pages/MoviePages";

function App() {
  useEffect(() => {
    console.log("app.jsx");
  }, []);
  return (
    <div>
      {/* <BrowserRouter> */}
        <Header></Header>
        <div className="container my-5 d-flex">
          
          <Routes>
            <Route path="/" element={<Home></Home>} />
            {/* <Route path="/:id" element={<Home />} /> */}
            <Route path="/moviepages/:id" element={<MoviePages></MoviePages>} ></Route>
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tvshow/:id" element={<TvShow />} />
            <Route path="/watchlist" element={<FavList />} />
          </Routes>
        </div>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
