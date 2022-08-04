import {React, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getById } from "../actions";
import { useDispatch ,useSelector} from "react-redux";
import { Link } from "react-router-dom";
import "./detail.css"

export default function Detail(){
let{id}= useParams()
const dispatch= useDispatch()
const country= useSelector((state)=>state.details)

useEffect(()=>{
   if(country.flag){
   document.getElementById("country").style.backgroundImage=`url(${country.flag})`
   }
},[country])

useEffect(()=>{
dispatch(getById(id))
},[dispatch,id])
return country.name?(
   
     <div id="globalcontainer">
        <div id="country" >
    <h1 className="countryh">{country.name}</h1>
    <h3 className="countryh">{country.id}</h3>
    <h4 className="countryh">Continents:{country.continents}</h4>
    <h5 className="countryh">Subregion:{country.subregion}</h5>
    <h5 className="countryh">Capital:{country.capital}</h5>
    <h5 className="countryh">Area:{country.area}</h5>
    <h5 className="countryh">Population:{country.population}</h5>
    </div>
    <Link to="/home" id="home">{"<--home"}</Link>
    <div id="activities">
    {country.activities.map(e=>{
       return (
          <div key={e.id} className={e.season}>
             <h1>{e.name}</h1>
             <h2>{e.difficulty}</h2>
             <h2>{e.season}</h2>
             <h2>{e.duration}minutes</h2>
             </div>
       )
    })}
    </div>
   </div>):<span>Cargando...</span>
   
   
    



}
