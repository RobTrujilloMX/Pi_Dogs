require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Temper } = require("../db");

const getAllTempers = async () => {
  const apiTempersFull = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    apiTempersFull.data.forEach((temper) => {
      if (temper.temperament) {
        const temps = temper.temperament.split(", ");
      
      temps.forEach((temper) => {
        Temper.findOrCreate({
          where: { name: temper },
        });
      });
    }
  });
  const findTemps =  Temper.findAll();
  
  return findTemps
};

module.exports = { getAllTempers }
