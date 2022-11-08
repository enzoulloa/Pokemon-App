import React from "react";
import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postPokemon,getType } from "../redux/actions";
import "../scss/Create.scss"

export default function Create(){
  const dispatch = useDispatch()
  const types = useSelector((state)=>state.types)
  const history = useHistory()
  const [errors,setErrors]=useState({})
  const [isSubmit, setIsSubmit]=useState(false)

  const [input, setInput]=useState({
    name:"",
    image:"",
    life:0,
    attack:0,
    defence:0,
    speed:0,
    height:0,
    weight:0,
    type:[],
  }) 

  function validate(input){
  let errors={};
  if(!input.name){
    errors.name = "Name is required!"
  } 
  if (input.name.length < 4) {
      errors.name = 'Name must be more than 4 Characters'
    }
  if (input.name.length > 70) {
      errors.name = 'Name cannot exceed more than 70 Characters'
  }
  if (!/^[a-zA-Z]+$/.test(input.name)){
    errors.name = "Only accepts letters!"
  }
  if(!input.image){
    errors.image = "Url is required!"
  }
  if (input.image.length !== 0 && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)) {
  errors.image = "Invalid URL!"
  }
  if(input.type.length===0){
    errors.type = "Types required !"
  }
  if(input.type.length > 2){
    errors.type = "Maximum 2 types!"
  }
  if(!input.attack){
    errors.attack = "Attack is required"
  }
  if(input.attack > 255){
    errors.attack = "255 Max"
  }
  if(!/^[0-9]+$/.test(input.attack)){
    errors.attack = "Only accepts numbers!"
  }
  if(!input.defence){
    errors.defence = "Defence is required"
  }
  if(input.defence > 255){
    errors.defence = "255 Max"
  }
  if(!/^[0-9]+$/.test(input.defence)){
    errors.defence = "Only accepts numbers!"
  }
  if(!input.life){
    errors.life = "Life is required"
  }
  if(input.life > 255){
    errors.life = "255 Max"
  }
  if(!/^[0-9]+$/.test(input.life)){
    errors.life = "Only accepts numbers!"
  }
  if(!input.speed){
    errors.speed = "Speed is required"
  }
  if(input.speed > 255){
    errors.speed = "255 Max"
  }
  if(!/^[0-9]+$/.test(input.speed)){
    errors.speed = "Only accepts numbers!"
  }
  if(!input.height){
    errors.height = "Height is required"
  }
  if(input.height > 255){
    errors.height = "255 Max"
  }
  if(!/^[0-9]+$/.test(input.height)){
    errors.height = "Only accepts numbers!"
  }
  if(!input.weight){
    errors.weight = "Weight is required"
  }
  if(input.weight > 255){
    errors.weight = "255 Max"
  }
  if(!/^[0-9]+$/.test(input.weight)){
    errors.weight = "Only accepts numbers!"
  }
  if (Object.keys(errors).length === 0) {
      setIsSubmit(true)
    } else {
      setIsSubmit(false)
    }
  return errors
}

  function handleOnChange(e){
    setErrors(validate(input))
    setInput({
      ...input,
      [e.target.name]:e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    setErrors(validate(input))
    if(isSubmit){
      dispatch(postPokemon(input))
       setInput({
        name:"",
        image:"",
        life:0,
        attack:0,
        defence:0,
        speed:0,
        height:0,
        weight:0,
        type:[],
    })
    alert("Pokemon created")
    history.push("/home")
    }
    
  }
  
  function handleSelect(e){
    if(!input.type.includes(e.target.value)){
      if(input.type.length <= 1){
        setInput({
          ...input,
          type:[...input.type, e.target.value]
        })
      }
    }
  }

  function handleDelete(e){
    setInput({
      ...input,
      type:input.type.filter((type)=>type!==e)
    })
  }

  useEffect(()=>{
    dispatch(getType())
  },[dispatch])

  console.log(input.type.length)

return(
  <div className="Create">
    <Link to="/home">Go Back</Link>
    <form onSubmit={(e)=>handleSubmit(e)}>
    <h1>Create a Pokemon</h1>
      <label>
        <span>Name:</span>
        <input type="text" name="name" id="" placeholder="Enter a name" value={input.name} onChange={(e) => handleOnChange(e)}></input>
        {errors.name ? <p><small>{errors.name}</small></p> : false}
      </label>

      <label>
        <span>Image:</span>
        <input type="text" name="image" id="" placeholder="Enter a URL" value={input.image} onChange={(e) => handleOnChange(e)}></input>
        {errors.image ? <p><small>{errors.image}</small></p> : false}
      </label>

      <label>
        <span>HP:</span>
        <input type="number" name="life" id="" value={input.life} min="0" max="255" onChange={(e) => handleOnChange(e)}></input>
        {errors.life ? <p><small>{errors.life}</small></p> : false}
      </label>

      <label>
        <span>Attack:</span>
        <input type="number" name="attack" id="" value={input.attack} min="0" max="255" onChange={(e) => handleOnChange(e)}></input>
        {errors.attack ? <p><small>{errors.attack}</small></p> : false}
      </label>

      <label>
        <span>Defence:</span>
        <input type="number" name="defence" id="" value={input.defence} onChange={(e) => handleOnChange(e)}></input>
        {errors.defence ? <p><small>{errors.defence}</small></p> : false}
      </label>

      <label>
        <span>Speed:</span>
        <input type="number" name="speed" id="" value={input.speed} onChange={(e) => handleOnChange(e)}></input>
        {errors.speed ? <p><small>{errors.speed}</small></p> : false}
      </label>

      <label>
        <span>Height:</span>
        <input type="number" name="height" id="" value={input.height} onChange={(e) => handleOnChange(e)}></input>
        {errors.height ? <p><small>{errors.height}</small></p> : false}
      </label>

      <label>
        <span>Weight:</span>
        <input type="text" name="weight" id="" value={input.weight} onChange={(e) => handleOnChange(e)}></input>
        {errors.weight ? <p><small>{errors.weight}</small></p> : false}
      </label>

<span>Types:</span>
      <select name="" id="" onChange={(e)=>handleSelect(e)}>
        {
          types.map((type)=>(
            <option value={type.name} key={type.id}>{type.name}</option>
          ))
        }
      </select>
        {errors.type ? <p><small>{errors.type}</small></p> : false}
      <input type="submit" value="Submit"/>
    </form>
    {
      input.type.map((el)=>(
        <div className="delete">
          <button type="button" onClick={()=>handleDelete(el)}>X</button>
          <span>{el}</span>
        </div>
      ))
    }
  </div>
)
}
