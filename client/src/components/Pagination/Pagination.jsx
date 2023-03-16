import React from "react";
import style from "../Pagination/Pagination.module.css";

const pagination = ({ dogsPerPage, allDogs, pagination, currentPage }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i);
  }

// const prevPage = () => {
//   if (currentPage > 1) {
//     currentPage--;
//   }
// };

// const nextPage = () => {
//   if (currentPage < pageNumber) {
//     currentPage++;
//   }
// };




  return (
    <nav className={style.mainContainer}>
      <ul className={style.pagination}>
        {pageNumber?.map((number) => {
          return (
            <li className={style.num}>
              <button
                className={style.btnPag}
                key={number}
                onClick={() => pagination(number)}
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default pagination;
