import React from "react";
import { Link } from "react-router-dom";
import "../scss/Card.scss"

export default function Card({id,name,image,types,typesBd,attack}){
return(
  <article className="Card">
    <div className="Card__Img">   
     <img src={image} alt="" className="RecipeItem__Img"/>
    </div>
    <div className="Card__Text">
      <h2 className="Card__Text--Title">{name}</h2>
        <h4>Attack:{attack}</h4>
      <div className="Card__Text--Types">
      {
          types.map((e,index)=>{
          return typeof e !== 'object' ? (<p key={index} className={e}><img src={`../assets/${e}.svg`} alt={e}/>{e}</p>
           ): (
          <p key={index} className={e.name}><img src={`../assets/${e.name}.svg`} alt={e.name} />{e.name}</p>
          )
          })}
      </div>
      <Link className='Card__Text--Link' to={"/home/"+id}>Go to Details</Link>
    </div>
  </article>
)
}
