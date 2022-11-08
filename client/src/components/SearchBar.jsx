import React from "react";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { useHistory } from "react-router-dom";
import { getPokemonName } from "../redux/actions";
import "../scss/SearchBar.scss"

export default function SearchBar({setCurrentPage}){
  const dispatch = useDispatch();
  const history = useHistory()
  const [input,setInput]=useState("")
  const error = useSelector(state=>state.error)

  function handleChange(e){
    e.preventDefault()
    setInput(e.target.value.toLowerCase())
    console.log(input)
  }

  function handleSubmit(e){
    e.preventDefault()
    if(input ===""){
      alert("Invalid name")
    }
    dispatch(getPokemonName(input))
    if(error){
      history.push("/notFound")
    }
    setCurrentPage(()=>1)
    setInput("")
  }
  return(
    <div className="Search">
      <input className="Search__Input" type="text" value={input} placeholder="Search a Pokemon" onChange={(e)=>handleChange(e)}></input>
      <button className="Search__Button" type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
    </div>
  )
}