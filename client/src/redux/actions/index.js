import axios from "axios";

export function getPokemon() {
  return async function (dispatch) {
    try {
      dispatch(toggleLoader());
      const pokemon = await axios.get("http://localhost:3001/pokemons");
      dispatch(toggleLoader());
      return dispatch({
        type: "GET_ALL_POKEMON",
        payload: pokemon.data,
      });
    } catch (error) {
      dispatch(toggleLoader());
      dispatch(toggleError());
    }
  };
}
export function clear() {
  return {
    type: "CLEAR",
  };
}
export function getPokemonId(id) {
  return async function (dispatch) {
    try {
      dispatch(toggleLoader());
      const pokemon = await axios.get(`http://localhost:3001/pokemons/${id}`);
      dispatch(toggleLoader());
      return dispatch({
        type: "GET_ID",
        payload: pokemon.data,
      });
    } catch (error) {
      dispatch(toggleLoader());
      dispatch(toggleError());
    }
  };
}
export function getPokemonName(name) {
  return async function (dispatch) {
    try {
      const pokemon = await axios.get(
        `http://localhost:3001/pokemons?name=${name}`
      );
      console.log(pokemon);
      if (pokemon.data.length === 0) throw new Error("Pokemon not found");
      return dispatch({
        type: "GET_POKEMON_NAME",
        payload: pokemon.data,
      });
    } catch (error) {
      console.log(error);
      dispatch(toggleError());
    }
  };
}
export function getType() {
  return async function (dispatch) {
    try {
      const type = await axios.get(`http://localhost:3001/types`);
      return dispatch({
        type: "GET_TYPE",
        payload: type.data,
      });
    } catch (error) {
      dispatch(toggleLoader());
      dispatch(toggleError);
    }
  };
}
export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      const pokemon = await axios.post(
        `http://localhost:3001/pokemons`,
        payload
      );
      return dispatch({
        type: "POST_POKEMON",
        payload: pokemon.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function filterByTypes(payload) {
  return {
    type: "FILTER_BY_STATUS",
    payload,
  };
}
export function findByOrigin(payload) {
  return {
    type: "FILTER_BY_ORIGIN",
    payload,
  };
}
export function sortPokemon(payload) {
  return {
    type: "SORT",
    payload,
  };
}
export function toggleError() {
  return {
    type: "ERROR",
  };
}
export function toggleLoader() {
  return {
    type: "LOADER",
  };
}
