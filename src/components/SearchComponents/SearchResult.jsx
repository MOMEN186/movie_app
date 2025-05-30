import { useState, useEffect } from 'react'
import {getSearchResult} from '../../api/Search';
import { useParams } from 'react-router-dom';
import { MovieResult } from '../HomeComponents/MovieResult';
import { MovieCard } from '../HomeComponents/MovieCard';
import  Pagination  from '../HomeComponents/Pagination';
import { SearchBar } from './SearchBar';

export const SearchResult = ({category}) => {

    const [searchResult, setSearchResult] = useState([]);
     const [page, setPage] = useState(1);
     const [isLoading, setLoading] = useState();
     const [totalPages, setTotalPages] = useState(1);
    const params = useParams();

    useEffect(() => {
        console.log("query : " ,params.query);
        setLoading(true);
        getSearchResult(params.query, page,category)
            .then((res) => {
                setSearchResult(res.data.results);
                setTotalPages(res.data.total_pages);

            })
            .then(() => setLoading(false))
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
         <h3 className="justify-content-start mb-4"> Search Results for : {params.query} </h3> 

        <MovieResult shows={searchResult} isLoading={isLoading}  category={category}/>
        <div style={{ height: "300px", display: "flex", justifyContent: "center" }}>
         <Pagination current={page} setCurrent={setPage} pages={totalPages} />
        </div> 

      </div>
    
    
    
   
  )
}



// handle pages