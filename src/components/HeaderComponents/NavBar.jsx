import { Link, useLocation } from "react-router-dom";
import {SearchBar} from "../SearchComponents/SearchBar"; // Keep this import
import { useState, useEffect } from "react";

export default function NavBar(props) { // Accept props
  const { onSearch } = props; // Receive onSearch from Home component

  const [category, setCategory] = useState("movie");
  const location = useLocation();

  useEffect(() => {
    // Update category based on current route
    if (location.pathname.startsWith("/tvshow")) {
      setCategory("tv");
    } else {
      setCategory("movie");
    }
  }, [location]);

  return (
    <div className="my-4">
      <nav className="nav nav-pills nav-justified">
        <Link
          className={`nav-link border border-warning mx-2 ${category === "movie" ? "active bg-warning" : "text-warning"}`}
          aria-current="page"
          onClick={() => setCategory("movie")}
          to="/"
        >
          Movies
        </Link>
        <Link
          className={`nav-link border border-warning ${category === "tv" ? "active bg-warning" : "text-warning"}`}
          to="/tvshow"
          onClick={() => setCategory("tv")}
        >
          Tv-Shows
        </Link>
      </nav>
      {/* Pass the onSearch function received from Home to the SearchBar */}
      <SearchBar onSearch={onSearch} category={category} />
    </div>
  );
}
//