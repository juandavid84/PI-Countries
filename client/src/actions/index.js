import axios from 'axios'
import { GET_TOTAL_COUNTRIES, GET_BY_ACTIVITY, GET_BY_ID,GET_BY_NAME,SORT_COUNTRIES, SORT_POPULATION, FILTER_CONTINENT,FILTER_ACTIVITY, RESET_FILTER,POST_ACTIVITY   } from './ActionTypes';

export function getTotalCountries(setLoading){
    return async function(dispatch){
    const res= await axios.get("http://localhost:3001/countries");
    setLoading&&setLoading(false)
    return dispatch({
        type: GET_TOTAL_COUNTRIES,
        payload: res.data,
      });
    };
  };

  export const getByActivity = () => {
    return async function (dispatch) {
      const res = await axios.get("http://localhost:3001/activities");
      return dispatch({
        type: GET_BY_ACTIVITY,
        payload: res.data,
      });
    };
  };

  export const getById = (id) => {
    return async function (dispatch) {
      const res = await axios.get("http://localhost:3001/countries/" + id);
      return dispatch({
        type: GET_BY_ID,
        payload: res.data,
      });
    };
  };

  export function getByName(name) {
    return async (dispatch) => {
      try {
        const res = await axios.get(
          `http://localhost:3001/countries?name=${name}`
        );
  
        dispatch({ type: GET_BY_NAME, payload: res.data });
      } catch (error) {
        console.log(error);
      }
    };
  }

  
  export function sortCountries(payload) {
    return {
      type: SORT_COUNTRIES,
      payload,
    };
  }

export function sortPopulation(payload) {
    return {
      type: SORT_POPULATION,
      payload,
    };
  }
  export function filterContinent(payload) {
    return {
      type: FILTER_CONTINENT,
      payload,
    };
  }

  export function filterActivity(payload) {
    return {
      type: FILTER_ACTIVITY,
      payload,
    };
  }

  export function resetFilter(){
   return{
     type: RESET_FILTER,
     payload: ""
   }
  }



  export function postActivity(payload){
    return async function(dispatch){
       await axios.post("http://localhost:3001/activities", payload)
      return dispatch({type: POST_ACTIVITY, payload})
    }
  } 
