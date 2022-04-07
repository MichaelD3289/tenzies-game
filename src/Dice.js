import React from "react"
import {nanoid} from "nanoid"

export default function Dice( { value, isHeld, holdDice, canStart } ) {
let dieDisplay = [
  [5],
  [1, 9],
  [3, 5, 7],
  [1, 3, 7, 9],
  [1, 3, 5, 7, 9],
  [1, 3, 4, 6, 7, 9]
]

let dotArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const dotElements = dotArray.map(item => {
  return  <div 
    key={nanoid()}
    className={
      dieDisplay[value - 1].includes(item) ? "dot display" : "dot"
    } ></div>
  })


  return(
    <div 
      className="dice"
      style={{
          backgroundColor: isHeld ? "#59E391" : "white",
          color: isHeld ? "white" : "#2B283A"
      }}
      onClick={canStart ? holdDice : () => alert("Please begin")} 
      >
      {/* Die value coming from props */}
      {dotElements}
    </div>
  )
}