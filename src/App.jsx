import React from 'react'
import Header from './components/Header'
import { Routes, Route } from "react-router"
import Layout from "./components/Layout"
import Home from './pages/Home'
import Contact from './pages/contact'

const App = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/contact' element={<Contact />} />
      </Route>
    </Routes>
    </div>
  )
}

export default App
