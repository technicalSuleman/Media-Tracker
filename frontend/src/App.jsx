import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import LoginPage from './pages/Login'
import SignUpPage from './pages/SignUp'
import Dashboard from './pages/Dashboard'

function App() {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'info') => {
    const id = Date.now()
    const newToast = { id, message, type }
    setToasts(prev => [...prev, newToast])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 3000)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage showToast={showToast} />} />
          <Route path="/signup" element={<SignUpPage showToast={showToast} />} />
          <Route path="/dashboard" element={<Dashboard showToast={showToast} />} />
        </Routes>
        
        <div className="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className={`toast toast-${toast.type}`}>
              <span className="toast-message">{toast.message}</span>
              <button 
                className="toast-close" 
                onClick={() => removeToast(toast.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </Router>
  )
}

export default App
