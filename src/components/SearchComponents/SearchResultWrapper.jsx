import { useParams } from "react-router-dom";
import { SearchResult } from "./SearchResult";

function SearchResultWrapper() {
  const { category, query } = useParams();
  return <SearchResult category={category} query={query} />;
}

export default SearchResultWrapper;