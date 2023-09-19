import React from 'react'
import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import AddEditBlog from './pages/AddEditBlog'
import About from './pages/About'
import NotFound from './pages/NotFound'
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'



function App() {

  const [active, setActive] = useState("")

  console.log(active)

  return (
   
    <div className='App'>
      <Navbar active={active} setActive={setActive} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/create' element={<AddEditBlog />} />
        <Route path='/update/:id' element={<AddEditBlog />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

    </div>
  )
}

export default App
