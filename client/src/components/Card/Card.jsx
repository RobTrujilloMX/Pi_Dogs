import React from "react";
import style from "../Card/Card.module.css";

const Card = ({ id, name, weight, height, temperament, image, life_span }) => {
  return (
    <div className={style.card}>
      <div className={style.detail}>
        <h2>{name}</h2>
        <p>
          <b>Temperament: </b> {temperament}
        </p>
        <p>
          <b>Avg. weight: </b>
          {weight}Kg
        </p>
      </div>
      <img src={image} className={style.imgCard} alt="Img not found" />
    </div>
  );
};

export default Card;
