import { useState, useEffect } from "react";
import { MovieResult } from "../components/HomeComponents/MovieResult";
import Pagination from "../components/HomeComponents/Pagination";
import NavBar from "../components/HeaderComponents/NavBar"; // Keep NavBar import
import { useAppSelector } from "../hooks/useRedux";
import { getMovies } from "../api/Movies";

export default function Home({ category }) {
  const [originalMovies, setOriginalMovies] = useState([]); // Stores the original fetched data
  const [displayedMovies, setDisplayedMovies] = useState([]); // Stores data currently displayed (filtered by search)
  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // To hold the current search term

  const language = useAppSelector((state) => state.language.value);

  // useEffect to fetch data based on category, page, and language
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const result = await getMovies(category, language, page);
        setOriginalMovies(result.data.results); // Set original fetched data
        setTotalPages(result.data.total_pages);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setOriginalMovies([]); // Clear movies on error
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [category, page, language]);

  // useEffect to update displayedMovies when originalMovies or searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setDisplayedMovies(originalMovies); // If no search term, display all original movies
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = originalMovies.filter((item) =>
        (item.title && item.title.toLowerCase().includes(lowercasedSearchTerm)) || // For movies
        (item.name && item.name.toLowerCase().includes(lowercasedSearchTerm))     // For TV shows
      );
      setDisplayedMovies(filtered);
    }
  }, [originalMovies, searchTerm]); // Rerun when original data or search term changes

  // Reset page to 1 and clear search term when category changes
  useEffect(() => {
    setPage(1);
    setSearchTerm("");
  }, [category]);

  // Function to handle search initiated from SearchBar (via NavBar)
  const handleSearchBarSearch = (input) => {
    setSearchTerm(input);
  };

  return (
    <div className="container">
      <div>
        {/* Pass the handleSearchBarSearch function to the NavBar */}
        {/* NavBar will then pass it down to SearchBar */}
        <NavBar onSearch={handleSearchBarSearch} />
      </div>

      {isLoading && displayedMovies.length === 0 && searchTerm === "" && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>Loading content...</div>
      )}

      {!isLoading && displayedMovies.length === 0 && searchTerm !== "" && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>No results found for "{searchTerm}" in the current content.</div>
      )}

      <MovieResult shows={displayedMovies} isLoading={isLoading} category={category} />

      {/* Hide pagination if a search term is active */}
      {searchTerm.trim() === "" && totalPages > 1 && (
        <div
          style={{ height: "300px", display: "flex", justifyContent: "center" }}
        >
          <Pagination current={page} setCurrent={setPage} pages={totalPages} />
        </div>
      )}
    </div>
  );
}