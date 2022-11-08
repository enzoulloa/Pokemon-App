import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleError } from "../redux/actions";
import "../scss/NotFound.scss"



export default function NotFound(){
  const dispatch = useDispatch()
  const error = useSelector((state)=>state.error)

  useEffect(()=>{
    if(error){
      dispatch(toggleError())
    }
  },[dispatch,error])
  
return(
  <div className="NotFound">
    <h1>Not found</h1>
    <Link to="/home">Go Back</Link>
  </div>
)
}
