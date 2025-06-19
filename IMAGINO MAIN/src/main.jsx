import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LecturesProvider } from './lib/LecturesContext.jsx'
import { UserProvider } from './lib/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-2xl">Loading...</div>}>
      <BrowserRouter>
        <UserProvider>
          <LecturesProvider>
            <App />
          </LecturesProvider>
        </UserProvider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>
)
