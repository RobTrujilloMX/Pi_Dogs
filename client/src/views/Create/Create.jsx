import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "../Create/Create.module.css";


// function validate(input) {
//   let errors = {};

//   if (!input.name) {
//       errors.name = ("Name is required");

//   } else if (parseInt(input.name)) {
//       errors.name = ("Invalid format");
//   }
//   if (!input.image) {
//       errors.image = ("Image is required");
//   }

//   if (!input.height) {
//       errors.height = ("Height is required")
//   }
//   if (!input.weight) {
//       errors.weight = ("Weight is required")
//   }
//   if (!input.life_span) {
//       errors.life_span = ("Life span is required")
//   }

//   return errors;
// }

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperament = useSelector((state) => state.temperament);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  const handlerChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  };

  const handlerSelect = (e) => {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postDog(input));
    alert("Dog created successfully");
    setInput({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      image: "",
      temperament: [],
    });
    history.push("/home");
  };

  const handlerDelete = (el) => {
    setInput({
      input,
      temperament: input.temperament.filter((temp) => temp !== el),
    });
  };

  return (
    <div className={style.mainContainer}>
      <Link to="/home">
        <button className={style.btnHome}>Home</button>
      </Link>

      <h1>Create dog</h1>

      <form onSubmit={(e) => handlerSubmit(e)}>
        <div className={style.createLabel}>
          <label>Name: </label>
          <input
            type="text"
            value={input.name}
            placeholder="Name"
            name="name"
            onChange={(e) => handlerChange(e)}
          />
          {/* {errors.name && <p className={style.errors}>{errors.name}</p>} */}
        </div>
        <div className={style.createLabel}>
          <label>Height: </label>
          <input
            type="text"
            value={input.height}
            name="height"
            placeholder="Height"
            onChange={(e) => handlerChange(e)}
            />{" "}
             {/* {errors.name && <p className={style.errors}>{errors.height}</p>} */}
        </div>
        <div className={style.createLabel}>
          <label>Weight: </label>
          <input
            type="text"
            value={input.weight}
            name="weight"
            placeholder="weight"
            onChange={(e) => handlerChange(e)}
          />{" "}
          {/* {errors.name && <p className={style.errors}>{errors.weight}</p>} */}
        </div>
        <div className={style.createLabel}>
          <label>Life span: </label>
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            placeholder="Life span"
            onChange={(e) => handlerChange(e)}
          />{" "}
          {/* {errors.name && <p className={style.errors}>{errors.life_span}</p>} */}
        </div>
        <div className={style.createLabel}>
          <label>Image: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            placeholder="Image"
            onChange={(e) => handlerChange(e)}
          />
          {/* {errors.name && <p className={style.errors}>{errors.image}</p>} */}
        </div>
        <div className={style.createLabel}>
          <label>Temperaments</label>
          <select onChange={(e) => handlerSelect(e)}>
            {temperament?.map((temp) => {
              return <option value={temp.name}>{temp.name}</option>;
            })}
          </select>
          <ul className={style.createUl}>
            <li>{input.temperament.map((el) => el + ", ")}</li>
          </ul>
        </div>
        <button className={style.btnSubmit} type="submit">
          Create dog
        </button>
      </form>
      {input.temperament.map((el) => (
        <div>
          <p>{el}</p>
          <button className={style.btnClose} onClick={() => handlerDelete(el)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Create;
