import classes from "./Movie.module.css";
import { Fragment, useEffect, useState } from "react";
import { getTitle } from "../../movie-api";
import useHttp from "../../hooks/use-http";
import Rate from "./Rate";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import ErrorMsg from "../UI/Error/ErrorMsg";
import { countRating } from "../../helpers/countRating";
import noImg from "../../images/noimage.jpg";

const Movie = ({ movieID, onSaveRating, userRatings }) => {
  const { sendRequest, status, data, error } = useHttp(getTitle);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [isProblem, setIsProblem] = useState(false);

  const setModalVisibiltyHandler = (state) => setModalVisibility(state);

  useEffect(() => {
    sendRequest(movieID);
  }, []);

  let movieRating, userRating;

  if (data) {
    const returnedObj = countRating(userRatings, data, movieID);
    movieRating = returnedObj.movieRating;
    userRating = returnedObj.userRating;
  }

  useEffect(() => {
    if (!isProblem) return;

    sendRequest(movieID);

    setTimeout(() => {
      setIsProblem(false);
    }, 3000);
  }, [isProblem]);

  return (
    <Fragment>
      {modalVisibility && (
        <Rate onSaveRating={onSaveRating} onClick={setModalVisibiltyHandler} />
      )}
      <section className={classes.movieDetail__container}>
        <div className={classes.movieDetail__left}>
          {status === "success" && data !== null && (
            <img
              className={classes.leftside__img}
              src={data.img || noImg}
            ></img>
          )}
          {status === "loading" && data === null && <LoadingSpinner />}
          {status === "fail" && data === null && (
            <ErrorMsg onClick={setIsProblem} showButton={true}>
              Problem with <br></br> fetching data
            </ErrorMsg>
          )}
        </div>
        <div className={classes.movieDetail__right}>
          {status === "loading" && data === null && <LoadingSpinner />}
          {status === "fail" && data === null && (
            <ErrorMsg onClick={setIsProblem} showButton={true}>
              Problem with <br></br> fetching data
            </ErrorMsg>
          )}
          {status === "success" && data !== null && (
            <Fragment>
              <h1 className={classes.movieDetail__h1}>{data.title}</h1>
              <div>
                <span className={classes.movie_releaseDate}>
                  Relase date {data.releaseDate}
                </span>
                <ul className={classes.details__list}>
                  {data.genres.map((genre) => (
                    <li key={genre.text} className={classes.details__listEl}>
                      {genre.text}
                    </li>
                  ))}
                </ul>
                <div className={classes.plotContainer}>
                  <p>{data.plot}</p>
                </div>
                <div className={classes.plotContainer}>
                  <p>Cast: {data.actors}</p>
                </div>
                <div className={classes.reviewContainer}>
                  <button
                    onClick={() => setModalVisibiltyHandler(true)}
                    className={classes.reviewBtn}
                  >
                    RATE
                  </button>
                  <div className={classes.ratingsWrapper}>
                    <div className={classes.userRating_wrapper}>
                      <h2>My Rating</h2>
                      <span>{userRating}</span>
                    </div>
                    <div className={classes.movieRating_wrapper}>
                      <h2>Rating</h2>
                      <span>{movieRating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </section>
    </Fragment>
  );
};
export default Movie;
