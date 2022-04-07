import React, { useState, useEffect } from "react"
import Dice from "./Dice"
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import Stats from './Stats'

export default function App() {

const [dieNum, setDieNum] = useState(allNewDice())
const [tenzies, setTenzies] = useState(false)
const [start, setStart] = useState(false)
// const [time, setTime] = useState(0)
const [numberRolled, setNumberRolled] = useState(0);
// const [startTime, setStartTime] = useState("")
const [lowestRolls, setLowestRolls] = useState(localStorage.getItem('lowestRoll') || 999)

useEffect(() => {

  if(numberRolled < lowestRolls && start) {
    localStorage.setItem("lowestRoll", numberRolled)
    setLowestRolls(numberRolled)
  }
}, [tenzies])


useEffect(() => {
  // const allHeld = dice.every(die => die.isHeld)
  // const firstValue = dice[0].value
  // const allSameValue = dice.every(die.value === firstValue)

const allTrue = dieNum.filter(die => (die.isHeld === true)).length === 10 ? true : false;

const allSame = new Set(dieNum.map(die => die.value)).size === 1 ? true : false;

if(allTrue && allSame) {
  setTenzies(true)
  
}

}, [dieNum]) // end tenzies useEffect

useEffect(() => {
if(numberRolled === 1) {
  // setStartTime(() => {



  //  let newDate =  new Date();
  //  return newDate.getTime();
  // })
  setStart(true)
}

}, [numberRolled]) //end start useEffect

// var calcTime

// useEffect(() => {
  

//   if(startTime) {
//   calcTime = setInterval( function runTime() {
//     console.log(tenzies)
//       setTime(prevTime => {
    
//         let now = new Date();
//         let timeDiff = Math.abs(now - startTime);
//         return Math.floor(timeDiff / 1000)
//       })
   
//     }, 1000)
   
//   } 


// }, [startTime]) //End timer useEffect

// function stopTime() {
//   clearInterval(calcTime)
// }

function generateNewDie() {
  return {
    value: Math.floor(Math.random() * 6 + 1),
    isHeld: false,
    id: nanoid()
  }
} // End generateNewDie

  function allNewDice() {
      const array=[]
      for(let i = 0; i < 10; i++) {
      array.push(generateNewDie())
      }
      return array
  } // End allNewDice
  
  const dieElements = dieNum.map( die => (
  <Dice 
  key={die.id} 
  value={die.value} 
  isHeld={die.isHeld}
  holdDice={() => holdDice(die.id)}
  canStart={start}
   />
  ))

  function rollDice() {
   setNumberRolled(prevRolled => ++prevRolled)
   return setDieNum(prevState => prevState.map(
    die => (die.isHeld ? 
    die : 
    generateNewDie()
     ))
   )
  } // End rollDice

  function holdDice(id) {
    setDieNum(prevState => {
     const index = prevState.findIndex(die => die.id === id)
      prevState[index].isHeld = !prevState[index].isHeld
      return [...prevState]
    })
  } // end holdDice

  function newGame() {
    setTenzies(false)
    setDieNum(allNewDice()) 
    setNumberRolled(0);
    setStart(false)
    // setStartTime("")
    // stopTime()
  } // end newGame

  return (
    <main>
    {tenzies && <Confetti />}
    <div className="gameBoard">
      <div className="textContent">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
    <div className="dieGrid">
      {dieElements}
    </div>
    <button 
    className="rollBtn" 
    onClick={tenzies ? newGame : rollDice} 
    style={{fontSize: tenzies ? "21px": "25px"}}
    >
      {tenzies ? "New Game": start ? "Roll" : "Begin"}
      </button>
      
    </div>
    <Stats rolls={numberRolled} lowestRolled={lowestRolls}/>
    </main>
  )
}