import React, { useEffect } from 'react'
import './App.scss'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import AddEditBlog from './pages/AddEditBlog'
import About from './pages/About'
import NotFound from './pages/NotFound'
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Auth from './pages/Auth'
import { auth } from './Firebase'
import { signOut } from 'firebase/auth'


function App() {
  const navigator = useNavigate()
  const [active, setActive] = useState("")
  const [user, setUser] = useState(null)


  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

  }, [])

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null)
      setActive("login")
      navigator("/auth")
    })
  }


  return (
    <div className='App'>
      <Navbar active={active} setActive={setActive} user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home user={user} setActive={setActive} />} />
        <Route path='/detail/:id' element={<Details  setActive={setActive}/>} />
        <Route path='/create' element={< AddEditBlog user={user} setActive={setActive} />} />
        <Route path='/update/:id' element={<AddEditBlog user={user} setActive={setActive} />} />
        <Route path='/about' element={<About />} />
        <Route path='/auth' element={<Auth setActive={setActive} setUser={setUser} />} />
       
        <Route path='*' element={<NotFound />} />
      </Routes>

    </div>
  )
}

export default App
