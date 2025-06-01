function Pagination(props) {
  
  const {current, setCurrent,pages} = props

  return (
    <div>
      <nav aria-label="Page navigation example ">
        <ul
          className="pagination justify-content-center flex-nowrap overflow-auto"
          style={{ width: "600px" }}
        >
          <li
            className={
              "page-item bg-warning" + (current <= 1 ? " disabled" : "")
            }
            onClick={() => {
              if (current > 1) {
                setCurrent(current - 1);
               
              }
            }}
            aria-disabled={current <= 1}
          >
           <span className="page-link text-warning"> Prev</span>
              
        
          </li>

          {Array.from({ length: 5 }, (_, i) => (
            <li
              onClick={() => {
                setCurrent(current + i);
               
              }}
              key={i + current }
              className="page-item bg-warning"
            >
              
               <span className="page-link text-warning"> {i + current}</span> 
              
            </li>
          ))}
          <li
            onClick={() => {
              setCurrent(current + 1);
               
            }}
            className={
              "page-item bg-warning" + (current === pages ? " disabled" : "")
            }
          >
            
              <span className="page-link text-warning"> next</span>
          
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
