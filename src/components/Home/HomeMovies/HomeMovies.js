import classes from "../Home.module.css";
import MovieElement from "./MovieElement";
import { useEffect, useState } from "react";
import { getTitles } from "../../../movie-api";
import useHttp from "../../../hooks/use-http";
import LoadingSpinner from "../../UI/Loading Spinner/LoadingSpinner";
import ErrorMsg from "../../UI/Error/ErrorMsg";

const HomeMovies = (props) => {
  const { sendRequest, status, data, error } = useHttp(getTitles);
  const [isProblem, setIsProblem] = useState(false);

  let content;

  if (status === "success" && data) {
    content = (
      <ul className={`${classes.homeMovies__list} ${classes.normalSection}`}>
        {data.map((movie) => (
          <MovieElement
            setActiveMovieHandler={props.setActiveMovieHandler}
            data={movie}
            key={Math.random()}
            status={status}
            userRatings={props.userRatings}
          />
        ))}
      </ul>
    );
  }

  useEffect(() => {
    sendRequest({ page: 5, limit: 5, params: "&genre=Sci-Fi&year=2015" });
  }, []);

  useEffect(() => {
    if (!isProblem) return;

    sendRequest({ page: 5, limit: 5, params: "&genre=Sci-Fi&year=2015" });

    setTimeout(() => {
      setIsProblem(false);
    }, 3000);
  }, [isProblem]);

  return (
    <div className={classes.homeMovies__sectionContainer}>
      <h2 className={classes.homeMovies__sectionHeader}>Sci-fi Movies</h2>
      {content}
      {status === "loading" && data === null && <LoadingSpinner />}
      {status === "fail" && data === null && (
        <ErrorMsg onClick={setIsProblem} showButton={true}>
          Problem with <br></br> fetching data
        </ErrorMsg>
      )}
    </div>
  );
};
export default HomeMovies;
