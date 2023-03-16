require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temper } = require("../db");
const { cleanner } = require("../helpers/helpers");


// This controller is functional...This function has been tested an aproved...

const getAllDogs = async () => {
  const dbDogs = await Dog.findAll();

  const apiDogsRaw = (
    await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  ).data;

  const apiDogs = cleanner(apiDogsRaw);

  const allDogs = [...dbDogs, ...apiDogs];

  return allDogs;
};

//This controller is being tested...

const searchDogsByName = async (name) => {
  const dbDogs = await Dog.findAll({ wehre: { name: name } });

  const apiDogsRaw = (
    await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  ).data;

  const apiDogs = cleanner(apiDogsRaw);

  const allDogs = [...dbDogs, ...apiDogs];

  const filteredByName = allDogs.filter((el) =>
    el.name.toLowerCase().includes(name.toLowerCase())
  );

  return filteredByName;
};

const getDogById = async (id, source) => {
  if (source === "api") {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${id}`
      );
      console.log(response.data);
    const hAvg =
      response.data.height.metric.split(" - ").length === 2
        ? (parseInt(response.data.height.metric.split(" - ")[0]) +
            parseInt(response.data.height.metric.split(" - ")[1])) /
          2
        : parseInt(response.data.weight.metric);

    const wAvg =
      response.data.weight.metric.split(" - ").length === 2
        ? (parseInt(response.data.weight.metric.split(" - ")[0]) +
            parseInt(response.data.weight.metric.split(" - ")[1])) /
          2
        : parseInt(response.data.weight.metric);
    const imageApi = response.data.reference_image_id;
    return (response.data = {
      id: response.data.id,
      name: response.data.name,
      height: Math.round(hAvg),
      weight: Math.round(wAvg),
      life_span: response.data.life_span,
      image: `https://cdn2.thedogapi.com/images/${imageApi}.jpg`,
      temperament: response.data?.temperament,
      createdByuser: false,
    });
  } else {
    const responseDb = await Dog.findByPk(id, {
      include:{
      model: Temper,
      attributes: ["name"],
      through: {
        attributes: []
      }
    }
    } );
    return responseDb.dataValues;
  }
};

// This controller is functional..

const createDog = async (
  name,
  height,
  weight,
  life_span,
  image,
  temperament,
  createdByuser
) =>
  await Dog.create({
    name,
    height,
    weight,
    life_span,
    image,
    temperament,
    createdByuser: true
  });

module.exports = { createDog, getDogById, getAllDogs, searchDogsByName };
