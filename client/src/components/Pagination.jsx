import React from "react";
import "../scss/Pagination.scss"

export default function Pagination({pokemonPerPage, allPokemons, currentPage, pagination}){
  const pageNumbers=[]

  for (let i = 1; i<=Math.ceil(allPokemons/pokemonPerPage);i++){
    pageNumbers.push(i)
  }

  const handlePrevBtn=(e)=>{
    e.preventDefault()
    pagination(currentPage - 1)
  }

  const handleNextBtn=(e)=>{
    e.preventDefault()
    pagination(currentPage + 1)
  }

  return(
    <div className="Pagination">
      <ul>
        <li>
          <button onClick={handlePrevBtn} disabled={currentPage === pageNumbers[0]}>Prev</button>
        </li>
        {pageNumbers &&
        pageNumbers.map(number=>{
          return(
            <li key={number}>
            <button onClick={()=>pagination(number)}>{number}</button>
          </li>
          )
        })
        }
        <li>
          <button onClick={handleNextBtn} disabled={currentPage === pageNumbers[pageNumbers.length - 1]}>Next</button>
        </li>
      </ul>
    </div>
  )
}