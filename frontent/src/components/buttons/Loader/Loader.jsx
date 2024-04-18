import React from 'react'
import "./loader.css"

const Loader = () => {
  return (
    <>
<svg
  className="container"
  viewBox="0 0 40 40"
  height="40"
  width="40"
>
  <circle 
    className="track"
    cx="20" 
    cy="20" 
    r="17.5" 
    pathlength="100" 
    stroke-width="5px" 
    fill="none" 
  />
  <circle 
    className="car"
    cx="20" 
    cy="20" 
    r="17.5" 
    pathlength="100" 
    stroke-width="5px" 
    fill="none" 
  />
</svg>
</>

  )
}

export default Loader
