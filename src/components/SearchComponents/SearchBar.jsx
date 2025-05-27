import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate} from "react-router-dom";



export const SearchBar = (props) => {

 const { category} = props;
  const navigate = useNavigate();


  function handleSearch() {
    console.log("searching");
  const searchValue = document.getElementById("search_movie").value
  navigate(`/search/${category}/${searchValue}`)
}
  return (
    <>
     

      <div className="input-group mb-4 mt-3">
        <input
          type="text"
          className="form-control rounded-3  border-warning"
          placeholder="Search"
          id="search_movie"
          //value={input}
          //onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-warning mx-3 rounded-3" onClick={handleSearch}>
           <i class="fas fa-search"></i>
        </button>
      </div>
    </>
    
  )
}
