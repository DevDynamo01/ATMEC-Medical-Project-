import React from 'react'

import './game.css'
import { useNavigate } from 'react-router-dom'
const Game = () => {
  const navigate=useNavigate();
  return (
    <div className='game-container'>
      <div className='boxbutton' onClick={()=>(navigate('/emoji-mood'))}>
      <img src='./stress.png' className='imageofcard'></img>
        Emoji Mood Analysis
        </div>
      <div className='boxbutton' onClick={()=>(navigate('/parent-mood'))}>
        <img src='./parent1.png' className='imageofcard'></img>
        Parent Mood Analysis</div>
      <div className='boxbutton' onClick={()=>(navigate('/partner-mood'))}>
        <img src='./partner.webp' className='imageofcard'></img>
        Partner Mood Analysis
        </div>
      <div className='boxbutton' onClick={()=>(navigate('/corporate-mood'))}>
         <img src='./corporate1.png' className='imageofcard'></img>
        Corporate Mood Analysis
        </div>
      <div className='boxbutton' onClick={()=>(navigate('/student-mood'))}>
        <img src='./student1.png' className='imageofcard'></img>
        Student Mood Analysis
        </div>
      <div className='boxbutton' onClick={()=>(navigate('/basic-mood'))}>Student Mood Analysis</div>
    </div>
  )
}

export default Game
