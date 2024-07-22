import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './react-router/AppRoutes'
import './css/App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
)
