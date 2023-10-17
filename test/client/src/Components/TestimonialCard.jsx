import React from "react";
import css from "../styles/TestimonialCard.module.css";
import star from "../Assets/favourite.png";

function TestimonialCard(props) {
  return (
    <div className={css.container}>
      <p className={css.name}>{props.name}</p>
      <p className={css.review}>{props.review}</p>
      <div className={css.rating}>
        <img src={star} alt="" width={15} />
        <img src={star} alt="" width={15} />
        <img src={star} alt="" width={15} />
        <img src={star} alt="" width={15} />
        <img src={star} alt="" width={15} />
      </div>
    </div>
  );
}

export default TestimonialCard;
