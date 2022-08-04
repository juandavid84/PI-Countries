
import { FILTER_ACTIVITY, FILTER_CONTINENT, GET_BY_ACTIVITY, GET_BY_ID, GET_BY_NAME, GET_TOTAL_COUNTRIES, POST_ACTIVITY, RESET_FILTER, SORT_COUNTRIES, SORT_POPULATION   } from "../actions/ActionTypes";

const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    details: {},
    actFiltered:[],
    contFiltered:[],
  };
  

function rootReducer(state=initialState,action){
    switch(action.type){

      case GET_TOTAL_COUNTRIES:
        return{
          ...state,
          countries: action.payload,
          allCountries: action.payload,
        }

      case GET_BY_ACTIVITY:
        return{
          ...state,
          activities: action.payload,
        }

      case GET_BY_ID:
        return{
          ...state,
          details: {...action.payload},
        }

      case GET_BY_NAME: {
        return {
          ...state,
          countries: action.payload,
        };
        }

      case POST_ACTIVITY:
        return{
          ...state
        }

      case SORT_COUNTRIES:
        let countriesOrdered=[...state.countries];
        countriesOrdered.sort((a,b)=>{
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }      
          return 0;
        })
        if(action.payload==="Descendente"){
          
          countriesOrdered=countriesOrdered.reverse()
        }
                                
        return {
          ...state,
          countries: [...countriesOrdered],
        };

      case SORT_POPULATION:
        let countryByPopulation= [...state.countries]
        countryByPopulation.sort((a,b)=>{
          if(a.population>b.population){
            return action.payload==='mayor' ? -1:1
          }
          if(a.population<b.population){
            return action.payload==='mayor' ? 1:-1
          }
          return 0
        })
        return {
          ...state,
          countries:countryByPopulation
        };
         
      case FILTER_CONTINENT:                                       
        let arrayFiltered=[]
        const allCountries=action.payload[1]?[...state.actFiltered]:[...state.allCountries]
        for(var i=0; i<allCountries.length;i++){
          if(allCountries[i].hasOwnProperty('continents')){
            if(allCountries[i].continents===action.payload[0]){                           
              arrayFiltered.push(allCountries[i])
                                            
            }                                                           
          }                             
        }
        return {
          ...state,
          contFiltered:[...arrayFiltered],
          countries:action.payload[0]==="All"? [...allCountries]: [...arrayFiltered],
        };

      case FILTER_ACTIVITY:
    
        const activityFiltered= []
        const aux=action.payload[1]?[...state.contFiltered]:[...state.allCountries]
        aux.forEach(country=>{
          country.activities.forEach(act=>{
            if(act.name===action.payload[0]){
              activityFiltered.push(country)
            }
          })
        })
                    
        return{
          ...state,
          countries:action.payload[0]==="All"?[...aux] :[...activityFiltered],
          actFiltered:[...activityFiltered]
        }

      case RESET_FILTER:
        return{
          ...state,
          countries:[...state.allCountries],
          actFiltered:[...state.allCountries],
          contFiltered:[...state.allCountries],
        }
       
      default:
        return state;
              
    }
}
export default rootReducer;