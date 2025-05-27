import { useState, useEffect } from 'react'
import {getSearchResult} from '../../api/Search';
import { useParams } from 'react-router-dom';
import { MovieResult } from './MovieResult';
import { MovieCard } from '../MovieCard';
import  PaginationSearch  from './PaginationSearch';
import { SearchBar } from './SearchBar';

export const SearchResult = ({category}) => {

    const [searchResult, setSearchResult] = useState([]);
     const [page, setPage] = useState(1);
     const [totalPages, setTotalPages] = useState(1);
    const params = useParams();

    useEffect(() => {
        console.log("query : " ,params.query);
        getSearchResult(params.query, page,category)
            .then((res) => {
                setSearchResult(res.data.results);
                setTotalPages(res.data.total_pages);

            })
            .catch((error) => {
                console.log(error);
            });
    }, [params.query,page,category])


    useEffect(() => { 
        console.log(searchResult)
        console.log("total pages", totalPages);

    }, [searchResult,totalPages]);
  return (
    
         
    
    <div>
        <p className="justify-content-start"> Search Results for : {params.query} </p>

        <MovieResult shows={searchResult} isLoading={false}  category={category}/>
        <div style={{ height: "300px", display: "flex", justifyContent: "center" }}>
        <PaginationSearch current={page} setCurrent={setPage} pages={totalPages} />
      </div> 
        

    </div>
    
    
    
   
  )
}



// handle pages