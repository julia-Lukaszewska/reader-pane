// src/index.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppProvider from './providers/AppProvider';
import App from '@/App';


import * as pdfjsLib from 'pdfjs-dist';



//------------------------------------------------------------------------------
// PDF.js worker
//------------------------------------------------------------------------------
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
if (!window.Worker) {
  console.error('Web Workers are not supported in this browser.');
}

//------------------------------------------------------------------------------
// Entry point
//------------------------------------------------------------------------------
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
