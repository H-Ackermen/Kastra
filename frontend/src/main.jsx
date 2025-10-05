import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import ErrorContextProvider from './context/ErrorContext.jsx'
import { ContentProvider } from './context/ContentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorContextProvider>

    <AuthContextProvider>
      <ContentProvider>

    <App />
            
      </ContentProvider>
    </AuthContextProvider>
    </ErrorContextProvider>
  </StrictMode>
)
