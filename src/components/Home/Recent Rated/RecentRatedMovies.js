import classes from "../Home.module.css";
import RecentRatedMovie from "./RecentRatedMovie";
const RecentRatedMovies = ({ recentRated, setActiveMovieHandler }) => {
  let content = (
    <ul className={`${classes.homeMovies__list} ${classes.recent}`}>
      {recentRated.map((movie) => (
        <RecentRatedMovie
          setActiveMovieHandler={setActiveMovieHandler}
          userRating={movie.rating}
          key={Math.random()}
          movieID={movie.id}
        />
      ))}
    </ul>
  );

  return (
    <div className={classes.homeMovies__sectionContainer}>
      <h2 className={classes.homeMovies__sectionHeader}>Recent Rated Movies</h2>
      {content}
    </div>
  );
};
export default RecentRatedMovies;
