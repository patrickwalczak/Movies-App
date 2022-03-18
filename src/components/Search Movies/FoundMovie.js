import classes from "./SearchComponent.module.css";
import { Link } from "react-router-dom";
import noImg from "../../images/noimage.jpg";

const FoundMovie = ({ data, onGetClickedMovie, onClick }) => {
  const onClickHandler = () => {
    onGetClickedMovie(data.id);
    onClick();
  };

  return (
    <li onClick={onClickHandler} className={classes.foundMovie}>
      <Link to="/movie">
        <div className={classes.search__imgContainer}>
          <img
            src={data.img || noImg}
            className={classes.search__movieImg}
          ></img>
        </div>
        <div className={classes.search__movieDetail}>
          <h6 className={classes.foundTitle}>{data.title}</h6>
          <span className={classes.foundYear}>{data.year}</span>
        </div>
      </Link>
    </li>
  );
};

export default FoundMovie;
