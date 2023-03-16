const { getAllTempers } = require("../controllers/temperController");


const getAllTempersHandler = async (req, res) => {
  try {
    const tempers = await getAllTempers()
    res.status(200).json(tempers);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

module.exports = getAllTempersHandler;
