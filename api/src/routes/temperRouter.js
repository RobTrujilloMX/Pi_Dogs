const { Router } = require("express");
const getAllTempersHandler = require("../handlers/temperHandler");

const temperRouter = Router();


temperRouter.get("/", getAllTempersHandler);

module.exports = temperRouter;
