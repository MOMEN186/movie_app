import { useState, useEffect } from 'react'
import {getSearchResult} from '../../api/Search';
import { MovieResult } from '../HomeComponents/MovieResult';
import { MovieCard } from '../HomeComponents/MovieCard';
import  Pagination  from '../HomeComponents/Pagination';
import { SearchBar } from './SearchBar';
import { useAppSelector } from '../../hooks/useRedux';


export const SearchResult = ({category,query}) => {

    const [searchResult, setSearchResult] = useState([]);
     const [page, setPage] = useState(1);
     const [isLoading, setLoading] = useState();
     const [totalPages, setTotalPages] = useState(1);
   
    const language = useAppSelector((state) => state.language.value);
    

    useEffect(() => {
        console.log("query : " ,query);
        setLoading(true);
        getSearchResult(query, page,category,language)
            .then((res) => {
                setSearchResult(res.data.results);
                setTotalPages(res.data.total_pages);

            })
            .then(() => setLoading(false))
            .catch((error) => {
                console.log(error);
            });
    }, [query,page,category,language]);


    useEffect(() => { 
        console.log(searchResult)
        console.log("total pages", totalPages);

    }, [searchResult,totalPages]);
  return (
    
         
    
    <div>
         <h3 className="justify-content-start mb-4"> Search Results for : {query} </h3> 

        <MovieResult shows={searchResult} isLoading={isLoading}  category={category}/>
        <div style={{ height: "300px", display: "flex", justifyContent: "center" }}>
         <Pagination current={page} setCurrent={setPage} pages={totalPages} />
        </div> 

      </div>
    
    
    
   
  )
}



// handle pages