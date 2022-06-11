// import logo from './logo.svg'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import * as Pages from './pages'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pages.Main />} />
        <Route path='/about' element={<Pages.About />} />
        <Route path='/sample' element={<Pages.Sample />} />
        <Route path='/conways' element={<Pages.ConwaysGame />} />
        <Route path='/conways/rules' element={<Pages.ConwaysRules />} />
        <Route path='/todo' element={<Pages.ToDo />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}
/*

Site Ideas:
Make a procedurally generated city as a background (maybe with moving parts/cars)
Make a background generated like Dallins random Voroni
Make the background the cool water light physics thing?
Make the letters run away from the mouse?
Make a secret party button? Or maybe the party button will be if you click hunter
Maybe make the mouse drag draw on the background
Maybe have th party button run away from the mouse when hovered over? Clicking on it will make the colors change?
Maybe make each letter of "Hunter Osmun" highlight as a different color each time hovered?
Maybe party will click and drag & everything will drag the opposite direction?
*/
