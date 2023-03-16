const {
  createDog,
  getDogById,
  getAllDogs,
  searchDogsByName,
} = require("../controllers/dogController");
// const { Dog, Temper } = require("../db");

// This handler bring us all dogs and filter by name. This handler is functional...

const getDogsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name ? await searchDogsByName(name) : await getAllDogs();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//This handler get dogs by ID... This Handler is functional...

const getDogsByIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api";
  try {
    const dog = await getDogById(id,source);
    res.status(200).json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//Handler Dog create.. This handler is functional...






const creatDogsHandler = async (req, res) => {
  const { name, height, weight, life_span, image } = req.body;
  try {
    const newDog = await createDog(name, height, weight, life_span, image);
    res.status(201).json(newDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDogsHandler,
  getDogsByIdHandler,
  creatDogsHandler,
};
