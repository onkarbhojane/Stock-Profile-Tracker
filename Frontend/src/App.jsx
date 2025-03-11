import React,{ useState } from 'react'
// import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Frontpage from './Components/FrontPage/FrontPage'
import LineChart from './Components/Chart/LineChart'
import Profile from './Components/Profile/Profile'
import Dashboard from './Components/Dashboard/Dashboard'
import { Line } from 'react-chartjs-2'
import AllStocks from './Components/AllStocks.jsx'
import SIPCalculator from './Components/Stock/SIP.jsx'
import TradingView from './Components/Chart/TradingView.jsx'
import OTP from './Components/Chart/OTP.jsx'
import StockTransaction from './Components/Chart/StockTransaction.jsx'
import Main from './Components/Knowledge Center/Main.jsx'
import StockNews from './Demo.jsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Frontpage/>}/>
        <Route path='/stock/:symbol' element={<LineChart/>}/>
        <Route path='/user/profile' element={<Profile/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/allStocks' element={<AllStocks/>}/>
        <Route path='/sip' element={<SIPCalculator/>}/>
        <Route path='/trading' element={<TradingView/>}/>
        <Route path='/dd' element={<StockNews/>}/>
        <Route path='/buy/verification' element={<OTP/>}/>
        <Route path ='/stock/verification/done' element={<StockTransaction/>}/>
        <Route path='/knowledge_center' element={<Main/>}/>
        <Route path='*' element={<h1>Page is in the Development state</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
