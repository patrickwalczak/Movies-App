import { NavLink } from "react-router-dom";
import SearchMovies from "../Search Movies/SearchMovies";
import classes from "./NavBar.module.css";

const NavBar = (props) => {
  return (
    <nav className={classes.navBar__mainNav}>
      <ul className={classes.navBar__linkList}>
        <li>
          <NavLink
            className={(navData) =>
              navData.isActive ? classes.activeLink : ""
            }
            to="/home"
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) =>
              navData.isActive ? classes.activeLink : ""
            }
            to="/movies"
          >
            MOVIES
          </NavLink>
        </li>
      </ul>
      <SearchMovies onGetClickedMovie={props.onGetClickedMovie} />
    </nav>
  );
};
export default NavBar;
