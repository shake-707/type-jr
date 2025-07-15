import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthContextProvider } from './context/authContext.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
   
    
  // </StrictMode>,
   <AuthContextProvider>
      <App />
    </AuthContextProvider>
)
