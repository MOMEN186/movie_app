import { Link } from "react-router";
import {SearchBar} from "./SearchComponents/SearchBar";
import { useState } from "react";

export default function NavBar() {

  const [category, setCategory] = useState("movie");

  return (
    <div>
      <nav class="nav nav-pills nav-justified">
        <Link
          class="nav-link border border-warning text-warning mx-4"
          aria-current="page"
          onClick={() => setCategory("movie")}
          to="/"
        >
          Movies
        </Link>
        <Link class="nav-link border border-warning text-warning " to="/tvshow" 
          onClick={() => setCategory("tvshow")} >
          Tv-Shows
        </Link>
      </nav>
      <SearchBar category={category} />
    </div>
  );
}
