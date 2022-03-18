import { useEffect, useState } from "react";
import { getTitles } from "../../movie-api";
import ListElement from "./ListElement";
import classes from "./MovieList.module.css";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import ErrorMsg from "../UI/Error/ErrorMsg";
import FilterForm from "./FilterForm";

const MovieList = (props) => {
  const { sendRequest, status, data, error } = useHttp(getTitles);
  const [page, setPage] = useState(1);
  const [isProblem, setIsProblem] = useState(false);
  const [displayForm, setFormVisibility] = useState(false);
  const [defaultParams, setDefaultParams] = useState("&genre=Sci-Fi&year=2015");

  let content;

  if (status === "success" && data) {
    content = data.map((movieInfo) => (
      <ListElement
        onGetClickedMovie={props.onGetClickedMovie}
        key={movieInfo.id}
        data={movieInfo}
        movieID={props.activeMovie}
        userRatings={props.userRatings}
      />
    ));
  }

  useEffect(() => {
    sendRequest({ page: page, limit: 10, params: defaultParams });
  }, [page, defaultParams]);

  useEffect(() => {
    if (!isProblem) return;

    sendRequest({ page: page, limit: 10, params: defaultParams });

    setTimeout(() => {
      setIsProblem(false);
    }, 3000);
  }, [isProblem]);

  const nextPage = () => {
    if (data.length < 10) return;
    setPage((prevState) => prevState + 1);
  };

  const previousPage = () => {
    if (page === 1) return;
    setPage((prevState) => prevState - 1);
  };

  return (
    <section className={classes.movieList__container}>
      <header className={classes.movieList__header}>
        <h2 className={classes.movieList__h2}>Movie List</h2>
        {status !== "fail" && data !== null && (
          <button
            onClick={() => setFormVisibility(!displayForm)}
            className={classes.movieList__filterBtn}
          >
            Filter
          </button>
        )}
        {displayForm && (
          <FilterForm
            setPage={setPage}
            onSetDefaultParams={setDefaultParams}
            onCloseForm={setFormVisibility}
          />
        )}
      </header>
      {data && (
        <ul className={`${classes.movieList__headerList} ${classes.flexClass}`}>
          <li className={classes.headerList_title}>Title</li>
          <li>Release Date</li>
          <li>Genre</li>
          <li>Rating</li>
        </ul>
      )}
      {data && <ul className={classes.movieList__movieList}>{content}</ul>}
      {data && (
        <div className={classes.paginationContainer}>
          <button className={classes.paginationBtn} onClick={previousPage}>
            Previous
          </button>
          <button className={classes.paginationBtn} onClick={nextPage}>
            Next
          </button>
        </div>
      )}

      {status === "loading" && <LoadingSpinner />}
      {status === "fail" && data === null && (
        <ErrorMsg onClick={setIsProblem} showButton={true}>
          Problem with <br></br> fetching data
        </ErrorMsg>
      )}
    </section>
  );
};
export default MovieList;
