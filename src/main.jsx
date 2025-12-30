import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// 🔥 APPLY SAVED THEME
const savedTheme = localStorage.getItem("theme") || "default";
document.documentElement.setAttribute("data-theme", savedTheme);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* 🔥 GLOBAL THEME CLASSES */}
      <div className="min-h-screen bg-bg text-secondary">
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>,
)