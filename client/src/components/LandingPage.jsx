import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import tierra from "./planetapng.png"

export default function LandindPage(){
    return(
        <div id="global">
            <h1 id="h1l">Bienvenidos</h1>
            <Link id="al" to= '/home'>
                <button>Ingresar</button>
                </Link>
                <img id="imgl" src={tierra} alt="tierra"></img>
        </div>
    )
}