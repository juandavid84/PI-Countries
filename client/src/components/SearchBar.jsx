import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getByName } from "../actions";

export default function SearchBar(){
    const dispatch= useDispatch()
    const [name,setName]= useState("")

    function handleOnChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getByName(name))
    };
    return (
        <div>
          <input
            id="search"
            className="search"
            type="text"
            value={name}
            onChange= {(e) => handleOnChange(e)}
            placeholder="Buscar pais..."
          />
          <button className ="bottom" type="submit" onClick= {(e) => handleSubmit(e)}> Buscar </button>
        </div>
      );
}