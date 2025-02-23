import React,{ useState } from 'react'
// import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Frontpage from './Components/FrontPage/FrontPage'
import LineChart from './Components/Chart/LineChart'
import Profile from './Components/Profile/Profile'
import Dashboard from './Components/Dashboard/Dashboard'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Frontpage/>}/>
        <Route index path='/chart' element={<LineChart/>}/>
        <Route path='/user/profile' element={<Profile/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='*' element={<h1>404 Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
