import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AdminComments from './components/AdminComments'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin-comments" element={<AdminComments />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
