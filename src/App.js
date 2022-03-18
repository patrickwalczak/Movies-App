import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Movie from "./components/Movie Details/Movie";
import MovieList from "./components/Movies/MovieList";
import NavBar from "./components/Nav/NavBar";
import NotFound from "./components/UI/Not Found/NotFound";

function App() {
  const [activeMovie, setActiveMovie] = useState(null);
  const [userRatings, setUserRatings] = useState([]);
  const [recentRated, setRecentRated] = useState([]);

  const setActiveMovieHandler = (movieID) => {
    setActiveMovie(movieID);
  };

  const saveRatingHandler = (rating) => {
    const checkIfAlreadyIs = userRatings.find(
      (ratedMovie) => ratedMovie.id === activeMovie
    );

    if (!checkIfAlreadyIs) {
      setUserRatings((prevState) => {
        localStorage.setItem(
          "moviesRating",
          JSON.stringify([{ rating, id: activeMovie }, ...prevState])
        );
        return [{ rating, id: activeMovie }, ...prevState];
      });
      setRecentRated((prevState) => [
        { rating, id: activeMovie },
        ...prevState,
      ]);
    } else {
      const index = userRatings.findIndex(
        (ratedMovie) => ratedMovie.id === activeMovie
      );

      setUserRatings((prevState) => {
        const arrCopy = prevState.slice();
        arrCopy[index] = { ...checkIfAlreadyIs, rating: rating };
        localStorage.setItem("moviesRating", JSON.stringify(arrCopy));
        return [...arrCopy];
      });

      setRecentRated((prevState) => {
        const arrCopy = prevState.slice();
        arrCopy[index] = { ...checkIfAlreadyIs, rating: rating };
        return [...arrCopy];
      });
    }

    setActiveMovieHandler(null);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("moviesRating"));
    if (!data) return;
    setUserRatings(data);
  }, []);

  return (
    <div className="appContainer">
      <NavBar onGetClickedMovie={setActiveMovieHandler} />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route
          path="/movies"
          element={
            <MovieList
              movieID={activeMovie}
              userRatings={userRatings}
              onGetClickedMovie={setActiveMovieHandler}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Home
              setActiveMovieHandler={setActiveMovieHandler}
              recentRated={recentRated}
              userRatings={userRatings}
            />
          }
        />
        {activeMovie && (
          <Route
            path="/movie"
            element={
              <Movie
                userRatings={userRatings}
                onSaveRating={saveRatingHandler}
                movieID={activeMovie}
              />
            }
          />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
