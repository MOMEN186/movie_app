import { MovieCard } from "./MovieCard";
import Spinners from "./Spinners";
export const MovieResult = (props) => {
  const { shows, isLoading, category } = props;

  return (
    <>
      <div className="row row-cols-xs-1 row-cols-md-3 row-cols-lg-4 row-cols-sm-2 g-4">
        {isLoading ? (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Spinners />
          </div>
        ) : (
          shows?.map((show) => (
            <div className="col" key={show?.id}>
              {<MovieCard movie={show} mediaType={category} />}
            </div>
          ))
        )}
      </div>

      <hr />
    </>
  );
};
