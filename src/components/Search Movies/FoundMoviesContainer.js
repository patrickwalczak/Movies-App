import FoundMovie from "./FoundMovie";
import classes from "./SearchComponent.module.css";

const FoundMoviesContainer = (props) => {
  let content;
  if (props.searchResults.length >= 1) {
    content = (
      <ul className={classes.search__list}>
        {props.searchResults.map((movie) => (
          <FoundMovie
            onGetClickedMovie={props.onGetClickedMovie}
            onClick={props.onClearInput}
            key={movie.id}
            data={movie}
          />
        ))}
      </ul>
    );
  }

  return (
    <div className={classes.foundMoviesContainer}>
      <h5 className={classes.foundMoviesHeader}>
        Results
        <span className={classes.resultsAmount}>
          {props.searchResults.length}
        </span>
      </h5>
      {content}
    </div>
  );
};

export default FoundMoviesContainer;
