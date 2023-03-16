import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPS = "FILTER_BY_TEMPS";
export const GET_NAME_DOGS = "GET_NAME_DOGS";
export const ALPHA_SORT = "ALPHA_SORT";
export const WEIGHT_SORT = "WEIGHT_SORT";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const CLEAN_DOG = "CLEAN_DOG";
export const ERROR = "ERROR";
export const POST_DOG = "POST_DOG";

export function getDogs() {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: GET_DOGS,
      payload: response.data,
    });
  };
}

export function getNameDogs(name) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: GET_NAME_DOGS,
        payload: response.data,
      });
    } catch (error) {return error.message}
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
};

export const cleanDog = () => {
  return {
    type: CLEAN_DOG,
  };
};

export function getTemperaments() {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/temperaments");
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: response.data,
    });
  };
}

export function postDog(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/dogs", payload);
    console.log(response)
    return response;
  };
}

export function alphabeticSort(payload) {
  return {
    type: ALPHA_SORT,
    payload,
  };
}

export function weightSort(payload) {
  return {
    type: WEIGHT_SORT,
    payload: payload,
  };
}

export function filterDogsByTemps(payload) {
  return {
    type: FILTER_BY_TEMPS,
    payload: payload,
  };
}

export function filterBySource(payload) {
  return {
    type: FILTER_BY_SOURCE,
    payload: payload,
  };
}

export function error() {
  return {
    type: ERROR,
  };
}
