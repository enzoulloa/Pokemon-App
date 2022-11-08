import React from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams,Link, useHistory } from "react-router-dom";
import {getPokemonId, clear, toggleError} from "../redux/actions"
import Loader from "../components/Loader"
import "../scss/Details.scss"

export default function Details(){
  const dispatch = useDispatch()
  const history = useHistory()
  const pokemon = useSelector((state)=>state.detail)
  const loading = useSelector((state)=>state.loading)
  const error = useSelector((state)=>state.error)
  const {id} = useParams()

  useEffect(()=>{
    dispatch(clear())
    dispatch(getPokemonId(id))
    if(error){
      history.push("/notFound")
    }
  },[dispatch,id,error,history])
  
return(
  <div className="Detail">
    {loading && <Loader />}
    <Link to="/home">Go back</Link>
    <div className="Card">
      <img src={pokemon.image} alt={pokemon.name}/>
      <div>
        <h1>{pokemon.name}</h1>
        <p>{`ATTACK: ${pokemon.attack}`}</p>
        <p>{`HP: ${pokemon.life ? pokemon.life : pokemon.hp}`}</p>
        <p>{`DEFENSE: ${pokemon.defence}`}</p>
        <p>{`SPEED: ${pokemon.speed}`}</p>
        <p>{`HEIGHT: ${pokemon.height}`}</p>
        <p>{`WEIGHT: ${pokemon.weight}`}</p>
      </div>
      <div>
        <p>TYPES: {pokemon.types?.map((e,i)=>{
          return typeof e !== "object" ? (<span key={i} className={e}>{e}</span>):(<span key={i} className={e.name}>{e.name}</span>)
        })}</p>
        <div className="types">
        {pokemon.types?.map((e,i)=>{
          return typeof e !== "object" ? (<img src={`../assets/${e}.svg`} alt={e} />):(<img src={`../assets/${e.name}.svg`} alt={e.name} />)
        })}
        </div>
      </div>
      <div>
        
      </div>
    </div>
  </div>
)
}

