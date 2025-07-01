import { useState, useEffect } from "react";
import { MovieResult } from "../components/HomeComponents/MovieResult";
import Pagination from "../components/HomeComponents/Pagination";
import NavBar from "../components/HeaderComponents/NavBar"; 
import { useAppSelector } from "../hooks/useRedux";
import { getMovies } from "../api/Movies";

export default function Home({ category }) {
  const [originalMovies, setOriginalMovies] = useState([]); 
  const [displayedMovies, setDisplayedMovies] = useState([]); 
  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 

  const language = useAppSelector((state) => state.language.value);

  
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const result = await getMovies(category, language, page);
        setOriginalMovies(result.data.results); 
        setTotalPages(result.data.total_pages);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setOriginalMovies([]); 
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [category, page, language]);

  
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setDisplayedMovies(originalMovies); 
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = originalMovies.filter((item) =>
        (item.title && item.title.toLowerCase().includes(lowercasedSearchTerm)) || 
        (item.name && item.name.toLowerCase().includes(lowercasedSearchTerm))     
      );
      setDisplayedMovies(filtered);
    }
  }, [originalMovies, searchTerm]); 

  
  useEffect(() => {
    setPage(1);
    setSearchTerm("");
  }, [category]);

  
  const handleSearchBarSearch = (input) => {
    setSearchTerm(input);
  };

  return (
    <div className="container">
      <div>
        
        
        <NavBar onSearch={handleSearchBarSearch} />
      </div>

      {isLoading && displayedMovies.length === 0 && searchTerm === "" && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>Loading content...</div>
      )}

      {!isLoading && displayedMovies.length === 0 && searchTerm !== "" && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>No results found for "{searchTerm}" in the current content.</div>
      )}

      <MovieResult shows={displayedMovies} isLoading={isLoading} category={category} />

      
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