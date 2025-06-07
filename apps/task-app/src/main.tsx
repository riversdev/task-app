import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/App'

import '@/styles/appTheme.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import '@/styles/app.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
