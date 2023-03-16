import React from "react";
import { Link } from "react-router-dom";
import style from "../Landing/Landing.module.css"

const Landing = () => {
return(
  <div className={style.landing}>
    <Link to = "/home">
    <button className={style.button}>Enter</button>
    </Link>
  </div>
)
}


export default Landing;