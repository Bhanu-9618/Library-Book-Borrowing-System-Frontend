import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
     <Navbar></Navbar>
     <Dashboard></Dashboard>
    </>
  )
}

export default App
