import { Link } from "react-router";
import NavBar from "./NavBar";

export function Header() {
  return (
    <div style={{display:"flex", flexDirection: "column" , rowGap:"25px"}}>
      <div>
      <ul className="nav justify-content-end bg-warning ">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="#">
            <span className="badge text-bg-light">Home</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="#">
            {" "}
            <span className="badge text-bg-light"> TV Show</span>{" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/moviepages/1">
            {" "}
            <span className="badge text-bg-light"> movies</span>{" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="#">
            {" "}
            <span className="badge text-bg-light"> watch list </span>{" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-disabled="true">
            {" "}
            <span className="badge text-bg-light"> language</span>{" "}
          </Link>
        </li>
      </ul>
      </div>
      <div>
        <NavBar />

      </div>
    </div>
  );
}
