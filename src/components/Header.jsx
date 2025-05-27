import { Link } from "react-router";
import NavBar from "./NavBar";

export function Header() {
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "25px" }}>
      <div>
        <ul className="nav  bg-warning ">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              <span className="badge text-bg-light">Home</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link active" to="/watchlist">
              <span className="badge text-bg-light"> watch list </span>
            </Link>
          </li>
          <li className="nav-item">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Language 
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <a className="dropdown-item active" href="#">
                    Arabic
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    English 
                  </a>
                </li>
               
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <NavBar />
      </div>
    </div>
  );
}
