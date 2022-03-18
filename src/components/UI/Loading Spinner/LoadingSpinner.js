import classes from "./LoadingSpinner.module.css";
import spinnerImg from "../../../images/loadingSpinner.png";

const LoadingSpinner = () => {
  return (
    <div className={classes.spinnerWrapper}>
      <img className={classes.loadingSpinner} src={spinnerImg}></img>
    </div>
  );
};
export default LoadingSpinner;
