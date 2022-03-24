import React, { useState, useEffect } from "react"

export default function Stats( { rolls, lowestRolled } ) {


  return(
    <div className="timeContainer">
      {/* <h4 className="timer">Time Taken: </h4> */}
      <h4 className="rolls">Number of Rolls: {rolls}</h4>
      {/* <h5 className="bestTime">Best Time: </h5> */}
      <h5 className="bestRolls">Lowest Rolls: {lowestRolled === 999 ? "--" : lowestRolled}</h5>
    </div>
  )
}