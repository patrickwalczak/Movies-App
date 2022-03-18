import classes from "./Home.module.css";
import HomeMovies from "./HomeMovies/HomeMovies";
import RecentRatedMovies from "./Recent Rated/RecentRatedMovies";
const Home = ({ recentRated, setActiveMovieHandler, userRatings }) => {
  return (
    <div className={classes.home__container}>
      <HomeMovies
        userRatings={userRatings}
        setActiveMovieHandler={setActiveMovieHandler}
      />
      {recentRated.length !== 0 && (
        <RecentRatedMovies
          setActiveMovieHandler={setActiveMovieHandler}
          recentRated={recentRated}
        />
      )}
    </div>
  );
};
export default Home;
