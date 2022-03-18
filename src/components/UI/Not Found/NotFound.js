import classes from "./NotFound.module.css";
const NotFound = () => {
  return (
    <div className={classes.noFound}>
      <p className={classes.para}>
        PAGE NOT <br></br> FOUND
      </p>
    </div>
  );
};
export default NotFound;
