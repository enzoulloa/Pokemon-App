import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom"
import { getPokemon, getType } from "../redux/actions";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import Card from "../components/Card";
import Loader from "../components/Loader";
import pokeball from "../assets/pokeball.svg"
import "../scss/CardList.scss"



export default function Home(){
  
  const dispatch = useDispatch()
  const history = useHistory()
  const allPokemons = useSelector((state)=>state.allPokemon)
  const loading = useSelector((state)=>state.loading)
  const error = useSelector((state)=>state.error)
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonPerPage, setPokemonPerPage]= useState(12)
  const indexOfLastVideogame = currentPage*pokemonPerPage
  const indexOfFirstVideogame = indexOfLastVideogame - pokemonPerPage
  const currentPokemons=allPokemons.slice(indexOfFirstVideogame,indexOfLastVideogame)

  const pagination = (pageNumber)=>{
    setCurrentPage(pageNumber)
  }

   useEffect(()=>{
    dispatch(getPokemon())
    dispatch(getType())
    if(error){
      history.push("/notFound")
    }
  },[dispatch,error,history])
  
  return(
    <main className="Home">
      {loading && <Loader/>}
      <div className="container">
      <div className="navbar">
      <img src={pokeball} alt="pokeball" className="logo"/>
      <Link to="/pokemon" className="CreateHome">Create your pokemon</Link>
      <SearchBar setCurrentPage={setCurrentPage}/>
      </div>
      </div>
      <Filter pagination={pagination}/>
      <section className="CardList">
        <div className="CardList__Container">
      {
        currentPokemons.map(el=>{
          return(
            <div>
              <Card key={el.id} id={el.id} name={el.name} image={el.image} types={el.types} typesBd={el.types} attack={el.attack}/>
            </div>
          )
        })
      }
      </div>
    </section>
      <Pagination pokemonPerPage={pokemonPerPage} allPokemons={allPokemons.length} currentPage={currentPage} pagination={pagination} />
      
    </main>
  )
}
//loader re loco, searchbar db y filtros