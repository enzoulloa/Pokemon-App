import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByTypes,findByOrigin,sortPokemon } from "../redux/actions";
import "../scss/Filter.scss"

export default function Filter({pagination}){
  const [order,setOrder] = useState("1")
  
  const dispatch= useDispatch()

  function handleOrder(e){
    e.preventDefault()
    const {value} = e.target
    pagination(1)
    dispatch(sortPokemon(value))
    setOrder(value)
  }

  function handleFilter(e){
    e.preventDefault()
    pagination(1)
    const {value }=e.target
    dispatch(filterByTypes(value))
  }

  function handleOrigin(e){
    e.preventDefault()
    pagination(1)
    const {value}= e.target
    dispatch(findByOrigin(value))
  }
  
  return(
    <div className="Filter">
      <select className="Filter__Origin" onChange={e=>handleOrigin(e)}>
        <option value="all">All</option>
        <option value="createdAt">Created</option>
        <option value="api">API</option>
      </select>
      <select className="Filter__Order" onChange={e=>handleOrder(e)}>
        <option value="all">All</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
        <option value="more">+ attack</option>
        <option value="less">- attack</option>
      </select>
      <select className="Filter__Types" onChange={e=>handleFilter(e)}>
        <option value="all">All</option>
        <option value="normal">Normal</option>
        <option value="fighting">Fighting</option>
        <option value="flying">Flying</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="rock">Rock</option>
        <option value="bug">Bug</option>
        <option value="steel">Steel</option>
        <option value="fire">Fire</option>
        <option value="ghost">Ghost</option>
        <option value="water">Water</option>
        <option value="ice">Ice</option>
        <option value="electric">Electric</option>
        <option value="grass">Grass</option>
        <option value="psychic">Psychic</option>
        <option value="dragon">Dragon</option>
        <option value="fairy">Fairy</option>
        <option value="dark">Dark</option>
      </select>
    </div>
    
  )
}