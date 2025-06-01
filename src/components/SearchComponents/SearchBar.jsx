import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import  { useState } from "react";


export const SearchBar = (props) => {

 const { category} = props;
 const [input, setInput] = useState("");

  const navigate = useNavigate();


  function handleSearch() {
    console.log("searching",input);
  if (input.trim() === "") {
      return; // Do not navigate if input is empty
    }
  navigate(`/search/${category}/${input}`)
}
  return (
    <>
     

      <div className="input-group mt-3 px-5">
        <input
          type="text"
          className="form-control rounded-3  border-warning"
          placeholder="Search"
          id="search_movie"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-warning mx-3 rounded-3" onClick={handleSearch}>
           <i className="fas fa-search"></i>
        </button>
      </div>
    </>
    
  )
}
