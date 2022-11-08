import React from "react";
import Card from "../components/Card";

export default function CardList({currentPokemons}){
return(
  <section>
    <div>
      {
        currentPokemons.map((e)=>{
          return <Card currentPokemons={e} key={e.id}/>
        })
      }
    </div>
  </section>
)
}