import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
// No longer needs useNavigate as it won't navigate directly

export const SearchBar = (props) => {
  // We no longer need 'category' directly in SearchBar for navigation
  // const { category } = props;
  const { onSearch } = props; // Receive the onSearch function from NavBar
  const [input, setInput] = useState("");

  function handleSearch() {
    // Call the onSearch function passed from the parent (NavBar)
    // This function will eventually reach the Home component
    if (input.trim() === "") {
      onSearch(""); // Pass empty string to reset search and show all content
      return;
    }
    onSearch(input);
  }

  // Allow search on 'Enter' key press
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
          onKeyPress={handleKeyPress} // Add key press handler
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