const axios = require("axios");
const { Type, Pokemon } = require("../../db");

const getTypes = async () => {
  const typesReq = await axios.get("https://pokeapi.co/api/v2/type");
  const typesResults = typesReq.data.results.map((el) => axios.get(el.url));

  const typesUrl = await axios.all(typesResults);

  const typesData = typesUrl.map((e) => e.data);

  const types = typesData.map((e) => e.name);

  types.splice(18, 19);

  types.forEach((e) => {
    Type.findOrCreate({
      where: { name: e },
    });
  });

  const allTypes = await Type.findAll();
  return allTypes;
};

module.exports = { getTypes };
