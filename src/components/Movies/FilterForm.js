import { useEffect, useState } from "react";
import classes from "./FilterForm.module.css";
const FilterForm = (props) => {
  const [errMsg, setErrMsg] = useState("");
  const [enteredYear, setEnteredYear] = useState("");
  const [enteredStartYear, setStartYear] = useState("");
  const [enteredEndYear, setEndYear] = useState("");
  const [genre, setGenre] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (enteredYear && (enteredStartYear || enteredEndYear))
      return setErrMsg("Select one year or data range");

    if (
      (enteredYear && +enteredYear <= 1920) ||
      (enteredStartYear && +enteredStartYear <= 1920) ||
      (enteredEndYear && +enteredEndYear <= 1920)
    )
      return setErrMsg("Entered year is too low");

    if (
      +enteredYear > 2022 ||
      +enteredStartYear > 2022 ||
      +enteredEndYear > 2022
    )
      return setErrMsg("Entered year is too high");

    if (
      (enteredYear && enteredYear.length !== 4) ||
      (enteredStartYear && enteredStartYear.length !== 4) ||
      (enteredEndYear && enteredEndYear.length !== 4)
    )
      return setErrMsg("Entered year must be 4 characters long");

    if (
      enteredStartYear &&
      (enteredEndYear < enteredStartYear || enteredEndYear === enteredStartYear)
    )
      return setErrMsg("Start year cannot be greter than end year");

    const yearParam = enteredYear ? `&year=${enteredYear}` : "";

    const startYearParam = enteredStartYear
      ? `&startYear=${enteredStartYear}`
      : "";
    const startEndParam = enteredEndYear ? `&endYear=${enteredEndYear}` : "";

    const genreParam = genre ? `&genre=${genre}` : "";

    const filterParams =
      genreParam + yearParam + startYearParam + startEndParam;
    if (filterParams) {
      props.setPage(1);
      props.onSetDefaultParams(filterParams);
    }
    props.onCloseForm(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (errMsg) {
        setErrMsg("");
      }
    }, 1500);
  }, [errMsg]);

  return (
    <form className={classes.filterForm__container}>
      <div className={classes.filter__block}>
        <label htmlFor="genre" className={classes.filterLabel__genre}>
          Genre
        </label>
        <select
          onChange={(e) => setGenre(e.target.value)}
          className={classes.filterSelect}
          id="genre"
        >
          <option value="">-</option>
          <option value="Action">Action</option>
          <option value="Adult">Adult</option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
          <option value="Biography">Biography</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Documentary">Documentary</option>
          <option value="Drama">Drama</option>
          <option value="Family">Family</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Film-Noir">Film-Noir</option>
          <option value="Game-Show">Game-Show</option>
          <option value="History">History</option>
          <option value="Horror">Horror</option>
          <option value="Music">Music</option>
          <option value="Musical">Musical</option>
          <option value="Mystery">Mystery</option>
          <option value="News">News</option>
          <option value="Reality-TV">Reality-TV</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Short">Short</option>
          <option value="Sport">Sport</option>
          <option value="Talk-Show">Talk-Show</option>
          <option value="Thriller">Thriller</option>
          <option value="War">War</option>
          <option value="Western">Western</option>
        </select>
      </div>

      <div className={classes.filter__block}>
        <label className={classes.filterLabel__genre}>Year</label>
        <input
          onChange={(e) => setEnteredYear(e.target.value)}
          className={classes.filterSelect}
          type="number"
          min={1920}
          max={2022}
        ></input>
      </div>
      <div className={classes.filter__block}>
        <div className={classes.dataRange__block}>
          <label htmlFor="startYear" className={classes.filterLabel__genre}>
            Start Year
          </label>
          <input
            onChange={(e) => setStartYear(e.target.value)}
            className={classes.filterSelect}
            type="number"
            min={1920}
            max={2022}
            id="startYear"
          ></input>
        </div>
        <div className={classes.dataRange__block}>
          <label htmlFor="endYear" className={classes.filterLabel__genre}>
            End Year
          </label>
          <input
            onChange={(e) => setEndYear(e.target.value)}
            className={classes.filterSelect}
            type="number"
            min={1920}
            max={2022}
            id="endYear"
          ></input>
        </div>
      </div>
      <button onClick={onSubmitHandler} className={classes.saveFiltersBtn}>
        Save
      </button>
      {errMsg !== "" && <p className={classes.errorMsg__filter}>{errMsg}</p>}
    </form>
  );
};
export default FilterForm;
