import React from 'react'
import ReactDOM from 'react-dom/client'
// Make sure this import points to the newly named file
import App from './App.jsx' 
import './index.css' // or App.css, depending on your setup

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)