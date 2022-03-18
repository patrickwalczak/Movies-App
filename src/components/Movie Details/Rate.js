import Modal from "../UI/Modal/Modal";
import classes from "./Rate.module.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RateWrapper = (props) => {
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);

  const disableBtn = number ? false : true;

  const rateBtnClass = disableBtn ? "disabled" : "active";

  const starStyling = {
    color: "orange",
    width: "3rem",
    height: "3rem",
    cursor: "pointer",
  };

  const getRatingHandler = () => {
    props.onSaveRating(number);
    props.onClick(false);
    navigate("/home", { replace: true });
  };

  return (
    <Modal onClick={props.onClick}>
      <div className={classes.rate__container}>
        <button
          onClick={() => props.onClick(false)}
          className={classes.closeBtn}
        >
          X
        </button>
        <h2 className={classes.rate__h2}>Rate movie</h2>
        <div>
          {Array(10)
            .fill()
            .map((_, index) =>
              number >= index + 1 || hoverStar >= index + 1 ? (
                <AiFillStar
                  key={index}
                  onMouseOver={() => !number && setHoverStar(index + 1)}
                  onMouseLeave={() => setHoverStar(undefined)}
                  style={starStyling}
                  onClick={() => setNumber(index + 1)}
                />
              ) : (
                <AiOutlineStar
                  key={index}
                  onMouseOver={() => !number && setHoverStar(index + 1)}
                  onMouseLeave={() => setHoverStar(undefined)}
                  style={starStyling}
                  onClick={() => setNumber(index + 1)}
                />
              )
            )}
        </div>

        <button
          onClick={getRatingHandler}
          className={`${classes.rate__btn} ${classes[rateBtnClass]}`}
        >
          RATE
        </button>
      </div>
    </Modal>
  );
};
export default RateWrapper;
