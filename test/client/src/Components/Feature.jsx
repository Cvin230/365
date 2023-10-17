import React from 'react';
import css from "../styles/Feature.module.css"

function Feature(props) {
  return (
    <div className={css.container}>
        <p className={css.title}>
            {props.title}
        </p>
        <p className={css.description}>
            {props.description}
        </p>
    </div>
  )
}

export default Feature;