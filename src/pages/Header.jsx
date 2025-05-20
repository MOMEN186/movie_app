import { Link } from "react-router";

export function Header() {
  return (
    <ul className="nav justify-content-end bg-warning ">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="#">
          <span className="badge text-bg-light">light</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="#">
          {" "}
          <span className="badge text-bg-light"> TV Show</span>{" "}
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" to="#">
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
  );
}
