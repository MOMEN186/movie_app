import { useParams } from 'react-router';
import { SearchResult } from './SearchResult';

function SearchWrapper() {
    const { category, query } = useParams();
  return (
      <SearchResult category={category} query={query} />
  )
}

export default SearchWrapper