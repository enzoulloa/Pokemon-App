const initialState = {
  allPokemon: [],
  allPokemonCopy: [],
  pokemon: [],
  dbPokemon: [],
  apiPokemon: [],
  types: [],
  detail: [],
  loading: false,
  error: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_POKEMON":
      return {
        ...state,
        allPokemon: action.payload,
        allPokemonCopy: action.payload,
        pokemon: action.payload,
        dbPokemon: action.payload.filter((el) => el.created),
        apiPokemon: action.payload.filter((el) => !el.created),
      };
    case "CLEAR":
      return {
        ...state,
        detail: [],
      };
    case "GET_ID":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_POKEMON_NAME":
      return {
        ...state,
        allPokemon: [action.payload],
      };
    case "GET_TYPE":
      return {
        ...state,
        types: action.payload,
      };
    case "POST_POKEMON":
      return {
        ...state,
      };
    case "FILTER_BY_STATUS":
      const pokemonTypes = [...state.allPokemonCopy];
      const statusFilter =
        action.payload === "all"
          ? pokemonTypes
          : pokemonTypes.filter((e) => {
              return e.types.find((el) => el === action.payload);
            });
      return {
        ...state,
        allPokemon: statusFilter,
        filterPokemon: statusFilter,
      };
    case "FILTER_BY_ORIGIN":
      const created =
        action.payload === "all"
          ? state.pokemon
          : action.payload === "createdAt"
          ? state.dbPokemon
          : state.apiPokemon;
      state.allPokemonCopy = created;
      return {
        ...state,
        allPokemon: created,
      };
    case "SORT":
      const pokemonSorted = [...state.allPokemonCopy];
      const sorted =
        action.payload === "asc"
          ? pokemonSorted.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : action.payload === "desc"
          ? pokemonSorted.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            })
          : action.payload === "more"
          ? pokemonSorted.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            })
          : pokemonSorted.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        allPokemon: action.payload === "all" ? pokemonSorted : sorted,
        filterPokemon: sorted,
      };
    case "LOADER":
      return {
        ...state,
        loading: !state.loading,
      };
    case "ERROR":
      return {
        ...state,
        error: !state.error,
      };
    default:
      return state;
  }
}
export default rootReducer;
