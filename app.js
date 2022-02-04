import React from 'react'
import { Route, Routes, NavLink as Link } from 'react-router-dom'

import * as Ui from './modules'
import About from './pages/about'
import Projects from './pages/projects'
import Home from './pages/home'

export default () => {
  return (
    <Ui.Main>
      <h1>Hunter Osmun</h1>
      <Ui.Navbar>
        <Link to='/'>Home</Link>
        <Link to='/projects'>Projects</Link>
        <Link to='/about'>About</Link>
      </Ui.Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Ui.Main>
  )
}
