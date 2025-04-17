import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './context/AppProvider'
import App from './App.jsx'

//-----------------------------------------------------------------------------
//------ Entry point: render app into DOM with context and strict mode  
//-----------------------------------------------------------------------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
)
