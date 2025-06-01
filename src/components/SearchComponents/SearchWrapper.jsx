import { useParams } from 'react-router';
import { SearchBar } from './SearchBar';

function SearchWrapper() {
      const { category, query } = useParams();

  return (
      <SearchBar category={category} query={query} />
  )
}

export default SearchWrapper