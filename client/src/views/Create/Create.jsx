import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "../Create/Create.module.css";

const validate = (input) => {
  let errors = {};
  if (!/^[ a-zA-Z]+$/.test(input.name)) {
    errors.name = "Name is required (No spaces, numbers or special characters)";
  }
  if (!/^[0-9]+$/.test(input.height)) {
    errors.height = "Height is required (Only positive numbers) ";
  }
  if (!/^[0-9]+$/.test(input.weight)) {
    errors.weight = "Weight is required (Only positive numbers) ";
  }
  if (!/^[ 0-9-]+$/.test(input.life_span)) {
    errors.life_span = "Life span is required (Only positive numbers";
  }
  if (!/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(input.image)) {
    errors.image = "Only URL's are allowed";
  }

  return errors;
};

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperament = useSelector((state) => state.temperament);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    if (!input.temperament.includes(e.target.value)) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    }
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((tempers) => tempers !== e), //deja todo lo que no sea el elemento clickeado apra eliminar
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(input));
    alert("Dog was created succesfully");
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

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div>
      <Link to={"/Home"}>
        <button>Back</button>
      </Link>
      <h1>Create Dog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={input.name}
            placeholder="Name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className={style.danger}>{errors.name}</p>}
        </div>
        <hr />
        <div>
          <label htmlFor="height">Height: </label>
          <input
            type="number"
            name="height"
            value={input.height}
            placeholder="Height in Cm."
            onChange={(e) => handleChange(e)}
          />
          {errors.height && !errors.name && (
            <p className={style.danger}>{errors.height}</p>
          )}
        </div>
        <hr />
        <div>
          <label htmlFor="weight">Weight: </label>
          <input
            type="number"
            name="weight"
            value={input.weight}
            placeholder="Weight in Kg."
            onChange={(e) => handleChange(e)}
          />
          {errors.weight && !errors.height && (
            <p className={style.danger}>{errors.weight}</p>
          )}
        </div>
        <hr />
        <div>
          <label htmlFor="life_span">Life span: </label>
          <input
            type="number"
            name="life_span"
            value={input.life_span}
            placeholder="Life span in years"
            onChange={(e) => handleChange(e)}
          />
          {errors.life_span && !errors.weight && (
            <p className={style.danger}>{errors.life_span}</p>
          )}
        </div>
        <hr />
        <div>
          <label htmlFor="image">Image: </label>
          <input
            type="text"
            name="image"
            value={input.image}
            placeholder="Image URL"
            onChange={(e) => handleChange(e)}
          />
          {errors.image && !errors.weight && (
            <p className={style.danger}>{errors.image}</p>
          )}
        </div>
        <hr />

        <select onChange={(e) => handleSelect(e)}>
          {temperament.map((tempers) => (
            <option value={tempers.name} key={tempers.id}>
              {tempers.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={
            !input.name || errors.name || errors.height || errors.weight
          }
        >
          Create dog
        </button>
      </form>

      <div className={style.temps}>
        {input.temperament.map((tempers) => (
          <div key={tempers}>
            <p>{tempers}</p>
            <button onClick={(e) => handleDelete(tempers)} className={style.x}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Create;
