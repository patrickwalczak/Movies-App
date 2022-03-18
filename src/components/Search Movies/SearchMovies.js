import { useEffect, useRef, useState } from "react";
import classes from "./SearchComponent.module.css";
import FoundMoviesContainer from "./FoundMoviesContainer";
import searchImg from "../../images/search.png";
import loadingSpinnerImg from "../../images/loadingSpinner.png";
import { searchByQuery } from "../../movie-api";
import useHttp from "../../hooks/use-http";

const SearchMovies = (props) => {
  const { sendRequest, status, data, error } = useHttp(searchByQuery);

  const [searchInputValue, setSearchInputValue] = useState("");

  const inputRef = useRef();

  const onClearInput = () => {
    setSearchInputValue("");
    inputRef.current.value = "";
  };

  const onChangeHandler = () => {
    setSearchInputValue(inputRef.current.value.trim());
  };

  const displayLoadingSpinner = status === "loading" && searchInputValue && (
    <img className={classes.loadingSpinner} src={loadingSpinnerImg}></img>
  );

  const displayClearInputBtn = searchInputValue && status !== "loading" && (
    <button className={classes.clearInputBtn} onClick={onClearInput}>
      x
    </button>
  );

  useEffect(() => {
    if (!searchInputValue) return;
    sendRequest(searchInputValue);
  }, [searchInputValue]);

  return (
    <div className={classes.searchContainer}>
      <div className={classes.inputSearchContainer}>
        <label htmlFor="searchField">
          <img className={classes.searchImg} src={searchImg}></img>
        </label>
        <input
          onChange={onChangeHandler}
          id="searchField"
          className={classes.searchInput}
          type="text"
          maxLength="30"
          placeholder="Type movie title"
          ref={inputRef}
          // onBlur={onClearInput}
        ></input>
        {displayClearInputBtn}
        {displayLoadingSpinner}
      </div>

      {status === "success" && searchInputValue && data.length !== 0 && (
        <FoundMoviesContainer
          onGetClickedMovie={props.onGetClickedMovie}
          searchResults={data}
          onClearInput={onClearInput}
          status={status}
        />
      )}
      {status === "success" && !data.length && !error && searchInputValue && (
        <div className={classes.foundNoElConta}>
          <p>No movies found</p>
        </div>
      )}
      {status === "fail" && error && searchInputValue && (
        <div className={classes.foundNoElConta}>
          <p>Problem with fetching data</p>
        </div>
      )}
    </div>
  );
};

export default SearchMovies;
