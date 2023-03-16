import React from "react";
import { useState } from "react";
import { useDispatch }  from "react-redux";
import { getNameDogs } from "../../redux/actions/actions";
import style from "../SearchBar/SearchBar.module.css";


const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handlerInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handlerSubmit = (e) => {
e.preventDefault()
dispatch(getNameDogs(name))
  }

  return (
    <div>
      <input className={style.searchInput}
        type="text"
        placeholder="Search"
        onChange={(e) => handlerInputChange(e)}
      />
      <button className={style.btnSearch} type="submit" onClick={e => handlerSubmit(e)}>Search</button>
    </div>
  );
};

export default SearchBar;




// import React from "react";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { getNameDogs } from "../../redux/actions/actions";
// import style from "./SearchBar.module.css";

// const SearchBar = ({ setCurrentPage, allDogs }) => {
//   const dispatch = useDispatch();

//   const [name, setName] = useState("");

//   const handlerInputChange = (e) => {
//     e.preventDefault();
//     setName(e.target.value);
//   };

//   const handlerButton = (e) => {
//     e.preventDefault();
//     dispatch(getNameDogs(name));
//     setCurrentPage(1);
//   };

//   return (
//     <div>
//       {" "}
//       {allDogs.length > 0 ? (
//         <div className={style.divGeneral}>
//           <input
//             className={style.input}
//             type="text"
//             name="search"
//             placeholder="Search..."
//             onChange={(e) => handlerInputChange(e)}
//           />
//           <button
//             type="submit"
//             onClick={(e) => handlerButton(e)}
//             className={style.b}
//           >
//             Search
//           </button>
//         </div>
//       ) : (
//         <div className={style.loading}>
//           <h3>Loading...</h3>
//           <img
//             src="https://tenor.com/6IOp.gif"
//             alt="loading"
//             width="500px"
//           ></img>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;
