import classes from "../Home.module.css";
import { useEffect, useState } from "react";
import { getTitle } from "../../../movie-api";
import useHttp from "../../../hooks/use-http";
import LoadingSpinner from "../../UI/Loading Spinner/LoadingSpinner";
import ErrorMsg from "../../UI/Error/ErrorMsg";
import { Link } from "react-router-dom";
import noImg from "../../../images/noimage.jpg";

const RecentRatedMovie = (props) => {
  const { sendRequest, status, data, error } = useHttp(getTitle);
  const [isProblem, setIsProblem] = useState(false);

  useEffect(() => {
    sendRequest(props.movieID);
  }, []);

  useEffect(() => {
    if (!isProblem) return;

    sendRequest();

    setTimeout(() => {
      setIsProblem(false);
    }, 3000);
  }, [isProblem]);

  return (
    <li
      onClick={props.setActiveMovieHandler.bind(null, props.movieID)}
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
              My rate <br></br>
              <span className={`${classes.ratingBig} ${classes.recent}`}>
                {props.userRating}
              </span>
            </span>
          </div>
        </Link>
      )}
      {status === "loading" && data === null && <LoadingSpinner />}
      {status === "fail" && data === null && (
        <ErrorMsg onClick={setIsProblem} showButton={true}>
          Problem with <br></br> fetching data
        </ErrorMsg>
      )}
    </li>
  );
};
export default RecentRatedMovie;
