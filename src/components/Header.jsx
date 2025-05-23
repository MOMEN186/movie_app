import { Link } from "react-router";
import NavBar from "./NavBar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setLanguage } from "../features/language/LanguageSlice";
const languages = ["Arabic", "English", "French", "Chinese"];

export default function Header() {
  const language = useAppSelector((state) => state.language.value);
  const dispatch = useAppDispatch();

  const handleChange = (newLang) => {
    dispatch(setLanguage(newLang));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "25px" }}>
      <div>
        <ul className="nav justify-content-end bg-warning ">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              <span className="badge text-bg-light">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/watchlist">
              <span className="badge text-bg-light"> watchList </span>
            </Link>
          </li>
          <NavDropdown title={language} id="nav-dropdown">
            {languages.map((lang, index) => (
              <NavDropdown.Item key={index} onClick={() => handleChange(lang)}>
                {lang}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </ul>
      </div>
      <div>
        <NavBar />
      </div>
    </div>
  );
}