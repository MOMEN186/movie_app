import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";


export const SearchBar = (props) => {

  
  const { onSearch } = props; 
  const [input, setInput] = useState("");

  function handleSearch() {
    
    
    if (input.trim() === "") {
      onSearch(""); 
      return;
    }
    onSearch(input);
  }

  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="input-group mt-3 px-3">
        <input
          type="text"
          className="form-control rounded-3 border-warning"
          placeholder="Search"
          id="search_movie"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} 
        />
        <button
          className="btn btn-warning mx-3 rounded-3"
          onClick={handleSearch}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
    </>
  );
};