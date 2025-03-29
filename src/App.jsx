import { useState } from 'react'
import './App.css'
import Home from './Page/home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PersonPage from './Page/personPage';
import PersonDetails from './Page/personDetails';
import PersonPermissionPage from './Page/personPermissionPage';
import ZimmetPage from './Page/zimmetPage';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
           <Route path="/person" element={<PersonPage/>}/>
           <Route path="/personDetails" element={<PersonDetails/>}/>
           <Route path="/personPermission" element={<PersonPermissionPage/>}/>
           <Route path="/zimmet" element={<ZimmetPage/>}/>
        </Routes>
      </Router>
    
    </>
  )
}

export default App
