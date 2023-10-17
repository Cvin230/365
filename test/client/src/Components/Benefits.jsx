import React from 'react';
import css from "../styles/Benefits.module.css"

function Benefits(props) {
  return (
    <div className={css.container}>
        <img src={props.src} alt="" width={60} />
        <p className={css.title}>
            {props.title}
        </p>
        <p className={css.description}>
            {props.description}
        </p>
    </div>
  )
}

export default Benefits;