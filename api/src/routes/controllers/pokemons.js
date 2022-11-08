const axios = require("axios");
const { Type, Pokemon } = require("../../db");
const { Op } = require("sequelize");

const pokemonApi = async () => {
  const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
  const pokemonData = pokemons.data.results?.map((el) => axios.get(el.url));

  const pokemonInfo = await axios.all(pokemonData);

  const pokemonApi = pokemonInfo.map((el) => {
    return {
      id: el.data.id,
      name: el.data.name.charAt(0).toUpperCase() + el.data.name.slice(1),
      attack: el.data.stats[1].base_stat,
      image: el.data.sprites.other["official-artwork"].front_default,
      types: el.data.types.length > 0 ? el.data.types.map((obj) => obj.type.name) : [],
    };
  });
  return pokemonApi;
};

const pokemonDb = async () => {
  let pokemon = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
    },
  });
  pokemon = JSON.stringify(pokemon);
  pokemon = JSON.parse(pokemon);
  pokemon = pokemon.reduce((acc, e) => acc.concat({ ...e, types: e.types.map((t) => t.name) }), []);
  // pokemon = pokemon.map((el) => {
  //   return { name: el.name.charAt(0).toUpperCase() + el.name.slice(1) };
  // });

  return pokemon;
};

const find = async () => {
  const dbPokemon = await pokemonDb();
  const apiPokemon = await pokemonApi();
  const allPokemon = [...dbPokemon, ...apiPokemon];
  if (allPokemon.length === 0) {
    throw new Error("Pokemon not found");
  }
  return allPokemon;
};

const pokemonDbName = async (name) => {
  if (name) {
    const options = name ? { name: { [Op.like]: `%${name}%` } } : {};
    let dbInfo = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
      },
      where: options,
      through: {
        attributes: [],
      },
    });
    dbInfo = JSON.stringify(dbInfo);
    dbInfo = JSON.parse(dbInfo);
    dbInfo = dbInfo.reduce((acc, e) => acc.concat({ ...e, types: e.types.map((t) => t.name) }), []);
    return dbInfo;
  }
};

const pokemonApiName = async (name) => {
  try {
    if (name) {
      const namePokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const nPokemon = {
        id: namePokemon.data.id,
        name: namePokemon.data.name.charAt(0).toUpperCase() + namePokemon.data.name.slice(1),
        attack: namePokemon.data.stats[1].base_stat,
        image: namePokemon.data.sprites.other["official-artwork"].front_default,
        types: namePokemon.data.types.length > 0 ? namePokemon.data.types.map((obj) => obj.type.name) : [],
      };

      return nPokemon;
    }
  } catch (error) {
    console.log(error);
  }
};

const findByName = async (name) => {
  const dbPokemon = await pokemonDbName(name);
  const apiPokemon = await pokemonApiName(name);
  if (!apiPokemon) {
    return dbPokemon;
  }
  return apiPokemon;
};

const findById = async (id) => {
  if (!id) throw new Error("Id is required");
  const idPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonId = {
    id: idPokemon.data.id,
    name: idPokemon.data.name,
    image: idPokemon.data.sprites.other["official-artwork"].front_default,
    types: idPokemon.data.types.map((el) => el.type.name),
    hp: idPokemon.data.stats[0].base_stat,
    attack: idPokemon.data.stats[1].base_stat,
    defence: idPokemon.data.stats[2].base_stat,
    speed: idPokemon.data.stats[5].base_stat,
    height: idPokemon.data.height,
    weight: idPokemon.data.weight,
  };
  return pokemonId;
};

const findByIdDb = async (id) => {
  const idPokemon = await Pokemon.findOne({
    where: {
      id: id,
    },
    include: {
      model: Type,
    },
  });
  return idPokemon;
};

module.exports = {
  find,
  findById,
  findByName,
  findByIdDb,
  pokemonDbName,
  pokemonApiName,
};
