import React from 'react'
import ReactDOM from 'react-dom/client'

import { Background } from "./Theme/Index"
import { SocketProvider } from './Contexts/SocketContext'
import { ThemeProvider } from './Contexts/ThemeContext'
import App from './App.jsx'
import "./Styles/Index.css"
import "./Styles/Style.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <Background>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Background>
    </SocketProvider>
  </React.StrictMode>,
)
