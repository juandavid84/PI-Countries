import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalCountries,sortCountries,sortPopulation,filterContinent, filterActivity, getByActivity, resetFilter } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from './Pagination'
import SearchBar from "./SearchBar";
import "./home.css"
import gif from "./RELOJ GIRANDO.gif"

export default function Home(){
    const dispatch= useDispatch()
    const [loading,setLoading]=useState(true)
    const allCountries = useSelector((state) => state.allCountries);
    const countries= useSelector((state)=>state.countries);
    const allActivities = useSelector((state) => state.activities);
    const [contFiltered,setcontFiltered]= useState(false)
    const [actFiltered,setactFiltered]= useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
  const [currentCountries,setCurrentCountries] = useState([])

    useEffect(()=>{
    dispatch(getTotalCountries(setLoading))
    dispatch(getByActivity())
    },[dispatch])

    
    
    useEffect(()=>{
        (setCurrentCountries(countries.slice(indexOfFirstCountry, indexOfLastCountry)))
      
        },[allCountries,countries,currentPage,indexOfFirstCountry,indexOfLastCountry])
    
        
    function handleClick(e){
        e.preventDefault();
        dispatch(resetFilter()) 
        setcontFiltered(false)
        setactFiltered(false)
        
    }
    function onSelectsChangeCountry(e) {
        dispatch(sortCountries(e.target.value));
        setCurrentPage(1)
      }
      function onSelectsChangePopulation(e) {
        dispatch(sortPopulation(e.target.value));
        setCurrentPage(1)
      }
      function onSelectsContinent(e) {
        dispatch(filterContinent([e.target.value,actFiltered]));
       setcontFiltered(true)
       setCurrentPage(1)
      }
      function handleFilterActivityCreated(e) {
       dispatch(filterActivity([e.target.value,contFiltered]));
       setactFiltered(true)
       setCurrentPage(1)
      }

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
       
      }
    if(loading){
      return(
        <img src={gif} id="loading" alt="gif"></img>
      )
    }

    return(
     
        <div id="globalcontainer">
          <SearchBar classname="search"/>
         <button onClick={e=>{handleClick(e)}}>
             Volver a cargar todos los paises
         </button>
         <div>
         <Link id="create" to= '/create'>Crear Actividad</Link>
         
        </div>
        
         <div>
             <select name="select" onChange={onSelectsChangePopulation}>
                 <option value="All">Order Population</option>
                 <option value="mayor">Mayor</option>
                 <option value="menor">Menor</option>
             </select>
             <select name= "select" onChange={onSelectsChangeCountry}>
         <option value= "order">AZ:</option>    
         <option value= "Ascendente">Ascendente</option>
         <option value= "Descendente">Descendente</option>
         </select>
         <select name= "select" onChange={onSelectsContinent}>
             <option value="All">All</option>
             <option value="Africa">Africa</option>
             <option value="North America">North America</option>
             <option value="South America">South America</option>
             <option value="Antarctica">Antarctica</option>
             <option value="Asia">Asia</option>
             <option value="Europe">Europe</option>
             <option value="Oceania">Oceania</option>
         </select>
         {allActivities?<select onChange={handleFilterActivityCreated}>
           
            <option value= "All">All</option> 
           {allActivities.map(act=>{
            return <option key={act.name} value={act.name}>{act.name}</option>
           }
             
           )}
         </select>
:<span>Hola</span>}
        </div>
        <div>
         <Pagination
          countriesPerPage={countriesPerPage}
          allCountries={countries.length}
          paginado={paginado}
          currentPage={currentPage}
        />
        
        </div>
         <div id="countries">
         {
         countries.length?currentCountries.map(e=>{
             return(
         
            <Card
            name={e.name}
            flag={e.flag}
            continents={e.continents}
            key={e.id}
            id={e.id}
          />
        
             )
         })
         :<span id="empty">No hay paises con esas caracteristicas</span>
         }
         </div>
        
         
        </div>

    )
    
}