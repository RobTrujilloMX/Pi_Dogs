import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabeticSort,
  filterBySource,
  filterDogsByTemps,
  getDogs,
  getTemperaments,
  weightSort,
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import style from "../Home/Home.module.css";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs); //Bring all breeds from reducer...
  const temperament = useSelector((state) => state.temperament);

  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const curretDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handlerClick = (e) => {
    e.preventDefault();
    dispatch(getDogs());
  };

  const handlerFilterByTemps = (e) => {
    e.preventDefault();
    dispatch(filterDogsByTemps(e.target.value));
    setCurrentPage(1);
  };

  const handlerFilterSource = (e) => {
    e.preventDefault();
    dispatch(filterBySource(e.target.value));
    setCurrentPage(1);
  };

  const handlerSortWeight = (e) => {
    e.preventDefault();
    dispatch(weightSort(e.target.value));
    setCurrentPage(1);
    setOrder(`Sorted by ${e.target.value}`);
  };

  const handlerSortAlpha = (e) => {
    e.preventDefault();
    dispatch(alphabeticSort(e.target.value));
    setCurrentPage(1);
    setOrder(`Sorted by ${e.target.value}`);
  };

  

  

  return (
    <div className={style.mainHome}>
      <button //The refresh button...
        onClick={(e) => handlerClick(e)}
        className={style.btnRefresh}
      >
        Refresh
      </button>

      <div className={style.searchBar}>
            <SearchBar  setCurrentPage={setCurrentPage} allDogs={allDogs}/>
            <Link to="/create">
              {" "}
              <button className={style.btnCreate}>Create dog</button>
            </Link>
          </div>
      <div className={style.filtersBar}>
        <select onChange={(e) => handlerSortAlpha(e)} className={style.filterSelect2}>
          <option hidden>Alphabetic</option>
          <option value="asc">Asc</option>
          <option value="des">Desc</option>
        </select>
        <select onChange={(e) => handlerSortWeight(e)} className={style.filterSelect2}>
          <option hidden>Weight</option>
          <option value="asc">Min to max</option>
          <option value="desc">Max to min</option>
        </select>
        <select onChange={(e) => handlerFilterByTemps(e)} className={style.filterSelect2}>
          <option hidden>Temperaments</option>
          <option value="all">All</option>
          {temperament?.map((temp) => {
            return(
              <option value={temp.name} key={temp.id}>
                {temp.name}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => handlerFilterSource(e)} className={style.filterSelect2}>
          <option hidden>Created in</option>
          <option value="all">All</option>
          <option value="api">Api</option>
          <option value="db">Db</option>
        </select>
      </div>
      <Pagination
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        pagination={pagination}
      />

      <div className={style.card}>
        {curretDogs?.map((el) => {
          return (
            <div className={style.cardDetail} key={el.id}>
              <Link to={"/home/" + el.id} id={style.link}>
                <button className={style.btnDetail}>Detail</button>
              </Link>
              <Card
                name={el.name}
                image={el.image}
                weight={el.weight}
                temperament={el.temperament}
                key={el.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
