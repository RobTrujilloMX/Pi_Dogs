import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/actions";
import style from "../Detail/Detail.module.css";

const Detail = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [props.match.params, dispatch]);

  const myDog = useSelector((state) => state.detail);

  return (
    <div className={style.divDet}>
      <div>
        <Link to="/home">
          <button className={style.btnHome}>Home</button>
        </Link>
      </div>
      <div className={style.detailText}>
        <h1>Name: {myDog?.name}</h1>
        <div className={style.info}>
          <h4>Avg. height: {myDog.height} Cm</h4>
          <h4>Avg weight: {myDog.weight} Kg</h4>
          <h4>Life span: {myDog.life_span}</h4>
          <p>
            <b>Temperament:</b>{" "}
            {!myDog.createdByUser
              ? myDog.temperament
              : myDog.temperaments.map((el) => el.name + ", ")}
          </p>
        </div>
        <br />
        <img className={style.detailImg} src={myDog.image} alt="Not found" />
      </div>
    </div>
  );
};

export default Detail;
