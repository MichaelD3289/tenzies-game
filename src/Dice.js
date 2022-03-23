import React from "react"

export default function Dice( { value, isHeld, holdDice } ) {


  return(
    <div 
      className="dice"
      style={{
          backgroundColor: isHeld ? "#59E391" : "white",
          color: isHeld ? "white" : "#2B283A"
      }}
      onClick={holdDice} 
      >
      {/* Die value coming from props */}
    {value}
    </div>
  )
}