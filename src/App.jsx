import { useState } from 'react'
import './App.css'
import Home from './Page/home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PersonPage from './Page/personPage';
import PersonDetails from './Page/personDetails';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
           <Route path="/person" element={<PersonPage/>}/>
           <Route path="/personDetails" element={<PersonDetails/>}/>
        </Routes>
      </Router>
    
    </>
  )
}

export default App
