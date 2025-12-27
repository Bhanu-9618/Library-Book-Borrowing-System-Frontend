import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/Library-Book-Borrowing-System-Frontend">
    <App />
    </BrowserRouter>
  </StrictMode>,
)
