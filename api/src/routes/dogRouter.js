const { Router } = require("express");
const {
  getDogsHandler,
  creatDogsHandler,
  getDogsByIdHandler,
} = require("../handlers/dogsHandler");
const { validateDogs } = require("../middlewares/middleware");

const dogRouter = Router();

dogRouter.get("/", getDogsHandler);

dogRouter.get("/:id",getDogsByIdHandler);

dogRouter.post("/", validateDogs, creatDogsHandler);

module.exports = dogRouter;
