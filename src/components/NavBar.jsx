import { Link } from "react-router";

export default function NavBar() {
  return (
    <div>
      <nav class="nav nav-pills nav-justified">
        <Link
          class="nav-link border border-warning text-warning mx-4"
          aria-current="page"
          to="/"
        >
          Movies
        </Link>
        <Link class="nav-link border border-warning text-warning " to="/tvshow">
          Tv-Shows
        </Link>
      </nav>
    </div>
  );
}
