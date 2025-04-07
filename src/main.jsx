import { StrictMode } from 'react' // Enables strict mode in development  
import { createRoot } from 'react-dom/client' // Creates root for rendering the app  
import { AppProvider } from './context/AppProvider'  

import App from './App.jsx' // Main App component  

// -----------------------------------------------------------------------------
//------ Render app into the DOM  
// -----------------------------------------------------------------------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Enables strict mode in development   */}
    <AppProvider>
      {/* Provides global context (e.g., theme, state)   */}
      <App />
      {/* Main app component   */}
    </AppProvider>
  </StrictMode>
)
