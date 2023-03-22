import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/actions";
import style from "../Detail/Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const myDetail = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDogs = async () => {
      await dispatch(getDetail(id));
    };

    getDogs();
  }, [dispatch, id]);

  function getTemp(arr) {
    let temp = "";
    arr.map((e) => (temp += e.name + " "));
    let response = temp.substring(0, temp.length - 2);

    return response;
  }

  if (myDetail) {
    return (
      <div className={style.divDet}>
        <div>
          <Link to="/home">
            <button className={style.btnHome}>Home</button>
          </Link>
        </div>
        <div>
          <div className={style.detailText}>
            <h1>{myDetail?.name}</h1>
            <div className={style.info}>
              <p>
                Avg. Height:
                <br />
                {myDetail?.height} Cm.
              </p>
              <p>
                Avg. Weight:
                <br />
                {myDetail?.weight} Kg.
              </p>
              <p>
                Life Span:
                <br />
                {myDetail?.life_span}
              </p>
            </div>
            {!myDetail.temperament?.length ? (
              <h3>
                {" "}
                Temperament:
                <br />
                {myDetail.temperament}
              </h3>
            ) : (
              <p>Temperament: {getTemp(myDetail.temperament)}</p>
            )}

            <img
              className={style.detailImg}
              src={
                myDetail.reference_image_id
                  ? myDetail.reference_image_id
                  : myDetail.image
              }
              alt="imagen"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Detail;
