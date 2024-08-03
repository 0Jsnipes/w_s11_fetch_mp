import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'
import { useEffect, useState } from 'react'

const [dogs, setDogs] = useState([])
const [currentDogId, setCurrentDog]=useState(null)

useEffect(()=>{getDogs()}, [])

const getDogs = () => {
  fetch('api/dogs')
  .then(res =>{
     if(!res.ok) throw new Error('Problem Getting dogs')
      return res.json()
  })
  .then(setDogs)
  .catch(err => console.error(err))
}

export default function App() {
  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList 
          dogs={dogs}
          getDogs ={getDogs}
          setCurrentDog={setCurrentDog}
        />} />
        <Route path="/form" element={<DogForm />}
        dogs = {currentDogId && dogs.find(d => d.id == currentDogId)}
        getDogs ={getDogs}
        reset = {() => setCurrentDog(null)}
        />
      </Routes>
    </div>
  )
}
