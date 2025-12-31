import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { loadTheme } from './utils/theme.js'
import { loadFontFamily } from './utils/theme.js'
loadTheme();
loadFontFamily();
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