const { Router } = require("express");
const {
  find,
  findByName,
  findById,
  findByIdDb,
  pokemonDbName,
  pokemonApiName,
} = require("../controllers/pokemons.js");
const { Pokemon, Type } = require("../../db");

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id.includes("-")) {
    try {
      const pokemon = await findByIdDb(id);
      res.status(200).json(pokemon);
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const pokemon = await findById(id);
    res.status(200).json(pokemon);
  } catch (error) {
    console.log(error);
  }
});

router.get("", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    try {
      const pokemon = await find();
      res.json(pokemon);
    } catch (error) {
      console.log(error);
    }
  } else {
    if (name) {
    }
    try {
      const pokemon = await findByName(name);
      res.status(200).json(pokemon);
    } catch (error) {
      res.status(404).json(error);
    }
  }
});

router.post("", async (req, res) => {
  const { name, image, life, attack, defence, speed, height, weight, type } =
    req.body;
  console.log(req.body);

  try {
    const pokemon = await Pokemon.create({
      name,
      image,
      life,
      attack,
      defence,
      speed,
      height,
      weight,
      type,
    });

    let findTypes = await Type.findAll({
      where: { name: type },
    });
    pokemon.addType(findTypes);
    res.status(200).json({ msg: "Pokemon created" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
