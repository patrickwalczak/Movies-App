import classes from "./ErrorMsg.module.css";
const ErrorMsg = (props) => {
  const onClickHandler = () => {
    props.onClick(true);
  };

  return (
    <div className={classes.errorWrapper}>
      <p className={classes.para}>{props.children}</p>
      {props.showButton && (
        <button className={classes.tryAgainBtn} onClick={onClickHandler}>
          Try again
        </button>
      )}
    </div>
  );
};
export default ErrorMsg;
