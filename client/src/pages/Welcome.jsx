import React from "react";
import { Link } from "react-router-dom";
import "../scss/Welcome.scss"
import pokemon from "../assets/pokemon.svg"

export default function Welcome(){
  return(
    <div className="Welcome">
      <img src={pokemon} alt="pokemon-logo" />
      <Link to="/home" className="Welcome__Link">Catch em all!</Link>
    </div>
  )
}
