import axios from 'axios'

//-------------------------------------------------------------------------------
//------ helper: axios instance for API calls  
//-------------------------------------------------------------------------------
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/books',
  headers: { 'Content-Type': 'application/json' },
})
