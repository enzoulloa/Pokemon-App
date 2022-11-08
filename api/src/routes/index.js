const { Router } = require("express");
const mwPokemon = require("./middlewares/mwPokemon.js");
const mwType = require("./middlewares/mwType.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/pokemons", mwPokemon);
router.use("/types", mwType);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
