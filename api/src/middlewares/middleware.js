
//Validating missing data when user try to create a dog...

const validateDogs = (req, res, next) => {
  const { name, height, weight, life_span, image, temperament } = req.body;

  if (!name) 
  res.status(400).json({ error: "Missing name" });
  if (!height) 
  res.status(400).json({ error: "Missing height" });
  if (!weight) 
  res.status(400).json({ error: "Missing weight" });
  if (!life_span) 
  res.status(400).json({ error: "Missing life span" });
  if (!image) 
  res.status(400).json({ error: "Missing image" });

  next();
};

//Validates if the ID comes from API or DB

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (id.length > 5) {
    req.typeId = "uuid";
  } else {
    req.typeId = "number";
  }
  next();
};

module.exports = { validateDogs };