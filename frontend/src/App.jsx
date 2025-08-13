import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'
import Signin from './pages/signin'
import Landing from './pages/landing'
import SendMoney from './pages/sendmoney'
  
function App() {

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/sendmoney" element={<SendMoney />} />
      </Routes>
    </Router>
  )
}

export default App
