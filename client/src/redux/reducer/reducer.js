import {
  GET_DOGS,
  ALPHA_SORT,
  WEIGHT_SORT,
  FILTER_BY_TEMPS,
  GET_NAME_DOGS,
  GET_TEMPERAMENTS,
  GET_DETAIL,
  FILTER_BY_SOURCE,
  CLEAN_DOG,
  POST_DOG,
} from "../actions/actions";

const initialState = {
  allDogs: [],
  copyAllDogs: [],
  temperament: [],
  detail: [],
  error: false,
};

const rootReducer = (state = initialState, action) => {
  const dogs = state.copyAllDogs;

  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        copyAllDogs: action.payload,
      };

    case GET_NAME_DOGS:
      return {
        ...state,
        allDogs: action.payload,
      };

    case CLEAN_DOG:
      return {
        ...state,
        detail: [],
      };

    case POST_DOG:
      return {
        ...state,
        // allDogs: action.payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperament: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case FILTER_BY_TEMPS:
      const dogsTempemperamet =
        action.payload === "all"
          ? dogs
          : dogs.filter((el) => el.temperament?.includes(action.payload));
      return {
        ...state,
        allDogs: dogsTempemperamet,
      };

    case ALPHA_SORT:
      const alphaSorted =
        action.payload === "asc"
          ? dogs.sort((a, b) => {
              let first = a.name[0].toUpperCase() + a.name.slice(1);
              let second = b.name[0].toUpperCase() + b.name.slice(1);
              if (first > second) return 1;
              if (first < second) return -1;
              return 0;
            })
          : dogs.sort((a, b) => {
              let first = a.name[0].toUpperCase() + a.name.slice(1);
              let second = b.name[0].toUpperCase() + b.name.slice(1);
              if (first > second) return -1;
              if (first < second) return 1;
              return 0;
            });
      return {
        ...state,
        allDogs: alphaSorted,
      };

    case WEIGHT_SORT:
      const weightSorted =
        action.payload === "asc"
          ? dogs.sort((a, b) => {
              if (isNaN(a.weight) || isNaN(b.weight)) return -1;
              if (parseInt(a.weight) > parseInt(b.weight)) return 1;
              if (parseInt(a.weight) < parseInt(b.weight)) return -1;
              return 0;
            })
          : dogs.sort((a, b) => {
              if (isNaN(a.weight) || isNaN(b.weight)) return -1;
              if (parseInt(a.weight) > parseInt(b.weight)) return -1;
              if (parseInt(a.weight) < parseInt(b.weight)) return 1;
              return 0;
            });
      return {
        ...state,
        allDogs: weightSorted,
      };
    case FILTER_BY_SOURCE:
      const sourceFilter =
        action.payload === "api"
          ? dogs.filter((el) => !el.createdByUser)
          : dogs.filter((el) => el.createdByUser);
      return {
        ...state,
        allDogs: action.payload === "all" ? dogs : sourceFilter,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
