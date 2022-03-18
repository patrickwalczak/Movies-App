import { Link } from "react-router-dom";
import { countRating } from "../../helpers/countRating";
import classes from "./MovieList.module.css";
import noImg from "../../images/noimage.jpg";
const ListElement = ({ data, onGetClickedMovie, userRatings }) => {
  const releaseDate =
    data.releaseDate?.day && data.releaseDate?.month && data.releaseDate?.year
      ? `${String(data.releaseDate.day).padStart(2, 0)}-${String(
          data.releaseDate.month
        ).padStart(2, 0)}-${data.releaseDate.year}`
      : "NO INFORMATION";

  const genres = !data?.genres ? "NOT SPECIFIED" : data.genres.genres[0].text;

  const clickHandler = (e) => {
    onGetClickedMovie(e.target.closest("li").dataset.id);
  };

  let movieRating;

  if (data) {
    const returnedObj = countRating(userRatings, data, data.id);
    movieRating = returnedObj.movieRating;
  }

  return (
    <li
      onClick={clickHandler}
      data-id={data.id}
      className={`${classes.movieList__movie}`}
    >
      <Link to="/movie">
        <div className={classes.movie__title_img__container}>
          <img className={classes.minImg} src={data.img || noImg}></img>
          <h3 className={classes.movieList__movie_h3}>{data?.title}</h3>
        </div>

        <span className={classes.movieList__movie_date}>{releaseDate}</span>
        <span className={classes.movieList__movie_genre}>{genres}</span>
        <span className={classes.movieList__movie_rating}>{movieRating}</span>
      </Link>
    </li>
  );
};
export default ListElement;
