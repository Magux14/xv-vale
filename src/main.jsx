import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss'
import Invitation from './components/invitation/invitation.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Invitation />
  </StrictMode>,
)
