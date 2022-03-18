import { Link } from "react-router-dom";
import classes from "../Home.module.css";
import LoadingSpinner from "../../UI/Loading Spinner/LoadingSpinner";
import ErrorMsg from "../../UI/Error/ErrorMsg";
import noImg from "../../../images/noimage.jpg";
import { countRating } from "../../../helpers/countRating";

const HomeMovie = ({ data, status, setActiveMovieHandler, userRatings }) => {
  let movieRating;
  if (data) {
    const returnedObj = countRating(userRatings, data, data.id);
    movieRating = returnedObj.movieRating;
  }

  return (
    <li
      onClick={setActiveMovieHandler.bind(null, data.id)}
      className={classes.homeMovies__element}
    >
      {status === "success" && data !== null && (
        <Link to="/movie">
          <img
            src={data.img || noImg}
            className={classes.homeMovies__img}
          ></img>
          <div className={classes.detailsContainer}>
            <h3 className={classes.homeMovies__h3}>
              {data.title} <br></br> {data?.year ? `(${data.year})` : ""}
            </h3>
            <span className={classes.ratingHeader}>
              RATING <br></br>
              <span className={`${classes.ratingBig} ${classes.normal}`}>
                {movieRating}
              </span>
            </span>
          </div>
        </Link>
      )}
      {status === "loading" && data === null && <LoadingSpinner />}
      {status === "fail" && data === null && (
        <ErrorMsg showButton={false}>
          Problem with <br></br> fetching data
        </ErrorMsg>
      )}
    </li>
  );
};
export default HomeMovie;
