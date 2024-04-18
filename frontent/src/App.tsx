import React from 'react'
import Home from './components/home/Home'
import Upload from './components/upload/Upload';
import Myworkflow from './components/myworkflow/Myworkflow';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/upload' element={<Upload/>}/>
      <Route path='/myWorkflow' element={<Myworkflow/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
