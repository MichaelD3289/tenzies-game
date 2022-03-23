import React, { useState, useEffect } from "react"
import Dice from "./Dice"
import {nanoid} from 'nanoid'

export default function App() {

const [dieNum, setDieNum] = useState(allNewDice())

  function allNewDice() {
      const array=[]
      for(let i = 0; i < 10; i++) {
      let num = Math.floor(Math.random() * 6 + 1)
      const dieObject = {
        value: num,
        isHeld: false,
        id: nanoid()
      }
      array.push(dieObject)
      }
      return array
  }

  
  const dieElements = dieNum.map( die => (
  <Dice 
  key={die.id} 
  value={die.value} 
  isHeld={die.isHeld}
  holdDice={() => holdDice(die.id)}
   />
  ))

  function rollDice() {
   return setDieNum(allNewDice())
  }

  function holdDice(id) {
    console.log(id)
  }

  return (
    <main>
    <div className="gameBoard">
    <div className="dieGrid">
      {dieElements}
    </div>
    <button className="rollBtn" onClick={rollDice} >Roll</button>
    </div>
    </main>
  )
}