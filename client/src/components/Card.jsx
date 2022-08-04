import React from "react";
import { Link } from "react-router-dom";

export default function Card({flag, name, continents, id}){
    return(
        <Link to= {"/detail/"+id}> 
         <h3 className="h">{name}</h3>
         <h5 className="h">{continents}</h5>
         
         <img src={flag} width="250 px" height= "250 px" alt="img" />
        </Link>
    )
}